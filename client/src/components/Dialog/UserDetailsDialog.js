import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DetailsIcon from '@material-ui/icons/DeveloperBoard';
import { render } from 'react-dom';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  icon : {
    padding: '3px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  dialog: {
      size: "500px"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDetailsDialog(info) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //const {user, setUser} = props;
  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});
  const userDetails = info.info;
  //console.log(info);
  //console.log(userDetails);
  let user = []
  if (userDetails)
    user = userDetails;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const OnClickSave = () => {
    setNotify({
        isOpen:true,
        message: 'Soumis avec succès.',
        type : 'success'
      })
  };
  const renderImg = (icon,username) => {
    if (icon)
    {
      const _icon = require(`../../icons/${icon}`).default;
      console.log(_icon);
      return <Avatar src={_icon} />
    }
    else
    {
      return <Avatar alt={username} src='.'  className={classes.avatar}/>
    }
  };


  return (
    <div>
    <DetailsIcon onClick={ () => handleClickOpen()} />
      <Dialog classes={classes.dialog} open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Utilisateur en détails
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
          { renderImg(user.icon, user.username) }
          <ListItemText primary={user.username} secondary={user.phone} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={"E-mail : "} secondary={user.email} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={user.pastryType} secondary={user.pastryDescription} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Date d'inscription: " secondary={user.JoinDate} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Status : " secondary={user.status}/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Rôle : " secondary={user.role}/>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}