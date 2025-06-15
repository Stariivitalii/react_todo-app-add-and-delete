import { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusFilterOptions } from '../components/StatusFilter';
import { Todo } from '../types/Todo';
import * as todosService from '../api/todos';
import { getFilteredTodos } from '../utils/getFilteredTodos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState(StatusFilterOptions.all);

  const handleHideError = useCallback(() => setErrorMessage(null), []);

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const visibleFooter = useMemo(() => todos.length > 0, [todos]);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, { status: statusFilter }),
    [todos, statusFilter],
  );

  const activeTodos = useMemo(
    () => todos.length - completedTodos.length,
    [todos, completedTodos],
  );

  const allTodosCompleted = useMemo(
    () => todos.length > 0 && completedTodos.length === todos.length,
    [todos, completedTodos],
  );

  const isCompletedTodos = useMemo(
    () => completedTodos.length > 0,
    [completedTodos],
  );

  useEffect(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(todosService.TodosError.unableToLoad);
      })
      .finally(() => setTodosLoading(false));
  }, []);

  const handleTodoDelete = (todoId: number) => {
    todosService
      .deleteTodos(todoId)
      .then(() =>
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        ),
      )
      .catch(() => setErrorMessage(todosService.TodosError.unableToDelete))
      .finally(() =>
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        ),
      );
  };

  const handleDeleteAllCompletedTodos = () => {
    Promise.all(completedTodos.map(todo => todosService.deleteTodos(todo.id)))
      .then(() =>
        setTodos(currentTodos => currentTodos.filter(todo => !todo.completed)),
      )
      .catch(() => setErrorMessage(todosService.TodosError.unableToDelete));
  };

  // const todoAdd = (title: string) => {
  //   todosService
  //     .addTodos({ userId: todosService.USER_ID, title, completed: false })
  //     .then(newTodo => {
  //       return setTodos(currentTodo => [...currentTodo, newTodo]);
  //     });
  // };

  return {
    todosLoading,
    errorMessage,
    statusFilter,
    setStatusFilter,
    handleHideError,
    visibleFooter,
    filteredTodos,
    activeTodos,
    handleTodoDelete,
    allTodosCompleted,
    isCompletedTodos,
    handleDeleteAllCompletedTodos,
  };
};
