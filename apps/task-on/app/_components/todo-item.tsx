import { css, keyframes, styled } from '@mui/material';
import { useState } from 'react';

// 애니메이션 정의 (fadeIn, fadeOut)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

interface TodoItemContainerProps {
  removing?: boolean;
  children?: React.ReactNode;
}

const TodoItemContainer = styled('div')<TodoItemContainerProps>((props) => css`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 20px;
  border-bottom: solid 1px #bac1c2;
  animation: ${(props.removing ? fadeOut : fadeIn)} 0.3s forwards;

  input[type="checkbox"] {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    border: 2px solid ${props.theme.palette.divider};
    border-radius: 3px;
    cursor: pointer;
    accent-color: ${props.theme.palette.taskOn.lightGreen};
  }

  .todo-text {
    flex: 1;

    &.completed {
      text-decoration: line-through;
      color: #7f8c8d;
    }
  }

  .delete-btn {
    background: none;
    border: none;
    color: ${props.theme.palette.error.main};
    cursor: pointer;
    font-size: 24px;
  }
`);

// 개별 할 일 아이템 컴포넌트 (삭제 애니메이션 적용)
export default function TodoItem({ todo, onToggle, onDeleteRequest }: {
  todo: { id: number; text: string; completed: boolean },
  onToggle: (id: number) => void,
  onDeleteRequest: (id: number) => void
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = () => {
    // 삭제 애니메이션 시작
    setIsRemoving(true);
    // 300ms 후에 실제로 할 일 삭제
    setTimeout(() => {
      onDeleteRequest(todo.id);
    }, 300);
  };

  return (
    <TodoItemContainer removing={isRemoving}>
      <input
        checked={todo.completed}
        type="checkbox"
        onChange={() => onToggle(todo.id)}
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      <button className="delete-btn" onClick={handleDelete}>
        ×
      </button>
    </TodoItemContainer>
  );
}