import { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ActionButton } from "./TodoItem";
import { TodoContext } from "../../context/TodoContext";

const TodoForm = () => {
  const { addTodos } = useContext(TodoContext);
  const [todoText, setTodoText] = useState("");
  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText.trim()) {
      return;
    }

    addTodos(todoText);

    setTodoText("");
  };

  const handleChangeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  return (
    <TodoFormWrapper onSubmit={handleSubmit}>
      <TodoFormInput
        type="text"
        value={todoText}
        onChange={handleChangeTodoText}
        placeholder="할 일을 입력하세요"
        ref={inputFocus} // 이제 컴포넌트 렌더링하자마자 바로 input에 입력 가능한 focus 기능이 주어짐
      />
      <SubmitButton type="submit" $bgColor="#582be6">
        제출하기
      </SubmitButton>
    </TodoFormWrapper>
  );
};

const TodoFormWrapper = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TodoFormInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: white;
  flex: 8;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #582be6;
    outline: none;
  }
`;

const SubmitButton = styled(ActionButton)`
  flex: 1;
  text-align: center;
`;

export default TodoForm;
