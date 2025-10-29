export const NAVIGATION_ROUTES = [
  {
    path: "/supply",
    name: "Supply List",
    description: "Supply page",
  },
  {
    path: "/demand",
    name: "Demand List",
    description: "Demand page",
  },
  {
    path: "/reports/supply-demand-forecast",
    name: "Reports",
    description: "Reports page",
    childPaths: [
      {
        path: "/reports/supply-demand-forecast",
        name: "Supply-Demand Forecast",
        description: "Supply-Demand Forecast page",
      },
      {
        path: "/reports/weekly-deployment",
        name: "Weekly Deployment",
        description: "Weekly Deployment page",
      },
    ],
  },
  {
    path: "/charts",
    name: "Charts",
    description: "Charts page",
  },
];
