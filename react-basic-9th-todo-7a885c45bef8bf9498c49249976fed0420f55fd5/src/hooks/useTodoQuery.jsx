import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTodos,
  deleteTodo,
  getTodos,
  toggleTodoComplete,
} from "../api/todoApi";

export const useTodoQuery = (filter) => {
  return useQuery({
    queryKey: ["todos", filter || "all"], // ✅ 기본값 "all"
    queryFn: () => getTodos(filter),
  });
};

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodos,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // ✅ 목록 갱신
    },
  });
};

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }) => toggleTodoComplete(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // ✅ 목록 갱신
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // ✅ 목록 갱신
    },
  });
};
