import { styled } from '@mui/material';

export const WrapperDiv = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 16px;

  &>div {
    display: flex;
    width: 100%;
    gap: 12px;
  }

  input {
    border: none;
    border-bottom: 2px solid ${theme.palette.divider};
    border-radius: 0;
    font-size: 14px;
    background: transparent;
    flex-grow: 1;

    &:focus {
      outline: none;
      border-bottom-color: ${theme.palette.taskOn.lightGreen};
    }
  }

  button {
    height: 30px;
    background-color: ${theme.palette.taskOn.lightGreen};
    text-align: center;
    & > span {
      margin-right: 0;
      margin-left: 0;
    }
    &:hover {
      background: ${theme.palette.taskOn.oliveGreen};
    }
  }
`);