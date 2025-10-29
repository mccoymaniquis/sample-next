export function paramsToUrl(data: { [key: string]: string | number | boolean | null | undefined }) {
  return Object.keys(data)
    .map(key => data[key] != null ? `${key}=${encodeURIComponent(data[key])}` : "")
    .filter(param => param !== "")
    .join("&");
}
