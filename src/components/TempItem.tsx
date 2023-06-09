import { Todo } from '../types/Todo';

type Props = {
  tempTodo: Todo,
};

export const TempItem: React.FC<Props> = ({ tempTodo }) => {
  return (
    <div className="todo">
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span className="todo__title">{tempTodo.title}</span>

      <button type="button" className="todo__remove">×</button>

      <div className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
