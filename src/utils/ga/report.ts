import { BetaAnalyticsDataClient } from "@google-analytics/data";

const projectId = process.env.GCP_PROJECT_ID;
const propertyId = 293317598;

type ReportRow = {
  id: string; // 記事ID
  pageViews: string;
  order: number;
};

/**
 * 閲覧数の多いページの内、レシピ記事以外のページを除外して返す
 * 4ヶ月前から前日までの期間で算定
 */
export const runReport = async () => {
  const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString());

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials,
    projectId,
  });
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "90daysAgo",
        endDate: "1daysAgo",
      },
    ],
    dimensions: [
      {
        name: "pagePath",
      },
    ],
    dimensionFilter: {
      filter: {
        stringFilter: {
          value: "articles",
          matchType: "CONTAINS",
        },
        fieldName: "pagePath",
      },
    },
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
    limit: 100,
  });

  if (response?.rows?.length === 0) return;

  const result = response.rows?.reduce((acc, row, index) => {
    if (!row.dimensionValues || !row.metricValues) return acc;

    const pagePath = row.dimensionValues[0].value;

    if (pagePath?.startsWith("/articles/categories/") || pagePath?.startsWith("/articles/tags/")) return acc;

    const id = pagePath?.split("/")[2];
    const pageViews = row.metricValues[0].value;

    if (!id || !pageViews) return acc;
    return [...acc, { id, pageViews, order: index }];
  }, [] as ReportRow[]);

  return result;
};
