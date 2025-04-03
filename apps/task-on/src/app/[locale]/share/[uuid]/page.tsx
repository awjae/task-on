'use client';
import { Container } from '@mui/material';
import { StyledPage } from '../../styles';
import { usePathname, useRouter } from 'next/navigation';
import useLocalStorageState from 'use-local-storage-state';
import { useEffect } from 'react';

export default function Index() {
    const isClient = typeof window !== 'undefined';
    const pathname = usePathname();
    const router = useRouter();
    const [locale, uuid] = pathname.split('/share/');

    const [, setLocalUUID] = useLocalStorageState<string>('uuid', {
      defaultValue: isClient ? uuid : '',
      defaultServerValue: '',
    });

    useEffect(() => {
      //TODO: isShared false로 변경해주는 api 필요
      if (uuid) {
        setLocalUUID(uuid);
        router.push(locale ?? '/ko');
      }
    }, [locale, router, setLocalUUID, uuid]);

    return  <Container>
      <StyledPage>
        <p>로딩 중...</p>
      </StyledPage>
    </Container>;
};