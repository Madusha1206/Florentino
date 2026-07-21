import React, { useRef, useState } from 'react';
import { ArrowUp, Play } from 'lucide-react';

const INITIAL_VIDEO_COUNT = 6;

const videos = [
  { src: '/videos/v2.MP4', label: 'Florentino floral creation 1' },
  { src: '/videos/v3.MP4', label: 'Florentino floral creation 2' },
  { src: '/videos/v4.MP4', label: 'Florentino floral creation 3' },
  { src: '/videos/v5.MP4', label: 'Florentino floral creation 4' },
  { src: '/videos/v6.MP4', label: 'Florentino floral creation 5' },
  { src: '/videos/v7.MP4', label: 'Florentino floral creation 6' },
  { src: '/videos/v8.MP4', label: 'Florentino floral creation 7' },
  { src: '/videos/v9.MP4', label: 'Florentino floral creation 8' },
  { src: '/videos/v10.MP4', label: 'Florentino floral creation 9' },
  { src: '/videos/v11.MP4', label: 'Florentino floral creation 10' },
  { src: '/videos/v12.MP4', label: 'Florentino floral creation 11' },
  { src: '/videos/carvid1.mp4', label: 'Florentino islandwide delivery' },
];

const VideoTile = ({ video, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  return (
    <article className="home-video-card">
      <video
        ref={videoRef}
        src={`${video.src}#t=0.1`}
        className="home-video"
        preload="metadata"
        playsInline
        controls={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
        aria-label={video.label}
      >
        Your browser does not support HTML video.
      </video>
      {hasError ? (
        <div className="home-video-error" role="status">
          Video unavailable
        </div>
      ) : !isPlaying && (
        <button
          type="button"
          className="home-video-play"
          onClick={handlePlay}
          aria-label={`Play ${video.label}`}
        >
          <Play aria-hidden="true" />
        </button>
      )}
      <span className="home-video-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
    </article>
  );
};

const VideoAlbum = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VIDEO_COUNT);
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  return (
    <section id="video-album" className="home-video-album" aria-labelledby="video-album-heading">
      <div className="home-video-heading">
        <p>See our latest floral moments</p>
        <h2 id="video-album-heading">Follow us on Instagram</h2>
        <a href="https://www.instagram.com/florentino.florist?igsh=Y2Q0aGg4OTUzdmhx" target="_blank" rel="noreferrer" aria-label="Visit Florentino on Instagram">@florentino.florist</a>
      </div>

      <div className="home-video-gallery">
        {visibleVideos.map((video, index) => (
          <VideoTile key={video.src} video={video} index={index} />
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          className="home-video-load-more site-action-button"
          onClick={() => setVisibleCount(videos.length)}
        >
          Show more
        </button>
      ) : (
        <a
          href="https://www.tiktok.com/@florentino.gifts?_r=1&_t=ZS-98DdWFGXK4r"
          target="_blank"
          rel="noreferrer"
          className="tiktok-explore-button"
          aria-label="Explore Florentino on TikTok"
        >
          <span>Explore</span>
          <ArrowUp className="tiktok-explore-button__icon" aria-hidden="true" />
        </a>
      )}
    </section>
  );
};

export default VideoAlbum;
