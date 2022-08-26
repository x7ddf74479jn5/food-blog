import { ArticleSkelton } from "../ArticleSkelton";

export const ArticleSkeltonList: React.FC = () => {
  const listItems = [...Array(5)].map((_, index) => (
    <li key={index}>
      <ArticleSkelton />
    </li>
  ));

  return <ul className="space-y-12">{listItems}</ul>;
};
