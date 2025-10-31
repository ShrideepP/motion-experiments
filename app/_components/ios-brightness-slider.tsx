"use client";

import {
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type PanInfo,
  motion,
} from "motion/react";
import { useRef } from "react";

export const IosBrightnessSlider = () => {
  const scaleY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const height = useSpring(4);

  useMotionValueEvent(scaleY, "change", (latestValue) => {
    if (latestValue >= 0.66) height.set(8);
    else if (latestValue >= 0.33) height.set(6);
    else height.set(4);
  });

  const handlePan = (_: any, info: PanInfo) => {
    if (!containerRef.current) return;

    const height = containerRef.current.offsetHeight;
    const dragProgress = -info.offset.y / height;

    const nextScale = Math.min(Math.max(0, dragProgress), 1);

    scaleY.set(nextScale);
  };

  return (
    <div className="grid h-screen w-screen place-items-center">
      <motion.div
        ref={containerRef}
        onPan={handlePan}
        className="relative h-50 w-20 overflow-hidden rounded-[1.25rem] border"
      >
        <div className="absolute inset-x-0 bottom-0 z-50 flex items-start justify-center pb-4">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-75 text-black"
          >
            <circle cx="21" cy="21" r="9" fill="currentColor" />

            <g transform="rotate(-180 22 8)">
              <motion.rect
                layout
                x="22"
                y="8"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>

            <g transform="rotate(-135 30.8994 12.5147)">
              <motion.rect
                layout
                x="30.8994"
                y="12.5147"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>

            <g transform="rotate(-90 34 22)">
              <motion.rect
                layout
                x="34"
                y="22"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>

            <g transform="rotate(-45 29.4854 30.8995)">
              <motion.rect
                layout
                x="29.4854"
                y="30.8995"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>

            <g>
              <motion.rect
                layout
                x="20"
                y="34"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>

            <g transform="rotate(45 11.1006 29.4853)">
              <motion.rect
                layout
                x="11.1006"
                y="29.4853"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>

            <g transform="rotate(90 8 20.0001)">
              <motion.rect
                layout
                x="8"
                y="20.0001"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>

            <g transform="rotate(135 12.5146 11.1006)">
              <motion.rect
                layout
                x="12.5146"
                y="11.1006"
                width="2"
                rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: "center",
                  height,
                }}
              />
            </g>
          </svg>
        </div>

        <motion.div
          style={{ scaleY, originY: 1 }}
          className="absolute inset-0 bg-black"
        />
      </motion.div>
    </div>
  );
};
