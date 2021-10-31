import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
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
  input : 
  {
    marginLeft: theme.spacing(8),
    width : '80%'
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

  const categoryDetails = data.data;

  let category = []
  if (categoryDetails)
    category = categoryDetails;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [newTitle, setNewTitle] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };
  const OnClickSave = async (category) => {
    if (newTitle != '')
    category.title = newTitle;
    if (newDescription!= '')
    category.description = newDescription;
    if (category)
    {
      const response = await api.put(`/categories/${category._id}`, category);
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
            Modifier une Categorie
            </Typography>
            <Button autoFocus color="inherit" onClick=  {() => {
                OnClickSave(category);
                handleClose();
                }}>
              Enregistrer
            </Button>
          </Toolbar>
        </AppBar>
        
        <form className={classes.form} noValidate action="#" encType="multipart/form-data">
        <TextField
            variant="outlined"
            margin="normal"
            className={classes.input}
            required
            id="title"
            label="Nouveau Titre"
            name="title"
            placeholder = {category.title}
            autoComplete="Titre du nouvelle categorie"
            onChange = { (e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.input}
            id="description"
            label="Nouvelle Description"
            name="description"
            autoComplete="Description du nouvelle categorie"
            placeholder = {category.description}
            onChange = { (e) => setNewDescription(e.target.value)}
          />
          </form>
      </Dialog>
      <Notification
        notify = {notify}
        setNotify = {setNotify}/>
    </div>
  );
}