import useSWR from "swr";
import { fetcher } from "../swrFetcher";

export const useStatus = () => {
  return useSWR(`/status`, fetcher);
};
