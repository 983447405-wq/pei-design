"use client";

import { useEffect, useRef } from "react";

type LineWavesProps = {
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number;
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
  className?: string;
};

const vertexShaderSource = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords.x *= uResolution.z;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mousePosition = uMouse * 2.0 - 1.0;
    mousePosition.x *= uResolution.z;
    mousePosition = rotate2D(mousePosition, uRotation);
    float mouseDistance = length(coords - mousePosition);
    mouseWarp = uMouseInfluence * exp(-mouseDistance * mouseDistance * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float verticalMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, verticalMask);
  float scaledY = blended.y * tileCount;
  float noiseY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(noiseY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (noiseY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = verticalMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + verticalMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 color = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(color), 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`;

const parseHexColor = (value: string): [number, number, number] => {
  const hex = value.replace("#", "");
  const full = hex.length === 3 ? hex.split("").map((char) => char + char).join("") : hex;
  const numeric = Number.parseInt(full, 16);

  return [((numeric >> 16) & 255) / 255, ((numeric >> 8) & 255) / 255, (numeric & 255) / 255];
};

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export default function LineWaves({
  speed = 0.3,
  innerLineCount = 32,
  outerLineCount = 36,
  warpIntensity = 1,
  rotation = -45,
  edgeFadeWidth = 0,
  colorCycleSpeed = 1,
  brightness = 0.2,
  color1 = "#ffffff",
  color2 = "#ffffff",
  color3 = "#ffffff",
  enableMouseInteraction = true,
  mouseInfluence = 2,
  className = ""
}: LineWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false
    });

    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    const uniforms = {
      time: gl.getUniformLocation(program, "uTime"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      speed: gl.getUniformLocation(program, "uSpeed"),
      innerLines: gl.getUniformLocation(program, "uInnerLines"),
      outerLines: gl.getUniformLocation(program, "uOuterLines"),
      warpIntensity: gl.getUniformLocation(program, "uWarpIntensity"),
      rotation: gl.getUniformLocation(program, "uRotation"),
      edgeFadeWidth: gl.getUniformLocation(program, "uEdgeFadeWidth"),
      colorCycleSpeed: gl.getUniformLocation(program, "uColorCycleSpeed"),
      brightness: gl.getUniformLocation(program, "uBrightness"),
      color1: gl.getUniformLocation(program, "uColor1"),
      color2: gl.getUniformLocation(program, "uColor2"),
      color3: gl.getUniformLocation(program, "uColor3"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      mouseInfluence: gl.getUniformLocation(program, "uMouseInfluence"),
      enableMouse: gl.getUniformLocation(program, "uEnableMouse")
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    let frame = 0;
    let width = 1;
    let height = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    const handlePointerLeave = () => {
      targetMouse.x = 0.5;
      targetMouse.y = 0.5;
    };

    const [r1, g1, b1] = parseHexColor(color1);
    const [r2, g2, b2] = parseHexColor(color2);
    const [r3, g3, b3] = parseHexColor(color3);

    const render = (now: number) => {
      resize();
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uniforms.time, prefersReducedMotion ? 0 : now * 0.001);
      gl.uniform3f(uniforms.resolution, width, height, width / height);
      gl.uniform1f(uniforms.speed, speed);
      gl.uniform1f(uniforms.innerLines, innerLineCount);
      gl.uniform1f(uniforms.outerLines, outerLineCount);
      gl.uniform1f(uniforms.warpIntensity, warpIntensity);
      gl.uniform1f(uniforms.rotation, (rotation * Math.PI) / 180);
      gl.uniform1f(uniforms.edgeFadeWidth, edgeFadeWidth);
      gl.uniform1f(uniforms.colorCycleSpeed, colorCycleSpeed);
      gl.uniform1f(uniforms.brightness, brightness);
      gl.uniform3f(uniforms.color1, r1, g1, b1);
      gl.uniform3f(uniforms.color2, r2, g2, b2);
      gl.uniform3f(uniforms.color3, r3, g3, b3);
      gl.uniform2f(uniforms.mouse, smoothMouse.x, smoothMouse.y);
      gl.uniform1f(uniforms.mouseInfluence, mouseInfluence);
      gl.uniform1i(uniforms.enableMouse, enableMouseInteraction ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!prefersReducedMotion) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, [
    brightness,
    color1,
    color2,
    color3,
    colorCycleSpeed,
    edgeFadeWidth,
    enableMouseInteraction,
    innerLineCount,
    mouseInfluence,
    outerLineCount,
    rotation,
    speed,
    warpIntensity
  ]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
