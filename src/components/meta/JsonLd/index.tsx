import type { Thing } from "schema-dts";

import { generateBlogJsonLd } from "./blogJsonLd";
import { generateRecipeJsonLd } from "./recipeJsonLd";
import { generateWebpageJsonLd } from "./webpageJsonLd";

export { generateBlogJsonLd, generateRecipeJsonLd, generateWebpageJsonLd };

export const JsonLdScript = ({ contents }: { contents: Array<Thing> }) => (
  <script
    id="json-ld"
    type="application/ld+json"
    defer
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(contents),
    }}
  />
);
