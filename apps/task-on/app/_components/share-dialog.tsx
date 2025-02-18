import { Fade, Modal, styled, Typography, TextField, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';

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

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log('비밀번호:', password);
    onClose();
  };

  return <Modal
    open={open}
    closeAfterTransition
    onClose={onClose}
>
    <Fade in={open}>
      <ModalBox>
        <Typography
          component="h2"
          id="transition-modal-title"
          sx={{ mb: 2, textAlign: 'center' }}
          variant="h6">
          비밀번호 입력
        </Typography>
        <TextField
          id="password-input"
          inputProps={{ maxLength: 4 }}
          label="비밀번호"
          sx={{ mt: 2, mb: 2, width: '100%' }}
          type="password"
          value={password}
          variant="outlined"
          onChange={handlePasswordChange}
      />
        <Button
          sx={{
          width: '100%',
          backgroundColor: '#3f51b5',
          '&:hover': { backgroundColor: '#303f9f' }
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          제출
        </Button>
      </ModalBox>
    </Fade>
  </Modal>
}