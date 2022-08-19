import { ArticleSkelton } from "@/components/atoms/ArticleSkelton";

export const ArticleSkeltonList: React.FC = () => {
  const length = 5;
  const list = [];

  for (let index = 0; index < length; index++) {
    list.push(
      <li key={index}>
        <ArticleSkelton />
      </li>
    );
  }

  return <ul className="space-y-12">{list}</ul>;
};
