export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  statusId: number;
  owner: {
    id: number;
    username: string;
  };
};
