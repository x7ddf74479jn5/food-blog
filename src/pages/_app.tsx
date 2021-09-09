// import "..//tailwindcss/tailwind.css";

// import "@styles/tailwind.css";
// import "src/styles/global.css";
import "tailwindcss/tailwind.css";

import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import MDXCustomComponents from "@/components/mdx/MDXCustomComponents";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXCustomComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
};

export default App;
