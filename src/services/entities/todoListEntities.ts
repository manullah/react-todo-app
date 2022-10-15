import { Priority } from "../enum/todoListEnum";

export type TTodoList = {
  data: TTodo[];
  limit: number;
  skip: number;
  total: number;
};

export type TTodo = {
  id: string;
  activity_group_id: string;
  title: string;
  is_active: number;
  priority: Priority;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export interface IAddTodoForm {
  activity_group_id: string;
  title?: string;
  priority?: string;
  is_active?: number;
}
