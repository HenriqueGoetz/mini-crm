import { Lead } from "./Lead";

export type ColumnStatus = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  leads: Lead[];
};
