import axios from "axios";
import Shoutout from "../models/Shoutout";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const getAllShoutouts = (): Promise<Shoutout[]> => {
  return axios.get(`${baseUrl}/shoutouts`).then((res) => res.data);
};
export const getAllShoutoutsV2 = async (): Promise<Shoutout[]> => {
  return (await axios.get(`${baseUrl}/shoutouts`)).data;
};

export const addAShoutout = (newSO: Shoutout): Promise<Shoutout> => {
  return axios.post(`${baseUrl}/shoutouts`, newSO).then((res) => res.data);
};
export const addAShoutoutV2 = async (newSO: Shoutout): Promise<Shoutout> => {
  return (await axios.post(`${baseUrl}/shoutouts`, newSO)).data;
};

export const getShoutoutsByName = (aName: string): Promise<Shoutout[]> => {
  return axios.get(`${baseUrl}/shoutouts/${aName}`).then((res) => res.data);
};

export const deleteOneShoutout = (id: string): Promise<void | string> => {
  return axios.delete(`${baseUrl}/shoutouts/${id}`).then((res) => res.data);
};

export const getMyShoutouts = (name: string): Promise<Shoutout[]> => {
  return axios.get(`${baseUrl}/me/${name}`).then((res) => res.data);
};
