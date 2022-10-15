import moment from "moment";
import { useState } from "react";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodoDetail,
  getTodoList,
} from "../services/api/todoListApi";
import {
  IAddTodoForm,
  TTodo,
  TTodoList,
} from "../services/entities/todoListEntities";
import { Sort } from "../services/enum/sorting";

export const useTodoListHelper = () => {
  const [isLoading, setIsLoading] = useState({
    list: false,
    create: false,
    delete: false,
  });

  const [todoList, setTodoList] = useState<TTodoList>();
  const getList = async (activityId: string) => {
    setIsLoading((prev) => ({ ...prev, list: true }));
    const result = await getTodoList(activityId);
    setIsLoading((prev) => ({ ...prev, list: false }));

    setTodoList(result);
  };

  const [todoDetail, setTodoDetail] = useState<TTodo>();
  const getDetail = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, detail: true }));
    const result = await getTodoDetail(id);
    setIsLoading((prev) => ({ ...prev, detail: false }));
    setTodoDetail(result);
  };

  const handleCreate = async (data: IAddTodoForm) => {
    setIsLoading((prev) => ({ ...prev, create: true }));
    const result = await createTodo(data);
    setIsLoading((prev) => ({ ...prev, create: false }));

    await getList(data.activity_group_id);
    return Promise.resolve(result);
  };

  const handleEdit = async (id: string, data: IAddTodoForm) => {
    setIsLoading((prev) => ({ ...prev, edit: true }));
    const result = await editTodo(id, data);
    setIsLoading((prev) => ({ ...prev, edit: false }));

    await getList(data.activity_group_id);
    return Promise.resolve(result);
  };

  const handleDelete = async (id: string, activityId: string) => {
    setIsLoading((prev) => ({ ...prev, delete: true }));
    const result = await deleteTodo(id);
    setIsLoading((prev) => ({ ...prev, delete: false }));

    await getList(activityId);
    return Promise.resolve(result);
  };

  const doSorting = (sort: Sort) => {
    setIsLoading((prev) => ({ ...prev, list: true }));

    switch (sort) {
      case Sort.Newest:
        setTodoList((prev) => {
          prev?.data.sort((a, b) => {
            if (moment(a.created_at) < moment(b.created_at)) return -1;
            if (moment(a.title) > moment(b.title)) return 1;
            return 0;
          });
          return prev;
        });
        break;
      case Sort.Latest:
        setTodoList((prev) => {
          prev?.data.sort((a, b) => {
            if (moment(a.created_at) > moment(b.created_at)) return -1;
            if (moment(a.title) < moment(b.title)) return 1;
            return 0;
          });
          return prev;
        });
        break;
      case Sort.Az:
        setTodoList((prev) => {
          prev?.data.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
          return prev;
        });
        break;
      case Sort.Za:
        setTodoList((prev) => {
          prev?.data.sort((a, b) => {
            if (a.title > b.title) return -1;
            if (a.title < b.title) return 1;
            return 0;
          });
          return prev;
        });
        break;
      case Sort.NotYet:
        setTodoList((prev) => {
          prev?.data.sort((a, b) => {
            if (a.is_active === 1) return -1;
            if (a.is_active === 0) return 1;
            return 0;
          });
          return prev;
        });
        break;
    }

    setIsLoading((prev) => ({ ...prev, list: false }));
  };

  return {
    isLoading,
    setIsLoading,
    todoList,
    setTodoList,
    getList,
    todoDetail,
    getDetail,
    handleCreate,
    handleEdit,
    handleDelete,
    doSorting,
  };
};
