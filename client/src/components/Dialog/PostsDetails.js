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
      size: "600px"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostDetailsDialog(info) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});
  const postDetails = info.info;

  let post = []
  if (postDetails)
    post = postDetails;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              Publication en détails 
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
            <ListItem button>
          <ListItemText primary={post.ID}/>
          </ListItem>
          <ListItem button>
          <ListItemText primary={post.postTitle} secondary={post.postDescription} />
          </ListItem>
          <Divider />
          <ListItem button>
            { renderImg(post.pastryIcon, post.pastryName) }
            <ListItemText primary={"Pâtisserie : "} secondary={post.pastryName} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={"Email du pâtisserie : "} secondary={post.pastryEmail} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={"Téléphone du pâtisserie : "} secondary={post.pastryPhone} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={"Prix de l'offre : "} secondary={post.price} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Date de publication : " secondary={post.Date} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Status de publication : " secondary={post.status} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Priorité du publication : " secondary={post.priority}/>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}