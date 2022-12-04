import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";
import { FaRegCalendar } from "react-icons/fa";

import { Avatar } from "@/components/atoms/Avatar";
import { ButtonCategory } from "@/components/atoms/buttons";
import MDXCustomComponents from "@/components/atoms/mdx";
import TextDate from "@/components/atoms/texts/TextDate";
import Thumbnail from "@/components/atoms/Thumbnail";
import { HtmlHeadBase, HtmlHeadJsonLd } from "@/components/functions/meta";
import { ArticleLayout } from "@/components/layouts";
import { TagListColored } from "@/components/molecules/TagList";
import { getSafeDate } from "@/lib/date";
import type { TArticle, TCategory, TConfig, TPickup, TRankedArticle, TTag } from "@/types";
import { formatPageTitle, formatPageUrl, getExcerpt } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type ArticleDetailProps = {
  article: TArticle;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
  isPreview?: boolean;
  relatedArticles: TArticle[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  categories: categoriesAtMenu,
  config,
  isPreview,
  mdxSource,
  pickup,
  popularArticles,
  relatedArticles,
  tags: tagsAtSearch,
}) => {
  const { category, description, id, image, linkCardArticles, publishedAt, tags, title, updatedAt, writer } = article;
  const { host, siteTitle } = config;
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const safePublishedAt = getSafeDate(publishedAt);
  const safeModifiedAt = getSafeDate(updatedAt);
  const { avatar, name: writerName } = writer;
  const data = { articles: linkCardArticles };
  const pageTitle = formatPageTitle(title, siteTitle);

  return (
    <ArticleLayout
      url={url}
      config={config}
      pageTitle={pageTitle}
      backLinks={backLinks}
      relatedArticles={relatedArticles}
      categories={categoriesAtMenu}
      tags={tagsAtSearch}
      pickup={pickup}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} image={image.url} description={description} />
      <HtmlHeadJsonLd
        url={url}
        title={title}
        image={image.url}
        datePublished={safePublishedAt.toISOString()}
        dateModified={safeModifiedAt.toISOString()}
        authorName={writerName}
        description={getExcerpt(description)}
      />
      {isPreview && <div className="mb-4 bg-red-500 text-center text-white">Preview mode enabled</div>}
      <article className="prose dark:prose-dark">
        <div className="mb-4">
          <Thumbnail
            src={image.url}
            title={title}
            loading="eager"
            blurDataURL={image.blurDataURL}
            alt={article.title}
            priority
          />
        </div>
        <h1>{title}</h1>
        <div className="mb-4 flex flex-row justify-around">
          <div className="flex flex-row items-center gap-2">
            <FaRegCalendar />
            <TextDate date={safePublishedAt} />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Avatar src={avatar.url} alt={writerName} width={32} height={32} />
            <span>{writerName}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-gray-50 p-2 dark:bg-gray-700 sm:p-4">
          <div className="flex flex-row items-center gap-2">
            <span className="text-black dark:text-white">カテゴリー：</span>
            <ButtonCategory category={category} />
          </div>
          <TagListColored tags={tags} />
        </div>
        <div id="js-toc-content">
          <MDXRemote {...mdxSource} components={MDXCustomComponents} scope={data} />
        </div>
      </article>
    </ArticleLayout>
  );
};
