import faker from 'faker';
import React, { useEffect, useState ,Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddCircleOutlineSharp';
import EditIcon from '@material-ui/icons/Edit';
import DetailsIcon from '@material-ui/icons/DeveloperBoard';
import Notification from '../Notifications/Notification';
import EditUserForm from '../Form/EditUserForm';
import UserDetailsDialog from '../Dialog/UserDetailsDialog'
import BlockIcon from '@material-ui/icons/BlockRounded';
import api from '../../api/users';
import { 
    Table,
    TableBody,
    Button,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    IconButton,
    Tooltip,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  root: {
    margin: '30px 325px',
    width: '75%',
    },
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    JobInfoCell : {
      width : '20%'
    },
    UserCell : {
      width : '37%'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
      left : '70%',
    },
    title: {
      margin: theme.spacing(1),
      fontWeight: 'bold',
      fontSize : '30px',
      right : '10%'
    },
    icon : {
      padding: '3px',
    }
  }));

let USERS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
/*for(let i=0;i<14;i++) {
    USERS[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        jobTitle: faker.name.jobTitle(),
        company: faker.company.companyName(),
        joinDate: faker.date.past().toLocaleDateString('en-US'),
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
}*/


function Tables(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});
  const [pastries, setPastries] = useState([]);
  const [user, setUser] = React.useState();


const getPastries = async () => {
    const response = await api.get("/api/Pasteries");
    return response.data;
  };
useEffect(() => {
    const getAllPastries = async () => {
      const allPastries = await getPastries()
      if (allPastries) setPastries(allPastries);
    };
  
    getAllPastries();
  }, [])
  
USERS = pastries;
/*
if (props.isLoading)
{
  console.log(props.isLoading);
  return <h1>Loading ...</h1>
}
else{
  console.log(props.isLoading);
  console.log(props.pastries);
}
USERS = props.pastries;
*/
const ClickEditBtn = () =>{
  setNotify({
    isOpen:true,
    message: 'Submitted Successfully.',
    type : 'success'
  })
};
const ClickBlockBtn = () =>{
    setNotify({
      isOpen:true,
      message: 'Blocked Successfully.',
      type : 'info'
    })
  }

const showDetails = async (id) => 
{
    const response = await api.get(`/api/Users/${id}`);
    let user = response.data;
    if (user) setUser(user); 
}

const blockUser = async(id) => {
    const response = await api.get(`/api/Users/${id}`);
    console.log(response.data);
    let user = response.data;
    console.log(user._id);
  
    if (user.status == "bloqué")
    {
      setNotify({
        isOpen:true,
        message: 'Utilisateur déjà bloqué.',
        type : 'info'
      })
    }
    
    else{
      user.status = "bloqué";
      const response = await api.put(`/api/Users/${user._id}`, user);
      console.log(response.data);
      setNotify({
        isOpen:true,
        message: 'Bloqué avec succès.',
        type : 'success'
      });
      //history.push('/users');
      window.location.reload(false);
    };
};

  const showEdit = async (id) => 
  {
    const response = await api.get(`/api/Users/${id}`);
    let user = response.data;
    if (user) setUser(user); 
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
          Les comptes pâtisseries :
        </Typography>
          <Button
          component = {Link}
          to = "../admin/Form/AddUserForm"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AddIcon />}
          > 
          Ajouter une pâtisserie
          </Button>
      <TableContainer component={Paper} className={classes.tableContainer} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Information du pâtisserie</TableCell>
            <TableCell className={classes.tableHeaderCell}>Détails</TableCell>
            <TableCell className={classes.tableHeaderCell}>Date d'inscription</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell align="Center" className={classes.tableHeaderCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.name}>
              <TableCell className={classes.UserCell}>
                  <Grid container>
                      <Grid item lg={2}>
                        { renderImg(row.icon, row.username) }
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.username}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.phone}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell className={classes.JobInfoCell}>
              <Typography color="primary" variant="subtitle2">{row.pastryType}</Typography>
              <Typography color="textSecondary" variant="body2">{row.pastryDescription}</Typography>
                </TableCell>
              <TableCell>{row.JoinDate}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'active' && 'green') ||
                        (row.status === 'bloqué' && 'red'))
                    }}
                  >{row.status}</Typography>
                </TableCell>
                <TableCell align="Left">
                  <div>
                  <Tooltip title="Détails" className={classes.icon}>
                      <IconButton aria-label="Détails" onClick ={ () => showDetails(row._id)}>
                        <UserDetailsDialog info={user}/>
                          </IconButton>
                  </Tooltip>
                  <Tooltip title="Modifier" className={classes.icon}>
                      <IconButton aria-label="Modifier" onClick={ () => showEdit(row._id) }>
                        <EditUserForm  data = {user}/>
                          </IconButton>
                  </Tooltip>
                  <Tooltip title="Bloquer" className={classes.icon} onClick = {() => blockUser(row._id)}>
                      <IconButton aria-label="Bloquer">
                        <BlockIcon />
                          </IconButton>
                  </Tooltip>
                  <Notification
                              notify = {notify}
                              setNotify = {setNotify}/>
                  </div> 
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
    </Paper>
    </div>

 
  );
}

export default Tables;