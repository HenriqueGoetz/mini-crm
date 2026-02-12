import useSWR from "swr";
import { fetcher } from "../swrFetcher";

export const useLead = (id: number) => {
  return useSWR(`/leads/${id}`, fetcher);
};
