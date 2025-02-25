import axios from "axios";

export const todoClient = axios.create({
  baseURL: "http://localhose:3000/todos",
});

export const getTodos = async (filter) => {
  const serachParams = new URLSearchParams();
  const { data } = await todoClient.get(`?${serachParams.toString()}`);
  if (filter === "completed") {
    serachParams.append("completed", true);
  }

  if (filter === "pending") {
    serachParams.append("completed", false);
  }
  return data;
};
