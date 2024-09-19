export const MIN_POPULARITY = 0;
export const MAX_POPULARITY = 36117;
export const MAX_RELEASE_YEAR = new Date().getFullYear();
const MIN_RELEASE_YEAR = 1874;
export const AVAILABLE_YEARS = Array.from(
  { length: MAX_RELEASE_YEAR - MIN_RELEASE_YEAR + 1 },
  (_, index) => MAX_RELEASE_YEAR - index
);
