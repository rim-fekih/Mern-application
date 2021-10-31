import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { ThemeProvider } from '@material-ui/styles';
import ContactForm from '../Form/ContactForm';
const theme = createTheme({
    palette: {
      primary: {
        //this yellow
        main: '#ffb703',
      },
      secondary: {
        // This is bleu.
        main: '#00509d',
      },
    },
  });
const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
    messagePosition : {
        display:'flex',
         justifyContent:'right'
    }
  }));
  
  export default function MessageBox() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
          <ThemeProvider theme={theme}>
        <IconButton aria-describedby={id} variant="contained" color="secondary" onClick={handleClick}>
            <InsertCommentIcon/>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {/*<Typography className={classes.typography}>Nous contacter : </Typography>*/}
          <ContactForm/>
        </Popover>
        </ThemeProvider>
      </div>
    );
  }