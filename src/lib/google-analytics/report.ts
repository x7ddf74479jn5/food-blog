import { BetaAnalyticsDataClient } from "@google-analytics/data";

const projectId = process.env.GCP_PROJECT_ID;
const propertyId = 293317598;

type ReportRow = {
  id: string; // 記事ID
  pageViews: string;
  order: number;
};

/**
 * 閲覧数の多いページの内、レシピ記事以外のページを除外して返す(上限5)
 * 3ヶ月前から前日までの期間で算定
 * @see https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
 */
export const runReport = async (): Promise<ReportRow[] | undefined> => {
  const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString());

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials,
    projectId,
  });
  const [response] = await analyticsDataClient.runReport({
    dateRanges: [
      {
        endDate: "1daysAgo",
        startDate: "90daysAgo",
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: {
          matchType: "CONTAINS",
          value: "articles",
        },
      },
    },
    dimensions: [
      {
        name: "pagePath",
      },
    ],
    limit: 100,
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
    orderBys: [
      {
        desc: true,
        metric: {
          metricName: "screenPageViews",
        },
      },
    ],
    property: `properties/${propertyId}`,
  });

  if (response?.rows?.length === 0) return;

  const result = response.rows
    ?.map((row) => {
      const pagePath = row?.dimensionValues?.[0].value;
      const pageViews = row?.metricValues?.[0].value;
      if (!pagePath || !pageViews) return;
      return { pagePath, pageViews };
    })
    .filter((obj): obj is NonNullable<{ pagePath: string; pageViews: string }> => obj !== undefined)
    .filter(({ pagePath }) => !pagePath?.startsWith("/articles/categories") && !pagePath?.startsWith("/articles/tags"))
    .map(({ pagePath, pageViews }, idx) => ({ id: pagePath?.split("/")[2], order: ++idx, pageViews }))
    .slice(0, 5);

  return result;
};
