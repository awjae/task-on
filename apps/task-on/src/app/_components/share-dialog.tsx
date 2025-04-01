'use client';
import { Fade, Modal, styled, Typography, Button, useTheme, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import useLocalStorageState from 'use-local-storage-state';

export const ModalBox = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #3f51b5;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export function ShareDialog({
  open,
  onCloseAction,
  onSubmitAction
}: {
  open: boolean;
  onCloseAction: () => void;
  onSubmitAction: (uuid: string) => void;
}) {
  const isClient = typeof window !== 'undefined';
  const theme = useTheme();
  const [uuid, setUUID] = useLocalStorageState('uuid', {
    defaultValue: isClient ? (localStorage.getItem('uuid') ?? '') : '',
    defaultServerValue: '',
  });
  const [shareURL, setShareURL] = useState<string|undefined>(() => {
    return uuid ? `${window.location.origin}/share/${uuid}` : undefined;
  });

  const handleClickCopy = () => {
    if (!shareURL)
      return undefined;

    const newUUID = uuid ?? uuidv4();
    setUUID(newUUID);
    onSubmitAction(newUUID);
    navigator.clipboard.writeText(shareURL);

    // TODO: QR 로 제공해도 좋을 듯.
    toast.success('링크가 클립보드에 복사되었습니다!');
  };

  useEffect(() => {
    if (!uuid)
      return undefined;

    setShareURL(`${window.location.origin}/share/${uuid}`);
  },[uuid]);

  return <Modal
    open={ open }
    closeAfterTransition
    onClose={ onCloseAction }
  >
    <Fade in={ open }>
      <ModalBox>
        <Box
          sx={ {
              backgroundColor: theme.palette.grey[200],
              p: 1,
              borderRadius: 4,
              mb: 1,
            } }
          onClick={ handleClickCopy }
          >
          <Typography color={ theme.palette.grey[600] } component="p">{ shareURL }</Typography>
        </Box>
        <Button
          color="success"
          sx={ { width: '100%' } }
          variant="outlined"
          onClick={ handleClickCopy }
          >
          링크 복사
        </Button>
      </ModalBox>
    </Fade>
  </Modal>;
}