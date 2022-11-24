import type { HowToStep, Person, Recipe, WithContext } from "schema-dts";

import { mdx2html } from "@/lib/mdx";
import type { TArticle, TConfig } from "@/types";
import { parseRecipeHtml } from "@/utils/article/parse";
import { urlTable } from "@/utils/paths/url";

import { generateJsonLdScript, getCommonJsonLdFragment, transformOrganization } from "./common";

type Props = {
  article: TArticle;
  config: TConfig;
};

export const RecipeJsonLd = async (props: Props) => {
  const mdxResult = await mdx2html(props.article.body);
  const htmlSrc = mdxResult.compiledSource;

  return generateJsonLdScript("json-ld-article", { ...props, htmlSrc }, generateJsonLd);
};

const generateJsonLd = ({ article, config, htmlSrc }: Props & { htmlSrc: string }) => {
  const { host: siteUrl } = config;
  const org = transformOrganization(config);
  const path = `${urlTable.articles}/${article.id}`;
  const url = `${siteUrl}${path}`;

  const author: Person = {
    "@type": "Person",
    name: article.writer.name,
    url: `https://twitter.com/${article.writer.twitterAccountName}`,
  };

  const { organizationFragment } = getCommonJsonLdFragment({ org, siteUrl });
  const keywords = article.tags.map((tag) => tag.name).join(", ");
  const { ingredients, instructions } = parseRecipeHtml(htmlSrc);

  const instructionsFragment: HowToStep[] = instructions.map((instruction) => ({
    "@type": "HowToStep",
    text: instruction,
  }));

  const jsonLd: WithContext<Recipe> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    author,
    dateModified: article.updatedAt,
    datePublished: article.publishedAt,
    description: article.description,
    image: [article.image.url],
    keywords,
    name: article.title,
    publisher: organizationFragment,
    recipeCategory: article.category.name,
    recipeCuisine: "Japanese",
    recipeIngredient: ingredients,
    recipeInstructions: instructionsFragment,
    url,
  };

  return JSON.stringify(jsonLd);
};
