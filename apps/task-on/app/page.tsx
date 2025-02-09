'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './_components/todo-item';

// 전체 페이지 스타일 (필기노트 느낌 적용)
const StyledPage = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background: #f6f5f0;
  min-height: 100vh;
  
  .header {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 32px;
      color: #2c3e50;
      text-decoration: underline;
      text-decoration-style: wavy;
      text-decoration-color: #e74c3c;
    }
  }

  .todo-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    
    input {
      flex: 1;
      padding: 12px;
      border: none;
      border-bottom: 2px solid #95a5a6;
      border-radius: 0;
      font-size: 20px;
      background: transparent;
      
      &:focus {
        outline: none;
        border-bottom-color: #3498db;
      }
    }

    button {
      padding: 8px 16px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 20px;
      font-size: 18px;
      cursor: pointer;
      
      &:hover {
        background: #2980b9;
      }
    }
  }

  .todo-list {
    /* todo-item 컴포넌트가 들어올 영역 */
  }
`;

export default function Index() {
  const [todos, setTodos] = useState<Array<{ id: number, text: string, completed: boolean }>>([]);
  const [newTodo, setNewTodo] = useState('');

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

  const aiReviewTest = (unusedValue: number) => {
    console.log(123);
    console.log(456);
    var a = '123';
    let lerRe_erq = 'asdasd';
  }

  return (
    <StyledPage>
      <div className="header">
        <h1>할 일</h1>
      </div>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="할 일을 입력하세요"
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>
          추가
        </button>
      </div>

      <div className="todo-list">
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