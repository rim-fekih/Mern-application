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
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ChoiceStatus from '../PriorityChoice/ChoiceStatus';
import ChoiceRole from '../PriorityChoice/ChoiceRole';
import Notification from '../Notifications/Notification';
import api from '../../api/users';
import Icon from '@material-ui/core/Icon';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CheckIcon from '@material-ui/icons/Check';
import ChoiceMethode from '../PriorityChoice/ChoiceMethode';



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
      price : {
          main : '#FF5733'
      }
    },
  });

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
  },
  button: {
    margin: theme.spacing(1),
  },
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

  const offerDetails = data.data;

  console.log(offerDetails)

  let offer = []
  if (offerDetails)
    offer = offerDetails;

  // setChildRole(user.role);
  // setChildStatus(user.status)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [newMethode, setNewMethode] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };
  const OnClickSave = async(offer) => {

    const userID = '61169135142b5213a07362af';
    const pastryID = offer.pastryId;
    const paiementMethode = newMethode;
    const order = {
        paiement_methode : paiementMethode,
        _offer  : offer.ID,
        _pastry  : pastryID,
        _client  : userID,
    }
    console.log (order)
    if (offer)
        if(paiementMethode != "")
        {
            await api.post("/orders", 
        {
            paiement_methode : paiementMethode,
            _offer  : offer.ID,
            _pastry  : pastryID,
            _client  : userID,
            }).then((response) => {
                setNotify({
                isOpen:true,
                message: 'Commande passée avec succès.',
                type : 'success'
            })
        })
        .then(async()=> {
            await api.put(`/offers/${offer.ID}`, { state : "prêt" }).then((response) => {
                setNotify({
                    isOpen:true,
                    message: 'Votre commande doit être récuperer dans un délai de 2 heures.',
                    type : 'info'
                })
                window.location.reload(false);
            })
        })
        .catch((err) => console.log(err))
        
        }
        else
        {
            setNotify({
                isOpen:true,
                message: 'Merci de choisir une méthode de paiement.',
                type : 'error'
            })
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
        <ThemeProvider theme={theme}>
        <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        onClick={handleClickOpen}
        startIcon={<ShoppingBasketIcon color="primary"/>}
      >
          <Typography>Acheter</Typography>
      </Button>
     
      <Dialog classes={classes.dialog} open={open} onClose={handleClose} TransitionComponent={Transition} fullWidth ='true' >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Passer Une commande
            </Typography>
            <Button color="secondary" endIcon={<CheckIcon/>}onClick=  {() => {
                OnClickSave(offer);
                handleClose();
                }}>
              <Typography>Enregistrer</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        
        <form noValidate action="#" >
        <List>
        <ListItem button disabled>
          <Typography>Information de l'offre : </Typography>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Nom de l'offre : " secondary={offer.postTitle} />
            <ListItemText primary="Prix : " secondary={`${offer.offerPrice}DT`} />
          </ListItem>
          <Divider />
          <ListItem button disabled>
          <Typography>Information du pâtisserie : </Typography>
          </ListItem>
          <ListItem button>
          { renderImg(offer.pastryIcon, offer.pastryName) }
          <ListItemText primary={offer.pastryName} secondary={offer.pastryPhone} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="méthode de paiement : "/>
            <ChoiceMethode  setNewMethode={m=>{setNewMethode(m)}}/>
          </ListItem>
        </List>
        </form>
      </Dialog>
      <Notification
        notify = {notify}
        setNotify = {setNotify}/>
         </ThemeProvider>
    </div>
  );
}