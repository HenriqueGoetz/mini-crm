export type Interaction = {
  id: number;
  type: string;
  notes: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  leadId: number;
  userId: number;
  user: {
    id: number;
    username: string;
  };
};
