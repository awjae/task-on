'use client';
import { Fade, Modal, styled, Typography, TextField, Button, useTheme, Box } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { ISubmitDate } from '../_common/type';
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
  onSubmitAction: (data: ISubmitDate) => void;
}) {
  const isClient = typeof window !== 'undefined';
  const [password, setPassword] = useState('');
  const [passwordLayer, setPasswordLayer] = useState(false);
  const theme = useTheme();
  const [uuid, setUUID] = useLocalStorageState('uuid', {
    defaultValue: isClient ? (localStorage.getItem('uuid') ?? '') : '',
    defaultServerValue: '',
  });
  const [shareURL, setShareURL] = useState<string|undefined>(() => {
    return uuid ? `${window.location.origin}/share/${uuid}` : undefined;
  });

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = useCallback(() => {
    const currentDomain = window.location.origin;
    const uuid = uuidv4();
    const shareLink = `${currentDomain}/share/${uuid}`;
    setShareURL(shareLink);
    setUUID(uuid);
    setPasswordLayer(false);
    onSubmitAction({ uuid, password });
  }, [onSubmitAction, password, setUUID]);

  const handleClickCopy = () => {
    if (!shareURL)
      return undefined;

    if (!password) {
      setPasswordLayer(true);
      return undefined;
    }

    const newUUID = uuid ?? uuidv4();
    setUUID(newUUID);
    onSubmitAction({ uuid: newUUID, password });
    navigator.clipboard.writeText(shareURL);
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
        { passwordLayer && <>
          <Typography
            component="h2"
            id="transition-modal-title"
            sx={ { mb: 2, textAlign: 'center' } }
            variant="h6">
            공유 비밀번호 입력
          </Typography>
          <TextField
            color="success"
            id="password-input"
            inputProps={ { maxLength: 4 } }
            label="비밀번호"
            sx={ { mt: 2, mb: 2, width: '100%' } }
            type="password"
            value={ password }
            variant="outlined"
            onChange={ handlePasswordChange }
          />
          <Button
            sx={ {
              width: '100%',
              backgroundColor: theme.palette.taskOn.lightGreen,
              '&:hover': { backgroundColor: theme.palette.taskOn.oliveGreen }
            } }
            variant="contained"
            onClick={ handleSubmit }
          >
            제출
          </Button>
        </> }
        { !passwordLayer && <>
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
        </> }
      </ModalBox>
    </Fade>
  </Modal>;
}