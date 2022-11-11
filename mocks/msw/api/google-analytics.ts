import { mockArticles } from "@mocks/data";
import type { ResponseResolver, RestContext, RestRequest } from "msw";

export const mockGetAnalyticsReport: ResponseResolver<RestRequest, RestContext> = async (_req, res, ctx) => {
  const { stock, tacoRice, tomatoSalad } = mockArticles;

  // @see https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/RunReportResponse
  const data = [
    {
      rows: [
        {
          dimensionValues: [
            // value: pagePath {string}
            {
              value: `/articles/${stock.id}`,
            },
          ],
          metricValues: [
            // value: pageViews {string}
            {
              value: "3",
            },
          ],
        },
        {
          dimensionValues: [
            {
              value: `/articles/${tomatoSalad.id}`,
            },
          ],
          metricValues: [
            {
              value: "2",
            },
          ],
        },
        {
          dimensionValues: [
            {
              value: `/articles/${tacoRice.id}`,
            },
          ],
          metricValues: [
            {
              value: "1",
            },
          ],
        },
      ],
    },
  ];

  return res(ctx.status(200), ctx.json(data));
};
