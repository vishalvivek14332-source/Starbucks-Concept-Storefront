import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles, MoveHorizontal } from 'lucide-react';

interface CoffeeFrameCanvasProps {
  onCustomize?: () => void;
  className?: string;
}

const TOTAL_FRAMES = 260;
const STEAM_LOOP_START = 170; // Frame index where steam loop begins

export const CoffeeFrameCanvas: React.FC<CoffeeFrameCanvasProps> = ({
  onCustomize,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartFrame, setDragStartFrame] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(true);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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
      img.src = `/starbuck_coffeeframes/ezgif-frame-${numStr}.jpg`;

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

  // Draw a frame onto canvas with seamless radial vignette blending
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw frame image scaled to fit
    ctx.drawImage(img, 0, 0, width, height);

    // Edge Vignette / Radial Gradient Overlay to match #0B4530 website background
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.max(width, height) / 2;

    const vignette = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.45,
      centerX,
      centerY,
      radius * 0.98
    );

    vignette.addColorStop(0, 'rgba(11, 69, 48, 0)');
    vignette.addColorStop(0.65, 'rgba(11, 69, 48, 0.25)');
    vignette.addColorStop(0.85, 'rgba(11, 69, 48, 0.7)');
    vignette.addColorStop(1, '#0B4530');

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Main Animation Loop
  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      const targetFps = 32; // ~30-35 fps for cinematic coffee movement
      const interval = 1000 / targetFps;

      if (delta >= interval) {
        lastTimeRef.current = time - (delta % interval);

        if (isPlayingRef.current && !isDraggingRef.current) {
          let nextFrame = frameIndexRef.current + 1;

          // If reached the end of full intro sequence, loop steam phase
          if (nextFrame >= TOTAL_FRAMES) {
            nextFrame = STEAM_LOOP_START;
          }

          frameIndexRef.current = nextFrame;
          setCurrentFrame(nextFrame);
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

  // Initial draw when frame 0 loads
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
    
    // Calculate new frame based on horizontal drag offset
    const frameShift = Math.floor(deltaX / 3);
    let newFrame = (dragStartFrame + frameShift) % TOTAL_FRAMES;
    if (newFrame < 0) newFrame += TOTAL_FRAMES;

    frameIndexRef.current = newFrame;
    setCurrentFrame(newFrame);
    drawFrame(newFrame);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRestart = () => {
    frameIndexRef.current = 0;
    setCurrentFrame(0);
    drawFrame(0);
    setIsPlaying(true);
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

      {/* Canvas container with CSS mask blending */}
      <div
        className="relative w-full max-w-[460px] aspect-[16/9] sm:aspect-[4/3] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing group shadow-2xl"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 98%)',
          maskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 98%)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onClick={onCustomize}
      >
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-102"
        />

        {/* Loading overlay if loading first frames */}
        {!isFullyLoaded && loadedCount < 30 && (
          <div className="absolute inset-0 bg-[#0B4530]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-8 h-8 text-[#00A862] animate-spin mb-3" />
            <span className="text-xs font-bold tracking-widest text-white/90 uppercase mb-2">
              Brewing Starbucks 3D Experience...
            </span>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#006241] to-[#00A862] transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-white/50 mt-1 font-semibold">
              {progressPercent}% loaded
            </span>
          </div>
        )}

        {/* Floating Interactive Instructions Chip */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="bg-[#003824]/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg">
            <MoveHorizontal className="w-3 h-3 text-[#00A862]" />
            <span>Drag to rotate 3D Cup</span>
          </div>
        </div>
      </div>

      {/* Floating Control Toolbar */}
      <div className="flex items-center gap-3 mt-3 z-30">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-[#003824]/90 hover:bg-[#006241] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-md"
          title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-[#00A862]" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[#00A862] ml-0.5" />
          )}
        </button>

        <button
          onClick={handleRestart}
          className="w-8 h-8 rounded-full bg-[#003824]/90 hover:bg-[#006241] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-md"
          title="Replay Opening Sequence"
          aria-label="Replay Opening Sequence"
        >
          <RotateCcw className="w-3.5 h-3.5 text-white/80" />
        </button>

        <div className="text-[11px] font-mono text-white/60 bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
          Frame {currentFrame + 1} / {TOTAL_FRAMES}
        </div>
      </div>
    </div>
  );
};
