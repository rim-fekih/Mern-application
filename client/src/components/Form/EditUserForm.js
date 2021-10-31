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
import EditIcon from '@material-ui/icons/Edit';
import ChoiceStatus from '../PriorityChoice/ChoiceStatus';
import ChoiceRole from '../PriorityChoice/ChoiceRole';
import Notification from '../Notifications/Notification';
import api from '../../api/users';


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

export default function EditUserForm(data) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //const [role, getRole] = React.useState('');
  //const [status, getStatus] = React.useState('');
  //const [childRole, setChildRole] = React.useState('');
  //const [childStatus, setChildStatus] = React.useState('');

  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});

  const userDetails = data.data;

  let user = []
  if (userDetails)
    user = userDetails;

  // setChildRole(user.role);
  // setChildStatus(user.status)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [newStatus, setNewStatus] = React.useState('');
  const [newRole, setNewRole] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };
  const OnClickSave = async (user) => {
    console.log(newStatus);
    console.log(newRole);
    if (newStatus != '')
     user.status = newStatus;
    if (newRole!= '')
      user.role = newRole;
    if (user)
    {
      const response = await api.put(`/api/Users/${user._id}`, user);
      console.log(response.data);
      setNotify({
        isOpen:true,
        message: 'Soumis avec succès.',
        type : 'success'
      });
    //history.push('/users');
    window.location.reload(false);
    }
    

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
    <EditIcon onClick={handleClickOpen}/>
      <Dialog classes={classes.dialog} open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Modifier l'utilisateur
            </Typography>
            <Button autoFocus color="inherit" onClick=  {() => {
                OnClickSave(user);
                handleClose();
                }}>
              Enregistrer
            </Button>
          </Toolbar>
        </AppBar>
        
        <form noValidate action="#" >
        <List>
          <ListItem button>
          { renderImg(user.icon, user.username) }
          <ListItemText primary={user.username} secondary={user.phone} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="E-mail : " secondary={user.email} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Status : "/>
            <ChoiceStatus status={user.status} setNewStatus={s=>{setNewStatus(s)}}/>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Rôle : "/>
            <ChoiceRole role={user.role} setNewRole={r=>{setNewRole(r)}}/>
          </ListItem>
        </List>
        </form>
      </Dialog>
      <Notification
        notify = {notify}
        setNotify = {setNotify}/>
    </div>
  );
}