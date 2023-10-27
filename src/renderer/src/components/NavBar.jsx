import { AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/system';
import './NavBar.css';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#242424',
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '60px',
});

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '50%',
  margin: '0 auto',
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
  height: '30px',
  lineHeight: '30px',
};

const NavBar = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={toolbarStyle}>
        <Button color="inherit" sx={buttonStyle}>
          Home
        </Button>
        <Button color="inherit" sx={buttonStyle}>
          Tools
        </Button>
        <Button color="inherit" sx={buttonStyle}>
          Settings
        </Button>
        <Button color="inherit" sx={buttonStyle}>
          About
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
