import { FC } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  className?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl, className = "" }) => {
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Error loading video:", e);
  };

  return (
    <div
      className={`relative w-full aspect-video rounded-lg object-contain ${className}`}
    >
      <video
        className="w-full h-full object-contain"
        controls
        autoPlay={true}
        preload="metadata"
        onError={handleError}
        aria-label="Video player"
        tabIndex={0}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
