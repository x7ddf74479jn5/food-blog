import { ArticleSkelton } from "@/components/atoms/ArticleSkelton";

export const ArticleSkeltonList: React.VFC = () => {
  return (
    <div className="space-y-12">
      <ArticleSkelton />
      <ArticleSkelton />
      <ArticleSkelton />
      <ArticleSkelton />
      <ArticleSkelton />
    </div>
  );
};
