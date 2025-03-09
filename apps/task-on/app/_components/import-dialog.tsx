import { Button, Fade, Modal, styled, TextField, useTheme } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';

export const ModalBox = styled('div')(({ theme}) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid ${theme.palette.divider};
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`);

export function ImportDialog({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const [importURL, setImportURL] = useState<string|undefined>(undefined);

  const handleChangeImportURL = (event: ChangeEvent<HTMLInputElement>) => {
    setImportURL(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = useCallback(() => {
    // TODO: DB값 가져와서 import

  }, []);

  return <Modal
    open={ open }
    closeAfterTransition
    onClose={ onClose }
  >
    <Fade in={ open }>
      <ModalBox>
        <TextField
          color="success"
          label="공유 URL 입력"
          sx={ { mt: 2, mb: 2, width: '100%' } }
          value={ importURL }
          variant="outlined"
          onChange={ handleChangeImportURL }
        />
        { importURL && <>
          <TextField
            color="success"
            inputProps={ { maxLength: 4 } }
            label="비밀번호"
            sx={ { mt: 2, mb: 2, width: '100%' } }
            type="password"
            value={ password }
            variant="outlined"
            onChange={ handlePasswordChange }
          />
          <Button
            disabled={ !password || !importURL }
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
      </ModalBox>
    </Fade>
  </Modal>;
}