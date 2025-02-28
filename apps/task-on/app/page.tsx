'use client';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import TodoItem from './_components/todo-item';
import { Header, HeaderButtonBox, StyledPage, TodoInputBox, TodoListBox } from './styles';
import { ShareDialog } from './_components/share-dialog';
import { ImportDialog } from './_components/import-dialog';
import { TSubmitDate, TContent } from './_common/type';
import { gql, useMutation, useQuery } from '@apollo/client';
import Container from './container';
import { v4 as uuidv4 } from 'uuid';

const todosQuery = gql`
  query ReadTodos($uuid: String!) {
    readTodos(uuid: $uuid) {
      uuid
      editKey
      content {
        id
        text
        completed
      }
    }
  }
`;
const createTodoQuery = gql`
  mutation CreateTodo($uuid: String!, $editKey: String!, $content: [TContent]!) {
    createTodo(uuid: $uuid, editKey: $editKey, content: $content)
  }
`;

export default function Index() {
  const [todos, setTodos] = useState<Array<TContent>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [uuid, setUUID] = useState<string>();

  const { loading, data } = useQuery(todosQuery, { variables: { uuid }, skip: !uuid });
  const [createTodo] = useMutation(createTodoQuery);


  const addTodo = () => {
    if (newTodo.trim()) {
      const currentTodos: TContent[] = [...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }];
      setTodos(currentTodos);
      setNewTodo('');
      localStorage.setItem('todos', JSON.stringify(currentTodos));
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

  const handleSubmit = useCallback(async ({ uuid, password }: TSubmitDate) => {
    await createTodo({
      variables: {
        uuid,
        editKey: password,
        content: todos,
      },
    });
  }, [createTodo, todos]);

  const handleOpenShareDialog = () => setShareDialogOpen(true);
  const handleCloseShareDialog = () => setShareDialogOpen(false);

  const handleOpenImportDialog = () => setImportDialogOpen(true);
  const handleCloseImportDialog = () => setImportDialogOpen(false);

  useEffect(() => {
    if(!loading)
      return undefined;

    const totalTodos: TContent[] = [];

    if (data && data.todos)
      totalTodos.push(data.todos);

    const savedTodos = localStorage.getItem('todos');

    if (savedTodos)
      totalTodos.push(...JSON.parse(savedTodos));

    setTodos(totalTodos);
  }, [loading, data]);

  useEffect(() => {
    setUUID(localStorage.getItem('uuid') || uuidv4());
  }, []);

  return <Container>
    <StyledPage>
      <Header>
        <h1>할 일</h1>
      </Header>

      <HeaderButtonBox>
        <Button
          color="primary"
          startIcon={ <FileDownloadIcon style={ { width: 20 } } /> }
          variant="contained"
          onClick={ handleOpenImportDialog }
        />
        <ImportDialog open={ importDialogOpen } onClose={ handleCloseImportDialog } />
        <Button
          color="primary"
          startIcon={ <FileUploadIcon style={ { width: 20 } } /> }
          sx={ { ml: 0.5 } }
          variant="contained"
          onClick={ handleOpenShareDialog }
        />
        <ShareDialog
          open={ shareDialogOpen }
          onClose={ handleCloseShareDialog }
          onSubmit={ handleSubmit }
        />
      </HeaderButtonBox>

      <TodoInputBox>
        <input
          placeholder="할 일을 입력하세요"
          type="text"
          value={ newTodo }
          onChange={ (e) => setNewTodo(e.target.value) }
          onKeyDown={ (e) => e.key === 'Enter' && addTodo() }
        />
        <button onClick={ addTodo }>
          추가
        </button>
      </TodoInputBox>

      <TodoListBox>
        { todos.map(todo => (
          <TodoItem
            key={ todo.id }
            todo={ todo }
            onDeleteRequest={ deleteTodo }
            onToggle={ toggleTodo }
          />
        )) }
      </TodoListBox>
    </StyledPage>
  </Container>;
}