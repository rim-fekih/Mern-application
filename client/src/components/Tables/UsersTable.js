import React, { useEffect, useState ,Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Notification from '../Notifications/Notification';
import ConfirmDialog from '../Dialog/ConfirmDialog';
import api from '../../api/users';
import EditUserForm from '../Form/EditUserForm';
import UserDetailsDialog from '../Dialog/UserDetailsDialog'
import DetailsIcon from '@material-ui/icons/DeveloperBoard';
import BlockIcon from '@material-ui/icons/BlockRounded';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import 
    {
        Table,
        TableBody,
        TableCell, 
        TableContainer,
        TableHead,
        TablePagination,
        TableRow,
        TableSortLabel,
        Toolbar,
        Typography,
        Paper,
        Checkbox,
        IconButton,
        Tooltip,
        FormControlLabel,
        Avatar,
        Grid,
        Switch
    } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/AddCircleOutlineSharp';
import faker from 'faker';
import Popup from '../Dialog/Popup';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'username', numeric: false, disablePadding: true, label: 'Informations utilisateur' },
  { id: 'Job_Info', numeric: false, disablePadding: false, label: "Description de pâtisserie" },
  { id: 'JoinDate', numeric: false, disablePadding: false, label: "Date d'inscription" },
  { id: 'Status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Rôle' },
  { id: 'Action', numeric: false, disablePadding: false, label: 'Action' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow>
        <TableCell className={classes.tableHeaderCell} padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all users' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell className={classes.tableHeaderCell}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  iconHide: 
  {
    opacity:'0%',
  },
  iconShow: 
  {
    opacity:'100%',
  }
}));

const EnhancedTableToolbar = (props) => {
const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});
const [confirmDialog, setConfirmDialog] = React.useState({isOpen:false, title:'', subTitle:''});
const classes = useToolbarStyles();
  
  const { numSelected, usersToDelete  } = props;
  console.log(usersToDelete);
  const handleDelete = async() => {
    console.log(usersToDelete.length);
    if (usersToDelete.length>0)
      await usersToDelete.map((n) => 
      {
        console.log(n);
        api.delete(`/api/User/${n}`).then((resUser) => {
          console.log(resUser.data);
          api.delete(`/api/User/orders/${n}`).then((resOrder) => {
          console.log(resOrder.data);
          api.delete(`/api/User/offers/${n}`).then((resOffer) => {
          console.log(resOffer.data);
          api.delete(`/api/User/products/${n}`).then((resProduct) => {
          console.log(resProduct.data);
          api.delete(`/api/User/notifications/${n}`).then((resNotification) => {
            console.log(resNotification.data)})
          })
        })
      })
    })
  })
  }

  const ClickDeleteBtn = id => {
    handleDelete();
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
    setNotify({
      isOpen:true,
      message: 'Deleted Successfully.',
      type : 'error'
    })
    window.location.reload(false);
}
 
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Utilisateurs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Add user">
        <IconButton aria-label="add"
          className={classes.iconHide}>
          <AddIcon />
        </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Ajouter un utilisateur">
          <IconButton aria-label="ajouter" component = {Link}
            to = "../admin/Form/AddUserForm"
            className={classes.iconShow}>
            <AddIcon />
          </IconButton>
          </Tooltip>
      )}
          
        {numSelected > 0 ? (
        <Tooltip title="Supprimer">
          <IconButton aria-label="Supprimer" onClick={() =>
            {
              
              setConfirmDialog({
                isOpen : true,
                title : 'Êtes-vous sûr de vouloir supprimer ces informations ?',
                subTitle :"vous ne pouvez pas annuler cette opération.",
                onConfirm: () => {ClickDeleteBtn(0)}
                })
                //ClickDeleteBtn
            }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filtrer la list">
          <IconButton aria-label="Filtrer la list">
            <FilterListIcon />
          </IconButton>
          </Tooltip>
      )}
      <Notification
      notify = {notify}
      setNotify = {setNotify}/>
      <ConfirmDialog
      confirmDialog = {confirmDialog}
      setConfirmDialog = {setConfirmDialog} />
      </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '30px 325px',
    width: '75%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  table: {
    minWidth: 700,
  },
  tableContainer: {
      borderRadius: 15
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      fontSize : '20px',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
      margin:'8px 3px',
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
  statusCell : {
    width : '10%'
  },
  dateCell : {
    width : '10%'
  },
  JobInfoCell : {
    width : '20%'
  },
  UserCell : {
    width : '25%'
  },
  icon : {
    padding: '3px',
  }
}));

