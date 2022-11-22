import { SiteTitle } from "@/components/atoms/SiteTitle";
import { CategoryMenu } from "@/components/model/category/CategoryMenu";
import { ThemeSwitch } from "@/components/molecules/ThemeSwitch";
import { SearchArea } from "@/components/feature/SearchArea";
import type { TCategory, TTag } from "@/types";

type Props = {
  categories: TCategory[];
  tags: TTag[];
};

export const HeaderView: React.FC<Props> = ({ categories, tags }) => {
  return (
    <header className="py-2">
      <div className="grid auto-rows-auto grid-cols-5">
        <div className="col-start-1 col-end-3 justify-self-start lg:col-end-2">
          {/* @ts-expect-error Server Component */}
          <SiteTitle />
        </div>
        <div className="col-span-full row-start-2 mt-4 md:col-span-3 md:col-start-2 md:col-end-5 lg:row-start-1 lg:mt-0">
          <SearchArea categories={categories} tags={tags} />
        </div>
        <div className="col-start-3 col-end-6 flex items-center space-x-4 self-start justify-self-end lg:col-start-5">
          <ThemeSwitch />
          <CategoryMenu categories={categories} />
        </div>
      </div>
    </header>
  );
};
