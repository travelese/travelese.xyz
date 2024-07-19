import * as React from "react";

export default function Loading() {
  return (
    <div className="grid place-items-center animate-pulse text-neutral-300 p-4">
      <div role="status">
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="spinner_ngNb"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="translate(12, 12) scale(0)"
          />
          <path
            className="spinner_ngNb spinner_6TBP"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="translate(12, 12) scale(0)"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
