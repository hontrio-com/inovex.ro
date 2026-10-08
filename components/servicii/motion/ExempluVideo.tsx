'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ExempluVideoProps {
  src: string;
  poster: string;
  title: string;
}

/** Numele evenimentului prin care un clip cu sunet le anunta pe celelalte sa taca. */
const UNMUTE_EVENT = 'motion-exemplu-unmute';

/**
 * Clip vertical din sectiunea Exemple: porneste singur, fara sunet, cand ajunge
 * pe ecran si se opreste cand iese. Sunetul se activeaza din buton, pe rand —
 * un singur clip se aude la un moment dat.
 */
export default function ExempluVideo({ src, poster, title }: ExempluVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {/* autoplay blocat */});
        } else {
          video.pause();
          video.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);

    const onOtherUnmute = (e: Event) => {
      if ((e as CustomEvent).detail !== src) {
        video.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener(UNMUTE_EVENT, onOtherUnmute);

    return () => {
      observer.disconnect();
      window.removeEventListener(UNMUTE_EVENT, onOtherUnmute);
    };
  }, [src]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) {
      window.dispatchEvent(new CustomEvent(UNMUTE_EVENT, { detail: src }));
      video.play().catch(() => {});
    }
  }

  return (
    <div className="relative bg-[#0D1117]" style={{ aspectRatio: '9/16' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`Videoclip: ${title}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? `Porneste sunetul pentru ${title}` : `Opreste sunetul pentru ${title}`}
        aria-pressed={!muted}
        className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/75 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-white/70"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
