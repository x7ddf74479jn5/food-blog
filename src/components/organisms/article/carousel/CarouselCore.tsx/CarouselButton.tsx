export const DotButton = ({ onClick: handleClick, selected }: { selected: boolean; onClick: () => void }) => (
  <button
    className={`relative mx-2 flex h-8 w-8 cursor-pointer items-center border-none bg-transparent p-0 outline-none content-none after:h-1 after:w-full after:rounded-sm after:bg-gray-500 ${
      selected ? "opacity-100 after:bg-green-500" : "opacity-50"
    }`}
    type="button"
    onClick={handleClick}
    data-testid="carousel-dot-button"
  />
);

export const PrevButton = ({ enabled, onClick: handleClick }: { enabled: boolean; onClick: () => void }) => (
  <button
    className="absolute left-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center border-none bg-transparent fill-green-500 p-0 outline-none disabled:cursor-default disabled:opacity-30 sm:block"
    onClick={handleClick}
    disabled={!enabled}
    data-testid="carousel-prev-button"
  >
    <svg className="h-full w-full" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick: handleClick }: { enabled: boolean; onClick: () => void }) => (
  <button
    className="absolute top-1/2 right-4 z-10 hidden h-8 w-8 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center border-none bg-transparent fill-green-500 p-0 outline-none disabled:cursor-default disabled:opacity-30 sm:block"
    onClick={handleClick}
    disabled={!enabled}
    data-testid="carousel-next-button"
  >
    <svg className="h-full w-full" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);
