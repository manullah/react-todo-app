import { urlApi } from "../../config/url";
import { IAddTodoForm, TTodo, TTodoList } from "../entities/todoListEntities";

export const getTodoList = async (activityId: string) => {
  const result = await fetch(
    `${urlApi.todoItem}?activity_group_id=${activityId}`
  )
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TTodoList>(result);
};

export const getTodoDetail = async (id: string) => {
  const result = await fetch(`${urlApi.todoItem}/${id}`)
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TTodo>(result);
};

export const createTodo = async (data: IAddTodoForm) => {
  const result = await fetch(`${urlApi.todoItem}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TTodo>(result);
};

export const editTodo = async (id: string, data: IAddTodoForm) => {
  const result = await fetch(`${urlApi.todoItem}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TTodo>(result);
};

export const deleteTodo = async (id: string) => {
  const result = await fetch(`${urlApi.todoItem}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<null>(result);
};
