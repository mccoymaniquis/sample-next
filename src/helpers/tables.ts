export type RowData = { [key: string]: any };

/**
 * This returns number of rowspan based on the given column
 *
 * @param index number
 * @param key string
 * @param data any
 * @returns
 */
export function getRowSpan(index: number, key: string, data: Record<string, any>[]): number {
  const currentValue = data[index][key] ?? null;

  if (index > 0 && currentValue === data[index - 1][key]) {
    return 0; // Hide duplicate cells
  }

  let span = 1;
  for (let i = index + 1; i < data.length; i++) {
    if (data[i][key] !== currentValue)
      break;
    span++;
  }

  return span;
}
