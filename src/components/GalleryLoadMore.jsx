import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GalleryLoadMore = ({ visibleCount, totalCount }) => {
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
        <Link to="/catalog" className="catalog-view-all-button">
          <span className="catalog-view-all-button__icon-wrapper" aria-hidden="true">
            <ArrowUpRight className="catalog-view-all-button__icon" />
            <ArrowUpRight className="catalog-view-all-button__icon catalog-view-all-button__icon--copy" />
          </span>
          <span>View full catalog</span>
        </Link>
      )}
    </div>
  );
};

export default GalleryLoadMore;