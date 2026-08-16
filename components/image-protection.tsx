"use client";

import { useEffect } from "react";

function isProtectedImageTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  if (target.closest("img")) return true;

  const element = target as HTMLElement;
  const backgroundImage = window.getComputedStyle(element).backgroundImage;
  return backgroundImage !== "none";
}

export function ImageProtection() {
  useEffect(() => {
    const blockImageContextMenu = (event: MouseEvent) => {
      if (isProtectedImageTarget(event.target)) event.preventDefault();
    };

    const blockImageDrag = (event: DragEvent) => {
      if (isProtectedImageTarget(event.target)) event.preventDefault();
    };

    document.addEventListener("contextmenu", blockImageContextMenu);
    document.addEventListener("dragstart", blockImageDrag);

    return () => {
      document.removeEventListener("contextmenu", blockImageContextMenu);
      document.removeEventListener("dragstart", blockImageDrag);
    };
  }, []);

  return null;
}
