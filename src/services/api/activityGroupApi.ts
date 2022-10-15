import {
  TActivity,
  TActivityGroupList,
} from "../entities/activityGroupEntities";
import { urlApi } from "../../config/url";
import { env } from "../../config/env";

export const getActivityList = async () => {
  const result = await fetch(`${urlApi.activityGroup}?email=${env.email}`)
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TActivityGroupList>(result);
};

export const getActivityDetail = async (id: string) => {
  const result = await fetch(`${urlApi.activityGroup}/${id}`)
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TActivity>(result);
};

export const createActivity = async () => {
  const result = await fetch(`${urlApi.activityGroup}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: process.env.REACT_APP_EMAIL,
      title: "New Activity",
    }),
  })
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TActivity>(result);
};

export const editActivity = async (id: string, title: string) => {
  const result = await fetch(`${urlApi.activityGroup}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<TActivity>(result);
};

export const deleteActivity = async (id: string) => {
  const result = await fetch(`${urlApi.activityGroup}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => data);

  return Promise.resolve<null>(result);
};
