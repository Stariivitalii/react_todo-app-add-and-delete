import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  filteredTodos: Todo[];
  handleTodoDelete: (todoId: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  handleTodoDelete,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoDelete={() => handleTodoDelete(todo.id)}
        />
      ))}
    </section>
  );
};
