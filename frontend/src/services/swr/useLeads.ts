import useSWR from "swr";
import { fetcher } from "../swrFetcher";

export const useLeads = () => {
  return useSWR(`/leads`, fetcher);
};
