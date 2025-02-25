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

export const addTodos = async (todo) => {
  const { data } = await todoClient.post("/", {
    todo,
    completed: false,
  });
  return data;
};

export const toggleTodoComplete = async (id, todo) => {
  const { data } = await todoClient.patch(`${id}`, {
    completed: !todo,
  });
  return data;
};

export const deleteTodo = async (id) => {
  const { data } = await todoClient.delete(`/${id}`);
  return data;
};
