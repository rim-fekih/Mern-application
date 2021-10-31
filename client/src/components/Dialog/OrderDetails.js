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

export default function OrderDetailsDialog(info) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});
  const orderDetails = info.info;

  let order = []
  if (orderDetails)
    order = orderDetails;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              Order in details
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
            <ListItem button>
          <ListItemText primary={order.ID}/>
          </ListItem>
          <ListItem button>
          <ListItemText primary={order.pastryName} secondary={order.pastryPhone} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={"Pastry Email : "} secondary={order.pastryEmail} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={order.ToClient} secondary={order.clientPhone} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Date of Creation : " secondary={order.Date} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Due Date : " secondary={order.dueDate} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Status : " secondary={order.status}/>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}