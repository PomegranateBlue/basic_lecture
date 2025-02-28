import { useSearchParams } from "react-router-dom";

export const useFilterParams = () => {
  const [searchParams] = useSearchParams();
  const selectedFilter = searchParams.get("filter");
  return selectedFilter;
};
