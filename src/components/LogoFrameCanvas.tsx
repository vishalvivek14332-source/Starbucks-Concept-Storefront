import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface LogoFrameCanvasProps {
  className?: string;
}

const TOTAL_FRAMES = 260;

export const LogoFrameCanvas: React.FC<LogoFrameCanvasProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartFrame, setDragStartFrame] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameIndexRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    let count = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/starbucks_logoframes/ezgif-frame-${numStr}.jpg`;

      img.onload = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsFullyLoaded(true);
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
      };

      loadedImages[i - 1] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame at natural original resolution with smooth radial vignetting
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Dynamically match canvas size to full original image dimensions (e.g. 1280x720)
    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw frame image at full original size
    ctx.drawImage(img, 0, 0, width, height);

    // Soft Radial Edge Vignette to blend edges into the dark green theme
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.max(width, height) / 2;

    const vignette = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.42,
      centerX,
      centerY,
      radius * 0.95
    );

    vignette.addColorStop(0, 'rgba(7, 46, 32, 0)');
    vignette.addColorStop(0.55, 'rgba(7, 46, 32, 0.25)');
    vignette.addColorStop(0.8, 'rgba(7, 46, 32, 0.7)');
    vignette.addColorStop(1, '#072e20');

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Continuous Auto Loop
  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      const targetFps = 32;
      const interval = 1000 / targetFps;

      if (delta >= interval) {
        lastTimeRef.current = time - (delta % interval);

        if (!isDraggingRef.current) {
          let nextFrame = (frameIndexRef.current + 1) % TOTAL_FRAMES;
          frameIndexRef.current = nextFrame;
          drawFrame(nextFrame);
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    },
    [drawFrame]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  // Initial draw
  useEffect(() => {
    if (loadedCount > 0) {
      drawFrame(frameIndexRef.current);
    }
  }, [loadedCount, drawFrame]);

  // Drag to scrub 3D rotation
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragStartFrame(frameIndexRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;

    const frameShift = Math.floor(deltaX / 3);
    let newFrame = (dragStartFrame + frameShift) % TOTAL_FRAMES;
    if (newFrame < 0) newFrame += TOTAL_FRAMES;

    frameIndexRef.current = newFrame;
    drawFrame(newFrame);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const progressPercent = Math.min(
    100,
    Math.round((loadedCount / TOTAL_FRAMES) * 100)
  );

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Glow aura backdrop */}
      <div className="absolute inset-0 rounded-full bg-[#00A862]/20 blur-3xl pointer-events-none scale-110" />

      {/* Original Size Canvas container with CSS radial mask */}
      <div
        className="relative w-full max-w-[560px] aspect-video rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing group shadow-2xl"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 98%)',
          maskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 98%)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-102"
        />

        {/* Loading Overlay */}
        {!isFullyLoaded && loadedCount < 30 && (
          <div className="absolute inset-0 bg-[#072e20]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-8 h-8 text-[#00A862] animate-spin mb-3" />
            <span className="text-xs font-bold tracking-widest text-white/90 uppercase mb-2">
              Loading 3D Siren Logo...
            </span>
            <div className="w-44 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#006241] to-[#00A862] transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-white/50 mt-1 font-semibold">
              {progressPercent}%
            </span>
          </div>
        )}

        {/* Floating Drag Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="bg-[#003824]/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg">
            <MoveHorizontal className="w-3 h-3 text-[#00A862]" />
            <span>Drag to rotate Siren Logo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
