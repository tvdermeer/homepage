"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particlesConfig: ISourceOptions = {
  fullScreen: { enable: false },
  background: {
    color: { value: "transparent" },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: { enable: true },
    },
    modes: {
      repulse: {
        distance: 120,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: { enable: false },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 0.6,
      straight: false,
    },
    number: {
      density: { enable: true, width: 1920, height: 1080 },
      value: 35,
    },
    opacity: {
      value: { min: 0.6, max: 0.9 },
    },
    shape: {
      type: "image",
      options: {
        image: {
          src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogIDwhLS0gUm93IDEgLSB0b3AgLS0+CiAgPGNpcmNsZSBjeD0iMzUiIGN5PSIyMiIgcj0iNCIgZmlsbD0iI2Q4ZDhkOCIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iMTgiIHI9IjQiIGZpbGw9IiNkOGQ4ZDgiLz4KICA8Y2lyY2xlIGN4PSI2NSIgY3k9IjIyIiByPSI0IiBmaWxsPSIjZDhkOGQ4Ii8+CiAgPCEtLSBSb3cgMiAtLT4KICA8Y2lyY2xlIGN4PSIyMiIgY3k9IjM1IiByPSI0IiBmaWxsPSIjZDhkOGQ4Ii8+CiAgPGNpcmNsZSBjeD0iMzgiIGN5PSIzMyIgcj0iNCIgZmlsbD0iI2Q4ZDhkOCIvPgogIDxjaXJjbGUgY3g9IjU0IiBjeT0iMzAiIHI9IjQiIGZpbGw9IiNkOGQ4ZDgiLz4KICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjMzIiByPSI0IiBmaWxsPSIjZDhkOGQ4Ii8+CiAgPCEtLSBSb3cgMyAtIGNlbnRlciAtLT4KICA8Y2lyY2xlIGN4PSIxOCIgY3k9IjUwIiByPSI0IiBmaWxsPSIjZDhkOGQ4Ii8+CiAgPGNpcmNsZSBjeD0iMzQiIGN5PSI0OCIgcj0iNCIgZmlsbD0iI2Q4ZDhkOCIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNDYiIHI9IjQiIGZpbGw9IiNkOGQ4ZDgiLz4KICA8Y2lyY2xlIGN4PSI2NiIgY3k9IjQ4IiByPSI0IiBmaWxsPSIjZDhkOGQ4Ii8+CiAgPGNpcmNsZSBjeD0iODIiIGN5PSI1MCIgcj0iNCIgZmlsbD0iI2Q4ZDhkOCIvPgogIDwhLS0gUm93IDQgLS0+CiAgPGNpcmNsZSBjeD0iMzAiIGN5PSI2MyIgcj0iNCIgZmlsbD0iI2Q4ZDhkOCIvPgogIDxjaXJjbGUgY3g9IjQ2IiBjeT0iNjEiIHI9IjQiIGZpbGw9IiNkOGQ4ZDgiLz4KICA8Y2lyY2xlIGN4PSI2MiIgY3k9IjYzIiByPSI0IiBmaWxsPSIjZDhkOGQ4Ii8+CiAgPGNpcmNsZSBjeD0iNzgiIGN5PSI2NSIgcj0iNCIgZmlsbD0iI2Q4ZDhkOCIvPgogIDwhLS0gUm93IDUgLSBib3R0b20gLS0+CiAgPGNpcmNsZSBjeD0iMzUiIGN5PSI3OCIgcj0iNCIgZmlsbD0iI2Q4ZDhkOCIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iODAiIHI9IjQiIGZpbGw9IiNkOGQ4ZDgiLz4KICA8Y2lyY2xlIGN4PSI2NSIgY3k9Ijc4IiByPSI0IiBmaWxsPSIjZDhkOGQ4Ii8+Cjwvc3ZnPgo=",
          width: 100,
          height: 100,
        },
      },
    },
    size: {
      value: { min: 8, max: 20 },
    },
    shadow: {
      enable: true,
      color: { value: "#000000" },
      blur: 4,
      offset: { x: 2, y: 2 },
    },
  },
  detectRetina: true,
};

export function GolfBallBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="golf-ball-background"
      className="pointer-events-none fixed inset-0 z-[-1]"
      options={particlesConfig}
    />
  );
}