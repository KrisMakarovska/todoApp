import classnames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onDelete: (id: number) => void,
  onStatusChange: (todo: Todo) => void,
  onTitleChange: (todo: Todo, todoTitle: string) => void,
  isLoading: boolean,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  onDelete,
  onStatusChange,
  onTitleChange,
  isLoading,
}) => {
  const { id, title, completed } = todo;

  const [titleChanger, setTitleChanger] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isFocusDisabled, setIsFocusDisabled] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleChangesCancel = (
    event: React.KeyboardEvent,
  ) => {
    if (event.key === 'Escape') {
      setTitleChanger(false);
      setNewTitle(title);
    }
  };

  const handleFormSubmitAndBlur = () => {
    if (newTitle === '') {
      setIsFocusDisabled(true);
      onDelete(id);
    } else {
      setTitleChanger(false);
      onTitleChange(todo, newTitle);
    }
  };

  return (
    <li
      className={classnames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            onStatusChange(todo);
          }}
        />
      </label>

      {titleChanger ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleFormSubmitAndBlur();
          }}
        >
          <input
            type="text"
            className="todo__title-field"
            autoFocus
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleFormSubmitAndBlur}
            onKeyUp={handleTitleChangesCancel}
            disabled={isFocusDisabled}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setTitleChanger(true)}
          >
            {newTitle}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => {
              onDelete(id);
            }}
          >
            ×
          </button>
        </>
      )}

      <div className={classnames(
        'modal overlay',
        { 'is-active': isLoading },
      )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
