export function getUniqueValues<T, K extends keyof T>(
  items: T[],
  field: K,
): string[] {
  const uniqueValues = new Set<string>();
  items.forEach((item) => {
    uniqueValues.add(String(item[field]));
  });
  return Array.from(uniqueValues);
}

export function getUniqueYearsFromDates<T, K extends keyof T>(
  items: T[],
  field: K,
): string[] {
  const uniqueYears = new Set<string>();
  items.forEach((item) => {
    const dateValue = new Date(String(item[field]));
    if (!isNaN(dateValue.getTime())) {
      uniqueYears.add(dateValue.getFullYear().toString());
    }
  });
  return Array.from(uniqueYears);
}
