export function areObjectsEqual(a: any, b: any): boolean {
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return a === b;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length)
    return false;

  return aKeys.every(key => areObjectsEqual(a[key], b[key]));
}

type AnyObject = { [key: string]: any };

export function areArraysEqual(arr1: AnyObject[] | null | undefined, arr2: AnyObject[] | null | undefined): boolean {
  if (!arr1 || !arr2)
    return arr1 === arr2; // both null/undefined => equal, else not equal
  if (arr1.length !== arr2.length)
    return false;

  return arr1.every((item, index) => areObjectsEqual(item, arr2[index]));
};

export function formatMonthIndex(value: number) {
  if (value >= 1 && value <= 12) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  return value;
}
