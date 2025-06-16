import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  filteredTodos: Todo[];
  handleTodoDelete: (todoId: number) => void;
  deleteTodoIds: number | null;
  tempTodo: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  handleTodoDelete,
  deleteTodoIds,
  tempTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoDelete={() => handleTodoDelete(todo.id)}
          isProcessingDeleteTodo={deleteTodoIds === todo.id}
        />
      ))}

      {tempTodo && (
        <TodoItem
          key={tempTodo.id}
          todo={tempTodo}
          onTodoDelete={() => handleTodoDelete(tempTodo.id)}
          isProcessingDeleteTodo={true}
        />
      )}
    </section>
  );
};
