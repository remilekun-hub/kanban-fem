import React from "react";

const BoardListsSkeleton = () => {
  const fakeBoards = Array.from({ length: 2 });

  return (
    <div>
      {/* Header skeleton */}
      <div className="pl-5 mt-5 mb-4">
        <div className="h-[14px] w-[120px] bg-muted/40 rounded animate-pulse" />
      </div>

      {/* Board items skeleton */}
      <ul className="space-y-2">
        {fakeBoards.map((_, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 px-5 py-2"
          >
            {/* Circle icon placeholder */}
            <div className="h-4 w-4 rounded-[4px] bg-muted/40 animate-pulse" />

            {/* Board name placeholder */}
            <div className="h-[20px] w-[150px] bg-muted/40 rounded animate-pulse" />
          </li>
        ))}
      </ul>

      {/* "Create new board" skeleton button */}
      <div className="px-5 mt-4">
        <div className="h-[32px] w-[180px] bg-muted/30 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default BoardListsSkeleton;
