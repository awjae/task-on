'use client';
import ShareIcon from '@mui/icons-material/Share'; // MUI 공유 아이콘 임포트
import { Button, Fade, Modal, Typography } from '@mui/material'; // MUI 버튼 임포트
import { useEffect, useState } from 'react';
import TodoItem from './_components/todo-item';
import { ModalBox, StyledPage } from './styles';


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
      <div className='header'>
        <h1>할 일</h1>
      </div>

      <div className='header-button'>
        <Button
          variant="contained"
          color="primary"
          sx={{ 'span': { mr: 0 } }}
          startIcon={<ShareIcon style={{ width: 20 }} />} // 아이콘 추가
          onClick={handleOpenEditKey}
        />
        <Modal
          open={open}
          onClose={handleCloseEditKey}
          closeAfterTransition
        >
          <Fade in={open}>
            <ModalBox>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </ModalBox>
          </Fade>
        </Modal>
      </div>

      <div className='todo-input'>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='할 일을 입력하세요'
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>
          추가
        </button>
      </div>

      <div className='todo-list'>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDeleteRequest={deleteTodo}
          />
        ))}
      </div>
    </StyledPage>
  );
}