import axios from "axios";
import Shoutout from "../models/Shoutout";

const baseURL: string = process.env.REACT_APP_FUNCTIONS_BASE_URL || "";

export const getAllShoutouts = async (): Promise<Shoutout[]> => {
  return (await axios.get(`${baseURL}/shoutouts`)).data;
};

export const submitShoutout = async (shoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(`${baseURL}/shoutouts`, shoutout)).data;
};
