export const ArticleSkelton: React.VFC = () => {
  return (
    <article className="w-full animate-pulse select-none shadow-lg">
      <div className="aspect-w-16 aspect-h-9 mb-4 w-full bg-gray-300"></div>
      <div className="mb-4 h-8 w-4/5 bg-gray-300 "></div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-gray-300 "></div>
        <div className="h-4 w-32 bg-gray-300 "></div>
      </div>
    </article>
  );
};
