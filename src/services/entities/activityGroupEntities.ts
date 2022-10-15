export type TActivityGroupList = {
  data: TActivity[];
  limit: number;
  skip: number;
  total: number;
};

export type TActivity = {
  created_at: Date;
  id: string;
  title: string;
  todo_items: [];
};
