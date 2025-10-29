export function getCommitLevelStatus(status: unknown): string {
  if (!status)
    return "";

  // If it's an object like { label: "Won" }, try to read label first
  if (typeof status === "object" && status !== null) {
    const label = (status as { label?: unknown }).label;
    if (typeof label === "string") {
      return getCommitLevelStatus(label); // re-call with string value
    }
  }

  if (typeof status === "string") {
    switch (status.toLowerCase()) {
      case "won":
        return "W";
      case "renewal":
        return "R";
      case "commit":
        return "C";
      case "likely":
        return "L";
      case "upside, not in funnel report":
        return "N";
      case "investment training":
        return "I";
      case "poc":
        return "P";
      case "pillar investment":
        return "B";
      default:
        return "W";
    }
  }

  return "";
}
