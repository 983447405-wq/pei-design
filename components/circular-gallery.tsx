"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useMemo, useRef } from "react";
import type { OGLRenderingContext } from "ogl";
import type { Locale } from "@/lib/i18n";

export type CircularGalleryItem = {
  image: string;
  text: string;
};

type CircularGalleryProps = {
  items: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
};

type ScreenSize = {
  width: number;
  height: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

function debounce<T extends (...args: never[]) => void>(func: T, wait: number) {
  let timeout: number | undefined;

  return (...args: Parameters<T>) => {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

async function resolveFont(font: string) {
  if (document.fonts?.load) {
    try {
      await document.fonts.load(font);
      await document.fonts.ready;
    } catch {
      // Canvas text can fall back to the page font if the requested font is unavailable.
    }
  }

  return font;
}

function getFontSize(font: string) {
  const match = font.match(/(\d+)px/);
  return match ? Number.parseInt(match[1], 10) : 30;
}

function createTextTexture(gl: OGLRenderingContext, text: string, font: string, color: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("CircularGallery: canvas 2d context unavailable");
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  context.font = font;

  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(getFontSize(font) * 1.22);

  canvas.width = Math.ceil((textWidth + 28) * dpr);
  canvas.height = Math.ceil((textHeight + 22) * dpr);
  canvas.style.width = `${textWidth + 28}px`;
  canvas.style.height = `${textHeight + 22}px`;

  context.scale(dpr, dpr);
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, (textWidth + 28) / 2, (textHeight + 22) / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  return { texture, width: textWidth + 28, height: textHeight + 22 };
}

class Title {
  private readonly gl: OGLRenderingContext;
  private readonly plane: Mesh<Plane, Program>;
  private readonly text: string;
  private readonly textColor: string;
  private readonly font: string;

  private mesh!: Mesh<Plane, Program>;

  constructor({
    gl,
    plane,
    text,
    textColor,
    font
  }: {
    gl: OGLRenderingContext;
    plane: Mesh<Plane, Program>;
    text: string;
    textColor: string;
    font: string;
  }) {
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  private createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      transparent: true,
      uniforms: { tMap: { value: texture } }
    });

    this.mesh = new Mesh(this.gl, { geometry, program });

    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.105;
    const textWidth = textHeight * aspect;

    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.42;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  private readonly geometry: Plane;
  private readonly gl: OGLRenderingContext;
  private readonly image: string;
  private readonly index: number;
  private readonly length: number;
  private readonly scene: Transform;
  private readonly bend: number;
  private readonly textColor: string;
  private readonly borderRadius: number;
  private readonly font: string;
  private readonly text: string;

  private extra = 0;
  private plane!: Mesh<Plane, Program>;
  private program!: Program;
  private screen: ScreenSize;
  private viewport: ViewportSize;
  private width = 0;
  private widthTotal = 0;
  private x = 0;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius,
    font
  }: {
    geometry: Plane;
    gl: OGLRenderingContext;
    image: string;
    index: number;
    length: number;
    scene: Transform;
    screen: ScreenSize;
    text: string;
    viewport: ViewportSize;
    bend: number;
    textColor: string;
    borderRadius: number;
    font: string;
  }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  private createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.08 + uSpeed * 0.42);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      }
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  private createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  private createTitle() {
    new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }

  update(scroll: { current: number; last: number }, direction: "left" | "right") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const halfWidth = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.bend);
      const radius = (halfWidth * halfWidth + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfWidth);
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);

      this.plane.position.y = this.bend > 0 ? -arc : arc;
      this.plane.rotation.z = (this.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / radius);
    }

    const speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    const isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    const isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && isBefore) {
      this.extra -= this.widthTotal;
    }

    if (direction === "left" && isAfter) {
      this.extra += this.widthTotal;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: ViewportSize } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    const scale = this.screen.width < 760 ? this.screen.height / 1320 : this.screen.height / 1280;
    const imageWidth = this.screen.width < 760 ? 520 : 700;
    const imageHeight = this.screen.width < 760 ? 780 : 900;

    this.plane.scale.y = (this.viewport.height * (imageHeight * scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (imageWidth * scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + 1.2;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class GalleryApp {
  private readonly container: HTMLElement;
  private readonly items: CircularGalleryItem[];
  private readonly bend: number;
  private readonly textColor: string;
  private readonly borderRadius: number;
  private readonly font: string;
  private readonly scrollSpeed: number;
  private readonly scroll = { current: 0, ease: 0.05, last: 0, target: 0 };

  private renderer!: Renderer;
  private gl!: OGLRenderingContext;
  private camera!: Camera;
  private scene!: Transform;
  private planeGeometry!: Plane;
  private screen!: ScreenSize;
  private viewport!: ViewportSize;
  private medias: Media[] = [];
  private raf = 0;
  private isDown = false;
  private start = 0;
  private scrollPosition = 0;

  private readonly onCheckDebounce: () => void;
  private readonly boundOnResize: () => void;
  private readonly boundOnWheel: (event: WheelEvent) => void;
  private readonly boundOnPointerDown: (event: PointerEvent) => void;
  private readonly boundOnPointerMove: (event: PointerEvent) => void;
  private readonly boundOnPointerUp: () => void;
  private readonly boundOnKeyDown: (event: KeyboardEvent) => void;

  constructor(
    container: HTMLElement,
    { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase }: Required<CircularGalleryProps>
  ) {
    this.container = container;
    this.items = items;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.scrollSpeed = scrollSpeed;
    this.scroll.ease = scrollEase;

    this.onCheckDebounce = debounce(this.onCheck.bind(this) as () => void, 180);
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnPointerDown = this.onPointerDown.bind(this);
    this.boundOnPointerMove = this.onPointerMove.bind(this);
    this.boundOnPointerUp = this.onPointerUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    this.update = this.update.bind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  private createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas as HTMLCanvasElement);
  }

  private createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  private createScene() {
    this.scene = new Transform();
  }

  private createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 42,
      widthSegments: 96
    });
  }

  private createMedias() {
    const medias = this.items.concat(this.items);
    this.medias = medias.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: medias.length,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend: this.bend,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font
      });
    });
  }

  private onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    this.isDown = true;
    this.scrollPosition = this.scroll.current;
    this.start = event.clientX;
    this.container.setPointerCapture?.(event.pointerId);
  }

  private onPointerMove(event: PointerEvent) {
    if (!this.isDown) return;
    const distance = (this.start - event.clientX) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scrollPosition + distance;
  }

  private onPointerUp() {
    if (!this.isDown) return;
    this.isDown = false;
    this.onCheck();
  }

  private onWheel(event: WheelEvent) {
    const delta = event.deltaY || event.deltaX;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.scroll.target += this.scrollSpeed * 5;
      this.onCheckDebounce();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.scroll.target -= this.scrollSpeed * 5;
      this.onCheckDebounce();
    }
  }

  private onCheck() {
    const firstMedia = this.medias[0];
    if (!firstMedia) return;

    const width = (firstMedia as unknown as { width: number }).width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  private onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };

    this.renderer?.setSize(this.screen.width, this.screen.height);

    if (this.camera) {
      this.camera.perspective({
        aspect: this.screen.width / this.screen.height
      });

      const fov = (this.camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
      const width = height * this.camera.aspect;
      this.viewport = { width, height };
    }

    this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  private update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.medias.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  }

  private addEventListeners() {
    window.addEventListener("resize", this.boundOnResize);
    this.container.addEventListener("wheel", this.boundOnWheel, { passive: true });
    this.container.addEventListener("pointerdown", this.boundOnPointerDown);
    this.container.addEventListener("pointermove", this.boundOnPointerMove);
    this.container.addEventListener("pointerup", this.boundOnPointerUp);
    this.container.addEventListener("pointercancel", this.boundOnPointerUp);
    this.container.addEventListener("keydown", this.boundOnKeyDown);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("wheel", this.boundOnWheel);
    this.container.removeEventListener("pointerdown", this.boundOnPointerDown);
    this.container.removeEventListener("pointermove", this.boundOnPointerMove);
    this.container.removeEventListener("pointerup", this.boundOnPointerUp);
    this.container.removeEventListener("pointercancel", this.boundOnPointerUp);
    this.container.removeEventListener("keydown", this.boundOnKeyDown);

    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.08,
  font = "700 30px Geist",
  scrollSpeed = 2.2,
  scrollEase = 0.03
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stableItems = useMemo(() => items, [items]);

  useEffect(() => {
    if (!containerRef.current) return;

    let app: GalleryApp | undefined;
    let isMounted = true;

    void resolveFont(font).then((resolvedFont) => {
      if (!isMounted || !containerRef.current) return;
      app = new GalleryApp(containerRef.current, {
        items: stableItems,
        bend,
        textColor,
        borderRadius,
        font: resolvedFont,
        scrollSpeed,
        scrollEase
      });
    });

    return () => {
      isMounted = false;
      app?.destroy();
    };
  }, [stableItems, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return (
    <div
      aria-label="Circular image gallery. Use left and right arrow keys to navigate."
      className="circular-gallery"
      ref={containerRef}
      role="region"
      tabIndex={0}
    />
  );
}

export function ProjectImageGallery({ locale }: { locale: Locale }) {
  const items = useMemo<CircularGalleryItem[]>(
    () => [
      { image: "/gallery-shots/monochrome-01.png", text: "Quiet Frame" },
      { image: "/gallery-shots/monochrome-02.png", text: "Bloom Study" },
      { image: "/gallery-shots/monochrome-03.png", text: "Light Corridor" },
      { image: "/gallery-shots/monochrome-04.png", text: "Urban Symmetry" },
      { image: "/gallery-shots/monochrome-05.png", text: "Stairwell" },
      { image: "/gallery-shots/monochrome-06.png", text: "Shadow Walk" },
      { image: "/gallery-shots/monochrome-07.png", text: "Passage" }
    ],
    []
  );

  return (
    <section className="portfolio-image-gallery-band motion-rise" id="visual-gallery">
      <div className="shell">
        <p className="portfolio-eyebrow mb-4">{locale === "zh" ? "Visual Gallery" : "Visual Gallery"}</p>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
          {locale === "zh" ? "用图片快速浏览作品气质。" : "A quick visual scan of selected work."}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
          {locale === "zh"
            ? "横向弯曲画廊用于集中展示摄影片段、视觉氛围和构图方向。"
            : "A curved horizontal gallery for photography fragments, visual mood, and composition studies."}
        </p>
      </div>
      <div className="portfolio-circular-gallery-frame">
        <CircularGallery bend={3} borderRadius={0.08} items={items} scrollEase={0.03} scrollSpeed={2.2} textColor="#ffffff" />
      </div>
    </section>
  );
}
