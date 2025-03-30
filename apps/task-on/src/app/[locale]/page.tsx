'use client';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import TodoItem from '../_components/todo-item';
import { Header, HeaderButtonBox, StyledPage, TodoInputBox, TodoListBox } from './styles';
import { ShareDialog } from '../_components/share-dialog';
import { ImportDialog } from '../_components/import-dialog';
import { IContent, ISubmitDate } from '../_common/type';
import { gql, useMutation, useQuery } from '@apollo/client';
import Container from './container';
import useLocalStorageState from 'use-local-storage-state';
import toast from 'react-hot-toast';
import {
  Mutation, MutationCreateTodoArgs, MutationCreateTodoItemArgs, MutationDeleteTodoItemArgs,
  MutationUpdateCompletedTodoArgs, ReadTodoQuery, ReadTodoQueryVariables,
} from '../../../graphql-codegen/generated';
import { useTranslations } from 'next-intl';
import {
  createTodoQuery as createQuery,
  updateTodoItemQuery as updateItemQuery,
  deleteTodoItemQuery as deleteItemQuery,
  createTodoItemQuery as createItemQuery
} from '../api/graphql/queries/todo';

const todosQuery = gql`
  query ReadTodo($uuid: String!) {
    readTodo(uuid: $uuid) {
      data {
        uuid
        content {
          id
          text
          completed
        }
      }
    }
  }
`;
const createTodoQuery = gql`
  ${createQuery}
`;
const createTodoItemQuery = gql`
  ${createItemQuery}
`;
const updateTodoQuery = gql`
  ${updateItemQuery}
`;
const deleteTodoItemQuery = gql`
  ${deleteItemQuery}
`;

export default function Index() {
  const isClient = typeof window !== 'undefined';
  const t = useTranslations('HomePage');

  const [todos, setTodos] = useLocalStorageState<Array<IContent>>('todos', {
    defaultValue: isClient && localStorage.getItem('todos') ?
      JSON.parse(localStorage.getItem('todos') || '[]') : [],
    defaultServerValue: [],
  });
  const [uuid, setUUID] = useLocalStorageState<string>('uuid', {
    defaultValue: isClient ? (localStorage.getItem('uuid') ?? '') : '',
    defaultServerValue: '',
  });

  const [newTodo, setNewTodo] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const { loading, data } = useQuery<ReadTodoQuery, ReadTodoQueryVariables>(
    todosQuery, { variables: { uuid }, skip: !uuid }
  );
  const [createTodo] =
    useMutation<Mutation, MutationCreateTodoArgs>(createTodoQuery);
  const [createTodoItem] =
    useMutation<Mutation, MutationCreateTodoItemArgs>(createTodoItemQuery);
  const [updateCompletedTodo] =
    useMutation<Mutation, MutationUpdateCompletedTodoArgs>(updateTodoQuery);
  const [deleteTodoItem] =
    useMutation<Mutation, MutationDeleteTodoItemArgs>(deleteTodoItemQuery);

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      const currentTodos: IContent[] = [...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }];
      setTodos(currentTodos);
      setNewTodo('');

      console.log({ uuid, contents: currentTodos });
      if (uuid)
        createTodoItem({ variables: { uuid, contents: currentTodos } });
    }
  }, [createTodoItem, newTodo, setTodos, todos, uuid]);

  const toggleTodo = useCallback(async (id: number, checked: boolean) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: checked } : todo
    ));

    if(uuid)
      await updateCompletedTodo({ variables: { uuid, id, completed: checked } });
  }, [setTodos, todos, updateCompletedTodo, uuid]);

  const deleteTodo = useCallback(async (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));

    if(uuid)
      await deleteTodoItem({ variables: { uuid, id}});
  }, [deleteTodoItem, setTodos, todos, uuid]);

  const handleShareSubmit = useCallback(async ({ uuid, password }: ISubmitDate) => {
    await createTodo({
      variables: {
        uuid,
        editKey: password,
        contents: todos,
      },
    }).catch(error => {
      console.error(error);
      toast.error('서버 에러. 잠시 후, 다시 시도해주세요.');
    }).then(() => {
      setUUID(uuid);
    });
  }, [createTodo, setUUID, todos]);

  const handleOpenShareDialog = () => setShareDialogOpen(true);
  const handleCloseShareDialog = () => setShareDialogOpen(false);

  const handleOpenImportDialog = () => setImportDialogOpen(true);
  const handleCloseImportDialog = () => setImportDialogOpen(false);

  useEffect(() => {
    if (!loading && data?.readTodo) {
      const content = data.readTodo.data?.content ?? [];
      const originIds = new Set(todos.map(todo => todo.id));
      const filteredTodo = content.filter(todo => !originIds.has(todo.id));
      setTodos(prev => prev.concat(filteredTodo));
    }
  }, [loading, data, todos, setTodos]);

  return <Container>
    <StyledPage>
      <Header>
        <h1>{ t('title') }</h1>
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
          onCloseAction={ handleCloseShareDialog }
          onSubmitAction={ handleShareSubmit }
        />
      </HeaderButtonBox>

      <TodoInputBox>
        <input
          placeholder={ t('addInputPlaceholder') }
          type="text"
          value={ newTodo }
          onChange={ (event) => setNewTodo(event.target.value) }
          onKeyDown={ (event) => event.key === 'Enter' && addTodo() }
        />
        <button onClick={ addTodo }>
          { t('add') }
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