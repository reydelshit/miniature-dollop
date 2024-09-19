import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoContainerProps {
  src: string;
  poster?: string;
}

const VideoContainer: React.FC<VideoContainerProps> = ({ src, poster }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', handleVideoError);
      videoRef.current.addEventListener('canplay', handleCanPlay);
      videoRef.current.addEventListener('play', () => setIsPlaying(true));
      videoRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('error', handleVideoError);
        videoRef.current.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, []);

  const handleVideoError = (e: Event) => {
    const target = e.target as HTMLVideoElement;
    setError(`Video error: ${target.error?.message || 'Unknown error'}`);
  };

  const handleCanPlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => setError(`Auto-play error: ${e.message}`));
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .catch((e) => setError(`Play error: ${e.message}`));
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
          {error}
        </div>
      )}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        playsInline
        muted
        loop
      >
        Your browser does not support the video tag.
      </video>
      {showControls && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="rounded-full bg-white/20 p-4 text-white transition-opacity duration-300 hover:bg-white/30"
            >
              {isPlaying ? <Pause size={48} /> : <Play size={48} />}
            </button>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="rounded-full bg-white/20 p-2 text-white transition-opacity duration-300 hover:bg-white/30"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoContainer;
