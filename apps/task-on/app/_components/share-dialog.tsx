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
    onClose={onClose}
    closeAfterTransition
  >
    <Fade in={open}>
      <ModalBox>
        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
          비밀번호 입력
        </Typography>
        <TextField
          id="password-input"
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          inputProps={{ maxLength: 4 }}
          sx={{ mt: 2, mb: 2, width: '100%' }}
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: '100%', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
        >
          제출
        </Button>
      </ModalBox>
    </Fade>
  </Modal>
}