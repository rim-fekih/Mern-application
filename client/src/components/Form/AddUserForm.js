import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Cake';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Notification from '../Notifications/Notification';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { IconButton } from '@material-ui/core';
import FormData from 'form-data';
import api from '../../api/users';
import SupportDialog from '../Dialog/SupportDialog';
import Axios from 'axios';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    marginLeft : theme.spacing(15),
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '863px',
    height: '340px',
    top: '323px',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    borderRadius: '50px',
    width: '30%',
  },
  cancel: {
    margin: theme.spacing(2, 0, 2),
    borderRadius: '50px',
    width: '30%',
    left : '40%',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});
  const [supportDialog, setSupportDialog] = React.useState({isOpen:false, title:'', subTitle:''});

  
  //Model Fields
  const [icon, setIcon] = React.useState();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [pastryType, setPastrytype] = React.useState("");
  const [pastryDescription, setPastrydescription] = React.useState("");
  const status = "active";
  const role = "pâtisserie";
  let prefixDay = ""
  let prefixMonth = ""
  if (new Date().getUTCDate() < 10)
    prefixDay = "0"
  else
    prefixDay = ""
  if (new Date().getMonth() < 10)
    prefixMonth = "0"
  else
    prefixMonth = ""
  const JoinDate = prefixDay + new Date().getUTCDate() + "/" + prefixMonth + new Date().getUTCMonth() + "/" + new Date().getFullYear();


  const history = useHistory();

  const getUsers = async () => {
    const response = await api.get("/api/AllUsers");
    return response.data;
  };
  let tab_users = [];
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await getUsers()
      if (allUsers) setUsers(allUsers);
    };
  
    getAllUsers();
  }, [])

  function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

  function checkPhone(phone)
  {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }
  const ClickAddBtn = async() =>{
    
    const formdata   = new FormData();
    if (icon) 
    {
      formdata.append('icon', icon);
    }

    
    let _u = users.find(u => u.username === username);
    if ((_u) && _u.visible === "invisible")
      {
      setSupportDialog({
        isOpen : true,
        title : "Vous êtes déja inscrit, mais votre compte à été désactivé. Pour activer votre compte merci d'envoyer une demande sur l'email support suivant : ",
        subTitle :"Support@albero.tn.",
        });
        return;
      }
    else if ( (users.find(u => u.username === username)) || (users.find(u => u.email === email)) || (users.find(u => u.phone === phone)))
      {
        setNotify({
          isOpen:true,
          message: "Un compte est déja crée avec ces coordonnées.",
          type : 'info'
        });
        return;
      }
   

    if (!username) {
      setNotify({
        isOpen:true,
        message: "Nom d'utilisateur est nécessaire.",
        type : 'error'
      });
      return;
    }
    
    if (!phone){
      setNotify({
        isOpen:true,
        message: 'téléphone est nécessaire.',
        type : 'error'
      });
      return;
    }
    if (!checkPhone(phone))
    {
      setNotify({
        isOpen:true,
        message: 'numéro de téléphone non valide.',
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

    if (!password){
      setNotify({
        isOpen:true,
        message: 'Mot de passe requis.',
        type : 'error'
      });
      return;
    }
   

    //console.log(user);
    console.log(icon);
    let id = null;
    //console.log(formdata);
   
    //Axios.post("http://httpbin.org/anything",formdata).then(res => console.log(res));
    //Axios.post("http://localhost:5001/api/auth/signup",formdata).then(res => console.log(res));
    
    await api.post("/api/auth/signup", 
    {
      username: username,
      email: email,
      password: password,
      role : role,
      phone: phone,
      pastryType: pastryType,
      pastryDescription: pastryDescription,
      JoinDate : JoinDate,
      status : status
    })
      .then((response) => {
        console.log(response.data);
        id = response.data._id;
        console.log(id);
        //history.push('/users')
      })
      .catch((err) => {
        console.log(err);
      })
      if (icon)
      {
        await api.put(`/api/auth/addIcon/${id}`,formdata, { headers: formdata.getHeaders})
        .then((response) =>{
          console.log(response.data);
          history.push('/admin/users')
        }
          )
        .catch((err) => console.log(err));
      }
      else
      {
        history.push('/admin/users')
      }
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Add />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ajouter une pâtisserie
        </Typography>
        <form className={classes.form} noValidate action="#" encType="multipart/form-data">
        <IconButton aria-label="Téléchargez votre logo"
          color="primary"
          variant="contained"
          component="label"
        >
        <input
          accept="image/*"
          type="file"
          name = "icon"
          hidden
          src = {icon}
          onChange = {(e) => setIcon(e.target.files[0])}
          id = "icon"
        />
        <AddPhotoAlternateIcon/>
          Télécharger le logo de la pâtisserie
        </IconButton>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom de la pâtisserie"
            name="username"
            value = {username}
            autoComplete="Nom de la pâtisserie"
            onChange = { (e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="pastryType"
            label="Type de pâtisserie"
            name="pastryType"
            autoComplete="Type de pâtisserie"
            value = {pastryType}
            onChange = { (e) => setPastrytype(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="pastryDescription"
            label="Description de pâtisserie"
            name="pastryDescription"
            autoComplete="Description de pâtisserie"
            value = {pastryDescription}
            onChange = { (e) => setPastrydescription(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Numéro de téléphone"
            name="phone"
            autoComplete="Numéro de téléphone"
            value = {phone}
            onChange = { (e) => setPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="Adresse e-mail"
            value = {email}
            onChange = { (e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value = {password}
            onChange = { (e) => setPassword(e.target.value)}
          />
          <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {ClickAddBtn}
            //component = {Link}
            //to = "../users">
            >
            Sauvegarder
          </Button>
          <Button
            type="cancel"
            variant="contained"
            color="secondary"
            className={classes.cancel}
            component = {Link}
            to = "../users"
          >
            Annuler
          </Button>
          <Notification
            notify = {notify}
            setNotify = {setNotify}/>
            <SupportDialog
            supportDialog = {supportDialog}
            setSupportDialog = {setSupportDialog} />
          </div>
        </form>
      </div>
    </Container>
  );
}