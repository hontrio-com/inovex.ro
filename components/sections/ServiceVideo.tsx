'use client';

import { useEffect, useRef } from 'react';

interface ServiceVideoProps {
  src: string;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ServiceVideo({ src, loop = true, className, style }: ServiceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Încearcă să pornească videoul; dacă nu e loaded, aşteaptă canplay
    function tryPlay() {
      if (!video) return;
      if (video.readyState >= 2) {
        video.play().catch(() => {/* autoplay blocked */});
      } else {
        video.preload = 'auto';
        video.load();
        video.addEventListener('canplay', () => {
          video.play().catch(() => {});
        }, { once: true });
      }
    }

    // Preload cu 400px înainte să fie vizibil
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && video.preload !== 'auto') {
          video.preload = 'auto';
          video.load();
        }
      },
      { rootMargin: '400px', threshold: 0 }
    );

    // Play/pause la 10% vizibilitate (în loc de 30% — prinde și pagina top)
    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    preloadObserver.observe(video);
    playObserver.observe(video);

    return () => {
      preloadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  const webmSrc = src.replace(/\.mp4$/i, '.webm');

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop={loop}
      preload="none"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transform: 'translateZ(0)',
        willChange: 'transform',
        ...style,
      }}
    >
      <source src={webmSrc} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
