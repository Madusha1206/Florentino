import React from 'react';

const GalleryLoadMore = ({ visibleCount, totalCount, onShowMore }) => {
  if (totalCount === 0) return null;

  const shownCount = Math.min(visibleCount, totalCount);
  const progress = (shownCount / totalCount) * 100;
  const hasMore = shownCount < totalCount;

  return (
    <div className="gallery-load-more" aria-live="polite">
      <p className="gallery-load-more__count">
        Showing 1–{shownCount} of {totalCount} total
      </p>
      <div
        className="gallery-load-more__track"
        role="progressbar"
        aria-label={`${shownCount} of ${totalCount} products shown`}
        aria-valuemin="0"
        aria-valuemax={totalCount}
        aria-valuenow={shownCount}
      >
        <span
          className="gallery-load-more__progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      {hasMore && (
        <button
          type="button"
          className="gallery-load-more__button"
          onClick={onShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default GalleryLoadMore;