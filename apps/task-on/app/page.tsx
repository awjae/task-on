'use client';
import ShareIcon from '@mui/icons-material/Share'; // MUI 공유 아이콘 임포트
import { Button } from '@mui/material'; // MUI 버튼 임포트
import { useEffect, useState } from 'react';
import TodoItem from './_components/todo-item';
import { Header, HeaderButtonBox, StyledPage, TodoInputBox, TodoListBox } from './styles';
import { ShareDialog } from './_components/share-dialog';

export default function Index() {
  const [todos, setTodos] = useState<Array<{ id: number, text: string, completed: boolean }>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleOpenEditKey = () => setOpen(true);
  const handleCloseEditKey = () => setOpen(false);

  return (
    <StyledPage>
      <Header>
        <h1>할 일</h1>
      </Header>

      <HeaderButtonBox>
        <Button
          color="primary"
          startIcon={<ShareIcon style={{ width: 20 }} />} // 아이콘 추가
          sx={{ 'span' : { mr: 0 } }}
          variant="contained"
          onClick={handleOpenEditKey}
        />
        <ShareDialog open={open} onClose={handleCloseEditKey} />
      </HeaderButtonBox>

      <TodoInputBox>
        <input
          placeholder="할 일을 입력하세요"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>
          추가
        </button>
      </TodoInputBox>

      <TodoListBox>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteRequest={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </TodoListBox>
    </StyledPage>
  );
}