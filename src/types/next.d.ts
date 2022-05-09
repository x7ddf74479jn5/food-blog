// import type { NextPage } from "next";
// import type { AppProps } from "next/app";
// import type { ReactElement, ReactNode } from "react";

// declare module "next/app" {
//   type NextPageWithLayout = NextPage & {
//     getLayout?: (page: ReactElement) => ReactNode;
//   };
//   type AppPropsWithLayout = AppProps & {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     Component: NextPageWithLayout;
//   };
// }

// import type { NextPage } from "next";
// import type { AppProps } from "next/app";

// type PageAttributes = { getLayout?: (page: ReactElement) => JSX.Element };

// declare module "next" {
//   type CustomLayout = NonNullable<PageAttributes["getLayout"]>;
//   type CustomNextPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & PageAttributes;
// }

// declare module "next/app" {
//   type CustomAppPage<P = Record<string, unknown>> = (
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     props: AppProps<P> & { Component: NextPage & PageAttributes }
//   ) => JSX.Element;
// }