export default function CheckBoxTable(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('jobTitle');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:''});
  const [openPopup, setOpenPopup] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState();
  const history = useHistory();
  //console.log(props.users);

  
/*function createData(username,email , phone,  pastryType, pastryDescription, JoinDate, status, role) {
  return { username, email, phone, pastryType, pastryDescription, JoinDate, status, role };
}*/
//let ROLES = ['user', 'pastry', 'super admin'];
//let STATUSES = ['active', 'blocked'];
/*
if (props.isLoading)
{
  console.log(props.isLoading);
  return <h1>Loading ...</h1>
}
else{
  console.log(props.isLoading);
  console.log(props.users);
}
let tab_users = props.users;
*/
/*let rows = [
  createData(kéfta[0].username,kéfta[0].email,kéfta[0].phone, kéfta[0].pastryType, kéfta[0].pastryDescription, faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)],kéfta[0].role),
  createData(kéfta[4].username,kéfta[4].email,kéfta[4].phone, kéfta[4].pastryType, kéfta[0].pastryDescription, faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)],kéfta[4].role),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
  // createData(faker.name.findName(),faker.internet.email(),faker.phone.phoneNumber(), faker.name.jobTitle(), faker.company.companyName(), faker.date.past().toLocaleDateString('en-US'), STATUSES[Math.floor(Math.random() * STATUSES.length)]),
];
*/

//get users
const getUsers = async () => {
  const response = await api.get("/api/Users");
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
const rows = users;
console.log(rows);
  const ClickEditBtn = () =>{
      setNotify({
        isOpen:true,
        message: 'Submitted Successfully.',
        type : 'success'
      })
  };
  const ClickBlockBtn = (user) =>{
    //blockUser(user);
  }
  const showDetails = async (id) => 
  {
    const response = await api.get(`/api/Users/${id}`);
    let user = response.data;
    if (user) setUser(user); 
  }

  const showEdit = async (id) => 
  {
    const response = await api.get(`/api/Users/${id}`);
    let user = response.data;
    if (user) setUser(user); 
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.username);
      setSelected(newSelecteds);
      //console.log(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  
  //console.log(selected);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
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


  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} usersToDelete={selected} />
        <TableContainer className={classes.tableContainer}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.username)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row._id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" className={classes.UserCell}>
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
                      <TableCell align="Left" className={classes.JobInfoCell}>
                      <Typography color="primary" variant="subtitle2">{row.pastryType}</Typography>
                      <Typography color="textSecondary" variant="body2">{row.pastryDescription}</Typography>
                      </TableCell>
                      <TableCell align="Left"className={classes.dateCell}>{row.JoinDate}</TableCell>
                      <TableCell align="Left" className={classes.statusCell}>
                      <Typography 
                        className={classes.status}
                        style={{
                        backgroundColor: 
                        ((row.status === 'active' && 'green') ||
                        (row.status === 'bloqué' && 'red'))
                        }}>
                        {row.status}
                        </Typography>
                        </TableCell>
                        <TableCell align="Left" className={classes.statusCell}>
                      <Typography 
                        className={classes.status}
                        style={{
                        backgroundColor: 
                        ((row.role === 'utilisateur' && 'violet') ||
                        (row.role === 'pâtisserie' && 'blue') ||
                        (row.role === 'superadmin' && 'orange'))
                        }}>
                        {row.role}
                        </Typography>
                        </TableCell>
                        <TableCell align="Left">
                          <div>
                            <Tooltip title="Détails" className={classes.icon}>
                                <IconButton aria-label="Détails" onClick={ () => showDetails(row._id) }>
                                <UserDetailsDialog 
                                  info = {user} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Modifier" className={classes.icon}>
                          <IconButton aria-label="Modifier" onClick={ () => showEdit(row._id) }>
                                <EditUserForm
                                 data = {user}/>
                          </IconButton>
                            </Tooltip>
                            <Tooltip title="Bloquer" className={classes.icon}>
                                <IconButton aria-label="Bloquer" onClick={ () => blockUser(row._id) }>
                                <BlockIcon />
                                </IconButton>
                            </Tooltip>
                            <Notification
                              notify = {notify}
                              setNotify = {setNotify}/>
                              <Popup
                                openPopup = {openPopup}
                                setOpenPopup = {setOpenPopup}
                              >
                                {/**<EditForm/>**/}
                              </Popup>
                          </div>
                        </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Affichage dense"
      />
    </div>
  );
}
