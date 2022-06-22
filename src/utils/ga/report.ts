import { BetaAnalyticsDataClient } from "@google-analytics/data";

// const credentialsJsonPath = "./credentials.json";

const projectId = process.env.GA_PROPERTY_ID;
const credential = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString());
const propertyId = 293317598;

const analyticsDataClient = new BetaAnalyticsDataClient({
  // keyFilename: credentialsJsonPath,
  credential,
  projectId,
});

type ReportRow = {
  id: string;
  pageViews: string;
  order: number;
};

export const runReport = async () => {
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
  });

  if (response?.rows?.length === 0) return;

  const result = response.rows?.reduce((acc, row, index) => {
    if (!row.dimensionValues || !row.metricValues) return acc;

    const pagePath = row.dimensionValues[0].value;

    if (pagePath?.startsWith("/articles/categories/") || pagePath?.startsWith("/articles/tags/")) return acc;

    const id = pagePath?.split("/")[2];
    const pageViews = row.metricValues[0].value;

    if (!id || !pageViews) return acc;

    return [...acc, { id, pageViews, order: ++index }];
  }, [] as ReportRow[]);

  return result;
};
