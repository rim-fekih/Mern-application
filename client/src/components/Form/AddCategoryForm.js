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
import AddIcon from '@material-ui/icons/AddCircleOutlineSharp';


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
      size: "650px"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCategoryForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const OnClickSave = async () => {
    
    if (!title) {
        setNotify({
          isOpen:true,
          message: "Le titre est nécessaire.",
          type : 'error'
        });

    }
    else
    {
        await api.post("/categories", 
        {
          title: title,
          description: description,
        })
          .then((response) => {
            console.log(response.data);
            setNotify({
                     isOpen:true,
                     message: 'Ajouter avec succès.',
                     type : 'success'
          })
          handleClose();
          window.location.reload(false);
        })
          .catch((err) => {
            console.log(err);
          })
    }

    }



  return (
    <div>
    <AddIcon onClick={handleClickOpen}/>
      <Dialog classes={classes.dialog} open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Créer une nouvelle catégorie :
            </Typography>
            <Button autoFocus color="inherit" onClick=  {() => {
                OnClickSave();
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
            label="Titre du nouvelle categorie"
            name="title"
            value = {title}
            autoComplete="Titre du nouvelle categorie"
            onChange = { (e) => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.input}
            id="description"
            label="Description du nouvelle categorie"
            name="description"
            autoComplete="Description du nouvelle categorie"
            value = {description}
            onChange = { (e) => setDescription(e.target.value)}
          />
          </form>
      </Dialog>
      <Notification
        notify = {notify}
        setNotify = {setNotify}/>
    </div>
  );
}