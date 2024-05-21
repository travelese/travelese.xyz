// File: /src/components/flight/flight-card.tsx
// Description: This file contains the component for displaying flight card details.
"use client";

import * as React from "react";

const PlayGround = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl"></h1>
      </div> */}
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-chunk-main"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          {/* <h3 className="text-2xl font-bold tracking-tight">
          </h3>
          <p className="text-sm text-muted-foreground">
          </p> */}
        </div>
      </div>
    </main>
  );
};

export default PlayGround;
