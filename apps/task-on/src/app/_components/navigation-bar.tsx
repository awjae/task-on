import { Drawer, IconButton, styled, Typography } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const StyledDrawer = styled(Drawer)(({ theme }) => `
  .MuiDrawer-paper {
    width: 150px;
    background-color: ${theme.palette.taskOn.lightYellow};
    padding: 16px;
    border-radius: 15px;
    margin: 8px;
    overflow: 'hidden';
    height: initial;
  }

  @media (max-width: 600px) {
    .MuiDrawer-paper {
      width: 100%;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 8px;
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      cursor: pointer;
    }
  }

  p {
    font-weight: bold;
  }
`);

const StyledBox = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export default function NavigationBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations('HomePage');
  const router = useRouter();
  const locale = usePathname().split('/')[1] ?? 'ko';

  const toggleDrawer = (open: boolean) => setDrawerOpen(open);

  return <>
    <IconButton
      style={ { position: 'absolute', top: 16, left: 16 } }
      onClick={ () => toggleDrawer(true) }
    >
      <MenuIcon />
    </IconButton>

    <StyledDrawer
      anchor="left"
      ModalProps={ { keepMounted: true } }
      open={ drawerOpen }
      variant="temporary"
      onClose={ () => toggleDrawer(false) }
    >
      <ul>
        <li onClick={ () => router.push('/' + locale) }>
          <StyledBox>
            <FormatListNumberedIcon />
            <Typography component="p">{ t('title') }</Typography>
          </StyledBox>
        </li>
        <li onClick={ () => router.push(('/' + locale) + '/calendar') }>
          <StyledBox>
            <CalendarMonthIcon />
            <Typography component="p">{ t('calendar') }</Typography>
          </StyledBox>
        </li>
      </ul>
    </StyledDrawer>
  </>;
}