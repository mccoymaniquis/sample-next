type OptionType = {
  id: number | string;
  label: string;
};

export const roleFamilyOptions: OptionType[] = [
  {
    id: "Technical Support",
    label: "Technical Support",
  },
  {
    id: "Quality Engineer: Software, Systems, DevOps",
    label: "Quality Engineer: Software, Systems, DevOps",
  },
  {
    id: "Service Desk",
    label: "Service Desk",
  },
  {
    id: "Business Analyst",
    label: "Business Analyst",
  },
  {
    id: "Cloud Reliability Management Analyst",
    label: "Cloud Reliability Management Analyst",
  },
  {
    id: "Software Engineer: Backend Java, Springboot",
    label: "Software Engineer: Backend Java, Springboot",
  },
  {
    id: "Data Engineer",
    label: "Data Engineer",
  },
  {
    id: "Data Administrator",
    label: "Data Administrator",
  },
  {
    id: "Software Engineer: Full Stack Node.js/ReactJS",
    label: "Software Engineer: Full Stack Node.js/ReactJS",
  },
  {
    id: "SOLUTIONS CONSULTANT",
    label: "SOLUTIONS CONSULTANT",
  },
];

export const careerLevelOptions = [
  {
    id: 1,
    label: "1",
  },
  {
    id: 2,
    label: "2",
  },
  {
    id: 3,
    label: "3",
  },
  {
    id: 4,
    label: "4",
  },
  {
    id: 5,
    label: "5",
  },
  {
    id: 6,
    label: "6",
  },
  {
    id: 7,
    label: "7",
  },
];

export const status = [
  {
    id: "Demand - SOed".replace(/\s/g, "_"),
    label: "Demand - SOed",
  },
  {
    id: "Demand - T1".replace(/\s/g, "_"),
    label: "Demand - T1",
  },
  {
    id: "Demand - T2, Non commits".replace(/\s/g, "_"),
    label: "Demand - T2, Non commits",
  },
  {
    id: "Total Demands".replace(/\s/g, "_"),
    label: "Total Demands",
  },
  {
    id: "Supply".replace(/\s/g, "_"),
    label: "Supply",
  },
  {
    id: "Supply Projection".replace(/\s/g, "_"),
    label: "Supply Projection",
  },
  {
    id: "Bench Projection".replace(/\s/g, "_"),
    label: "Bench Projection",
  },
  {
    id: "Projected_Bench_Cost".replace(/\s/g, "_"),
    label: "Projected_Bench_Cost",
  },
  {
    id: "Bench After SOed".replace(/\s/g, "_"),
    label: "Bench After SOed",
  },
  {
    id: "Bench - After SOed & T1".replace(/\s/g, "_"),
    label: "Bench - After SOed & T1",
  },
  {
    id: "Bench (all Demands)".replace(/\s/g, "_"),
    label: "Bench (all Demands)",
  },
];

export const opptyTaggingOptions = [
  {
    id: "SOED",
    label: "SOED",
  },
  {
    id: "T1",
    label: "T1",
  },
  {
    id: "T2",
    label: "T2",
  },
  {
    id: "NC",
    label: "NC",
  },
];

export const opptyFunnelOptions = [
  {
    id: "C",
    label: "Carry Over",
  },
  {
    id: "R",
    label: "Renewal",
  },
  {
    id: "F",
    label: "Funnel",
  },
  {
    id: "ANN",
    label: "Assumed Net New",
  },
];

export const soTagOptions = [
  {
    id: "Y",
    label: "Y",
  },
  {
    id: "R",
    label: "R",
  },
  {
    id: "N",
    label: "N",
  },
  {
    id: "I",
    label: "I",
  },
];

export const frequencies = [
  {
    id: "daily",
    label: "Daily",
  },
  {
    id: "weekly",
    label: "Weekly",
  },
  {
    id: "monthly",
    label: "Monthly",
  },
  {
    id: "yearly",
    label: "Yearly",
  },
];
