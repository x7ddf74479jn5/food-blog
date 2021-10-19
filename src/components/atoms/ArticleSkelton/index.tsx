export const ArticleSkelton: React.VFC = () => {
  return (
    <article className="w-full shadow-lg animate-pulse select-none">
      <div className="mb-4 w-full bg-gray-300 aspect-w-16 aspect-h-9"></div>
      <div className="mb-4 w-4/5 h-8 bg-gray-300 "></div>
      <div className="flex flex-col gap-2">
        <div className="w-full h-4 bg-gray-300 "></div>
        <div className="w-32 h-4 bg-gray-300 "></div>
      </div>
    </article>
  );
};
