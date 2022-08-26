import { ArticleSkelton } from "@/components/atoms/ArticleSkelton";

export const ArticleSkeltonList: React.FC = () => {
  const lists = [...Array(5)].map((_, index) => (
    <li key={index}>
      <ArticleSkelton />
    </li>
  ));

  return <ul className="space-y-12">{lists}</ul>;
};
