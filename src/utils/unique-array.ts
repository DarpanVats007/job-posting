export type UniqueFilter = <T>(items: T[], key: keyof T) => T[];

export const uniqueFilter: UniqueFilter = (items, key) => {
  const uniqueValues = new Set();
  return items.filter((item) => {
    const value = item[key];
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      return true;
    }
    return false;
  });
};
