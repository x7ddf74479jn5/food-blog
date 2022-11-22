import { Skelton } from "@/components/atoms/Skelton";

export const ArticleSkelton: React.FC = () => {
  return (
    <div>
      <Skelton className="mb-4 aspect-video w-full" />
      <Skelton className="mb-4 h-8 w-4/5" />
      <div className="flex flex-col gap-2">
        <Skelton className="h-4 w-full" />
        <Skelton className="h-4 w-32" />
      </div>
    </div>
  );
};
