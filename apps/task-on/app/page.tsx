'use client';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import TodoItem from './_components/todo-item';
import { Header, HeaderButtonBox, StyledPage, TodoInputBox, TodoListBox } from './styles';
import { ShareDialog } from './_components/share-dialog';
import { ImportDialog } from './_components/import-dialog';
import { IContent, ISubmitDate } from './_common/type';
import { gql, useMutation, useQuery } from '@apollo/client';
import Container from './container';
import useLocalStorageState from 'use-local-storage-state';
import toast from 'react-hot-toast';
import { ReadTodoQuery, ReadTodoQueryVariables } from '../graphql-codegen/generated';

const todosQuery = gql`
  query ReadTodo($uuid: String!) {
    readTodo(uuid: $uuid) {
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
  mutation CreateTodo($uuid: String!, $editKey: String!, $content: [ContentInput!]!) {
    createTodo(uuid: $uuid, editKey: $editKey, content: $content)
  }
`;

export default function Index() {
  const [todos, setTodos] = useLocalStorageState<Array<IContent>>('todos', {
    defaultValue: typeof window !== 'undefined' && localStorage.getItem('todos') ?
      JSON.parse(localStorage.getItem('todos') || '[]') : [],
    defaultServerValue: [],
  });
  const isClient = typeof window !== 'undefined';

  const [uuid] = useLocalStorageState('uuid', {
    defaultValue: isClient && localStorage.getItem('uuid') || undefined
  });

  const [newTodo, setNewTodo] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const { loading, data } = useQuery<ReadTodoQuery, ReadTodoQueryVariables>(
    todosQuery, { variables: { uuid }, skip: !isClient || !uuid }
  );
  const [createTodo] = useMutation(createTodoQuery);

  const addTodo = () => {
    if (newTodo.trim()) {
      const currentTodos: IContent[] = [...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }];
      setTodos(currentTodos);
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

  const handleSubmit = useCallback(async ({ uuid, password }: ISubmitDate) => {
    await createTodo({
      variables: {
        uuid,
        editKey: password,
        content: todos,
      },
    }).catch(error => {
      console.error(error);
      toast.error('서버 에러. 잠시 후, 다시 시도해주세요.');
    });
  }, [createTodo, todos]);

  const handleOpenShareDialog = () => setShareDialogOpen(true);
  const handleCloseShareDialog = () => setShareDialogOpen(false);

  const handleOpenImportDialog = () => setImportDialogOpen(true);
  const handleCloseImportDialog = () => setImportDialogOpen(false);

  useEffect(() => {
    if(!loading || !data)
      return undefined;
    if (!data?.readTodo)
      return undefined;

    const { content } = data.readTodo;
    const originIds = todos.map(todo => todo.id);
    const filteredTodo = content.filter(todo => !originIds.includes(todo.id));
    setTodos(prev => prev.concat(filteredTodo));

  }, [loading, data, setTodos, todos]);

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