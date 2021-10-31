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
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  inputNom : 
  {
    marginLeft: theme.spacing(8),
    width : '30%'
  },
  backGround : 
  {
    backgroundColor : '#EFEEF3',
  },
  inputEmail : 
  {
    marginLeft: theme.spacing(8),
    width : '70%',
  },
  inputSubject : 
  {
    marginLeft: theme.spacing(8),
    width : '30%'
  },
  inputMessage : 
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

export default function EditUserForm() {
function checkEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});

 
  const OnClickSend = async () => {
    
    //data controle
    if (!username) {
        setNotify({
          isOpen:true,
          message: "Le Nom est nécessaire.",
          type : 'error'
        });
        return;
      }
    if (!email){
        setNotify({
          isOpen:true,
          message: 'e-mail est requis.',
          type : 'error'
        });
        return;
      }
    if (!checkEmail(email))
      {
        setNotify({
          isOpen:true,
          message: 'Adresse e-mail non valide.',
          type : 'error'
        });
        return;
      }
  
      await api.post("/notifications", 
      {
        nonUserName: username,
        nonUserEmail: email,
        subject: subject,
        message : message,
      })
        .then((response) => {
          console.log(response.data);
          setNotify({
            isOpen:true,
            message: 'Envoyer avec succès.',
            type : 'success'
          });
          //history.push('/users')
        })
        .catch((err) => {
          console.log(err);
        })
      


  };

  return (
    <div className = {classes.backGround}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
            Envoyer un Message
            </Typography>
            <IconButton autoFocus color="inherit" onClick=  {() => {
                OnClickSend();
                }}>
              <SendIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className={classes.form} noValidate action="#" encType="multipart/form-data">
        <TextField
            variant="outlined"
            margin="normal"
            className={classes.inputNom}
            id="Nom"
            label="Votre Nom : "
            name="Nom"
            autoComplete="nom"
            value = {username}
            onChange = { (e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.inputEmail}
            id="Email"
            value = {email}
            label="Votre E-mail : "
            name="E-mail"
            onChange = { (e) => setEmail(e.target.value)}
            autoComplete="adresse email"
          />
           <TextField
            variant="outlined"
            margin="normal"
            className={classes.inputSubject}
            id="Subject"
            value = {subject}
            onChange = { (e) => setSubject(e.target.value)}
            label="Sujet : "
            name="Subject"
            autoComplete="Subject"
          />
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.inputMessage}
            id="Message"
            name="Message"
            value={message}
            placeholder = "Votre message ... "
            multiline
            rows={0}
            onChange = { (e) => setMessage(e.target.value)}
            rowsMax={5000}
          />
          </form>
      <Notification
        notify = {notify}
        setNotify = {setNotify}/>
    </div>
  );
}