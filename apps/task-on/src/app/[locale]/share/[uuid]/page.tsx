'use client';
import { Container } from '@mui/material';
import { StyledPage } from '../../styles';
import { usePathname, useRouter } from 'next/navigation';
import useLocalStorageState from 'use-local-storage-state';
import { useEffect } from 'react';
import gql from 'graphql-tag';
import { updateTodoQuery } from '../../../api/graphql/queries/todo';
import { useMutation } from '@apollo/client';
import { Mutation, MutationUpdateTodoArgs } from '../../../../../graphql-codegen/generated';
import toast from 'react-hot-toast';

const updateTodo = gql`
  ${updateTodoQuery}
`;

export default function Index() {
    const isClient = typeof window !== 'undefined';
    const pathname = usePathname();
    const router = useRouter();
    const [locale, uuid] = pathname.split('/share/');

    const [, setLocalUUID] = useLocalStorageState<string>('uuid', {
      defaultValue: isClient ? uuid : '',
      defaultServerValue: '',
    });
    const [mutate] = useMutation<Mutation, MutationUpdateTodoArgs>(updateTodo);

    useEffect(() => {
      (async () => {
        if (uuid) {
          setLocalUUID(uuid);

          try {
            await mutate({ variables: { uuid, operations: { 'isShared': false } } });
            router.push(locale ?? '/ko');
          } catch {
            toast.error('잠시 후 다시 시도해주세요.');
          }
        }
      })();
    }, [locale, mutate, router, setLocalUUID, uuid]);

    return  <Container>
      <StyledPage>
        <p>로딩 중...</p>
      </StyledPage>
    </Container>;
};