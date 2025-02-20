import { useState, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";

import { todoClient } from "../../lib/todoClient";
const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    const { data } = await todoClient.get("/");
    setTodos(data);
  };

  const addTodos = async (text) => {
    const { data } = await todoClient.post("/", {
      text,
      completed: false,
    });

    await getTodos();
    return data;
  };

  // const toggleTodoCompleted = (id) => {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) =>
  //       todo.id === id
  //         ? {
  //             ...todo,
  //             completed: !todo.completed,
  //           }
  //         : todo
  //     )
  //   );
  // };

  const toggleTodoCompleted = async (id, currentCompleted) => {
    const { data } = await todoClient.patch(`/${id}`, {
      completed: !currentCompleted,
    });

    await getTodos();
    return data;
  };

  // const deleteTodo = (id) => {
  //   // todo.id가 내가 찾는 id와 같지 않을 때 true를 반환하여 그대로 남겨둠
  //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  // };

  const deleteTodo = async (id) => {
    const { data } = await todoClient.delete(`/${id}`);
    await getTodos();
    return data;
  };

  const getFilteredTodos = (selectedFilter) => {
    if (selectedFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    if (selectedFilter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }

    return todos;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodos,
        toggleTodoCompleted,
        deleteTodo,
        getFilteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
