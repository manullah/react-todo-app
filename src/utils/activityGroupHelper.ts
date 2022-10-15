import { useState } from "react";
import {
  createActivity,
  deleteActivity,
  editActivity,
  getActivityDetail,
  getActivityList,
} from "../services/api/activityGroupApi";
import {
  TActivity,
  TActivityGroupList,
} from "../services/entities/activityGroupEntities";

export const useActivityGroupHelper = () => {
  const [isLoading, setIsLoading] = useState({
    list: false,
    create: false,
    delete: false,
  });

  const [activityList, setActivityList] = useState<TActivityGroupList>();
  const getList = async () => {
    setIsLoading((prev) => ({ ...prev, list: true }));
    const result = await getActivityList();
    setIsLoading((prev) => ({ ...prev, list: false }));

    setActivityList(result);
  };

  const [activityDetail, setActivityDetail] = useState<TActivity>();
  const getDetail = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, detail: true }));
    const result = await getActivityDetail(id);
    setIsLoading((prev) => ({ ...prev, detail: false }));

    setActivityDetail(result);
  };

  const handleCreate = async () => {
    setIsLoading((prev) => ({ ...prev, create: true }));
    const result = await createActivity();
    setIsLoading((prev) => ({ ...prev, create: false }));

    await getList();
    return Promise.resolve(result);
  };

  const handleEdit = async (id: string, title: string) => {
    setIsLoading((prev) => ({ ...prev, edit: true }));
    const result = await editActivity(id, title);
    setIsLoading((prev) => ({ ...prev, edit: false }));

    await getDetail(id);
    return Promise.resolve(result);
  };

  const handleDelete = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, delete: true }));
    const result = await deleteActivity(id);
    setIsLoading((prev) => ({ ...prev, delete: false }));

    await getList();
    return Promise.resolve(result);
  };

  return {
    isLoading,
    setIsLoading,
    activityList,
    getList,
    activityDetail,
    getDetail,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
