import { MDXRemote } from "next-mdx-remote";
import { FaRegCalendar } from "react-icons/fa";

import { ArticleLayout } from "@/components/layouts";
import { HtmlHeadJsonLd } from "@/components/meta/JsonLd";
import { CategoryButton } from "@/components/model/category/CategoryButton";
import { TagListColored } from "@/components/model/tag/TagList";
import { Avatar } from "@/components/ui/Avatar";
import MDXCustomComponents from "@/components/ui/mdx";
import TextDate from "@/components/ui/texts/TextDate";
import Thumbnail from "@/components/ui/Thumbnail";
import { getSafeDate } from "@/lib/date";
import { mdx2html } from "@/lib/mdx";
import { fetchConfig } from "@/repositories";
import { getArticle } from "@/services/article";
import { formatPageTitle, formatPageUrl, getExcerpt } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = {
  articleId: string;
};

export const ArticleDetail = async ({ articleId }: Props) => {
  const [article, config] = await Promise.all([getArticle(articleId), fetchConfig()]);
  const { category, description, id, image, linkCardArticles, publishedAt, tags, title, updatedAt, writer } = article;
  const { host, siteTitle } = config;
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const safePublishedAt = getSafeDate(publishedAt);
  const safeModifiedAt = getSafeDate(updatedAt);
  const { avatar, name: writerName } = writer;
  const data = { articles: linkCardArticles };
  const pageTitle = formatPageTitle(title, siteTitle);
  const mdxSource = await mdx2html(article.body);
  // TODO: Preview mode not implemented in Next.js@13 yet
  const isPreview = false;

  return (
    <ArticleLayout articleId={article.id} url={url} pageTitle={pageTitle} backLinks={backLinks}>
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
          <Thumbnail src={image.url} title={title} loading="eager" blurDataURL={image.blurDataURL} />
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
            <CategoryButton category={category} />
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
