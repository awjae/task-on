import { Fade, Modal, styled, Typography, TextField, Button, useTheme, Box } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

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
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const [shareURL, setShareURL] = useState<string|undefined>(undefined);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = useCallback(() => {
    console.log('비밀번호:', password);
    const currentDomain = window.location.origin; // 현재 도메인 가져오기
    const shareLink = `${currentDomain}/share/${uuidv4()}`;
    setShareURL(shareLink);
  }, [password]);

  const handleClickCopy = () => {
    if (!shareURL)
      return undefined;

    navigator.clipboard.writeText(shareURL);
    toast.success('링크가 클립보드에 복사되었습니다!');
  };

  return <Modal
    open={ open }
    closeAfterTransition
    onClose={ onClose }
  >
    <Fade in={ open }>
      <ModalBox>
        { !shareURL && <>
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
        { shareURL && <>
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