import { render, screen } from "jest/test-utils";
// import { server } from "mocks/msw/server";
// import { Suspense } from "react";
import renderer from "react-test-renderer";

// import { HttpErrorBoundary } from "@/components/atoms/error";
// import { ArticleSkeltonList } from "@/components/molecules/ArticleSkeltonList";
import { ArticleContainer } from ".";
import Component from "./Component";

// beforeAll(() => server.listen());
// afterAll(() => server.close());

// jest.mock("@/hooks/useGetArticleListQuery", () => {
//   const useGetArticleListQuery = jest.fn().mockReturnValue({});
// });

// const mockRouter = { query: { q: "copy" } };

describe("components/molecules/ArticleContainer", () => {
  it("should ", async () => {
    // <HttpErrorBoundary>
    //   <Suspense fallback={<ArticleSkeltonList />}>
    //     <Component />
    //   </Suspense>
    // </HttpErrorBoundary>;

    await render(<ArticleContainer />);
    // await Component;
    await Component;

    // await render(
    //   <HttpErrorBoundary>
    //     <Suspense fallback={<ArticleSkeltonList />}>
    //       <Component />
    //     </Suspense>
    //   </HttpErrorBoundary>
    // );
    // await Component;

    screen.debug();
  });

  it("snapshot", async () => {
    await Component;

    // const test = withMockedRouter(
    //   mockRouter,
    //   <HttpErrorBoundary>
    //     <Suspense fallback={<ArticleSkeltonList />}>
    //       <Component />
    //     </Suspense>
    //   </HttpErrorBoundary>
    // );

    // const tree = await renderer.create(test).toJSON();
    // const tree = await renderer.create(<Component />).toJSON();
    const tree = await renderer.create(<ArticleContainer />).toJSON();
    // await Component;
    expect(tree).toMatchSnapshot();
  });
});
