export function uniqueElements<T, K extends keyof T>(array: T[], by: K) {
  const uniqueAddresses = Array.from(new Set(array.map((a) => a[by]))).map(
    (id) => {
      return array.find((a) => a[by] === id);
    },
  );
  return uniqueAddresses;
}
