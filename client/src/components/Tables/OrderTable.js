import faker from 'faker';
import React, { useEffect, useState ,Component } from 'react';
import api from '../../api/users';
import { makeStyles } from '@material-ui/core/styles';
import DetailsIcon from '@material-ui/icons/DeveloperBoard';
import  SearchIcon from '@material-ui/icons/SearchOutlined';
import OrderDetailsDialog from '../Dialog/OrderDetails'
//import S_Bar from '../SearchBar/S_Bar';
import SearchBar from "material-ui-search-bar";
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
    TableFooter,
    TextField
 } from '@material-ui/core';
import { fontSize } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({

  root: {
    margin: '30px 325px',
    width: '75%',
    },
    table: {
      minWidth: 725,
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
    orderID : {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        width : '6px'
    },
    date : {
      width : '6px',
      right : '-20%'
    },
    search : {
      marginTop : '10px',
      marginBottom: '10px',
      marginLeft : '10px',
      fontSize : '20px',
      paddingLeft : '5px',
      width : '90%'
    },
    searchBar : {
      width : '90%',
    },
    searchIcon : {
      marginTop : '30px',
      marginBottom: '10px',
      marginLeft : '30px',
      fontSize : '30px',
      color : 'grey'
    }

  }));

let ORDERS = [], STATUSES = ['serverd', 'pending', 'canceled'];
/*for(let i=0;i<14;i++) {
    ORDERS[i] = {
        ID: faker.random.uuid(),
        Pastry: faker.company.companyName,
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        ToClient: faker.name.findName(),
        Date: faker.date.past().toLocaleDateString('en-US'),
        Due_Date: faker.date.future().toLocaleDateString('en-US'),
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
}*/

function OrderTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState();
  const [searchTerm, setSearchTerm] = useState("");



  const getOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
  };
  let tab_orders = [];
  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await getOrders()
      if (allOrders) 
          setOrders(allOrders);
    };
  
    getAllOrders();
  }, [])
  ORDERS = orders;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const showDetails = async (id) => 
  {
    const response = await api.get(`/orders/${id}`);
    let order = response.data;
    if (order) setOrder(order); 
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
          List des Commandes:
        </Typography>
      <TableContainer component={Paper} className={classes.tableContainer} >
     {/* <TextField type="text" placeholder="Search ..." className={classes.search} 
      onChange={(event) => setSearchTerm(event.target.value)}
      //onRequestSearch={() => doSomethingWith(this.state.value)}
      >
        <SearchIcon/>
  </TextField>*/}
      <div>
            <SearchIcon className= {classes.searchIcon} />
            <TextField placeholder="vous pouvez faire vos recherche selon les critères suivants: nom du client, nom du pâtisserie et status."label="Recherche ..."  onChange={(event) => setSearchTerm(event.target.value)}  className={classes.search}/>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>ID du commande</TableCell>
            <TableCell className={classes.tableHeaderCell}>De : Pâtisserie</TableCell>
            <TableCell className={classes.tableHeaderCell}>À : Client</TableCell>
            <TableCell className={classes.tableHeaderCell}>Date de création</TableCell>
            <TableCell className={classes.tableHeaderCell}>Date de réception prévue</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            {/*<TableCell align="Center" className={classes.tableHeaderCell}>Actions</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {ORDERS.filter((row)=> {
            console.log(searchTerm);
            console.log(row.ID.toLowerCase().includes(searchTerm.toLowerCase()))
            if (searchTerm == "") {return ORDERS}
              else if (row.ID.toLowerCase().includes(searchTerm.toLowerCase()) || row.pastryName.toLowerCase().includes(searchTerm.toLowerCase()) 
                       || row.ToClient.toLowerCase().includes(searchTerm.toLowerCase()) || ((row.Date) && row.Date.toLowerCase().includes(searchTerm.toLowerCase()))
                       || ((row.dueDate) && row.dueDate.toLowerCase().includes(searchTerm.toLowerCase())) || row.status.toLowerCase().includes(searchTerm.toLowerCase()))
                       { console.log('am here')
                         return row; }
          }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.ID}>
                <TableCell className={classes.orderID}>
                {row.ID}
                </TableCell>
                <TableCell>
                  <Grid container>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.pastryName}</Typography>
                          <Typography color="primary" variant="subtitle2">{row.pastryEmail}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.pastryPhone}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.ToClient}</Typography>
                  <Typography color="textSecondary" variant="body2">{row.clientPhone}</Typography>
                </TableCell>
              <TableCell className = {classes.date}>{row.Date}</TableCell>
              <TableCell >{row.Due_Date}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'servie' && 'green') ||
                        (row.status === 'en cours' && 'blue') ||
                        (row.status === 'annulée' && 'red'))
                    }}
                  >{row.status}</Typography>
                </TableCell>
                <TableCell align="Left">
                  {/*<Tooltip title="Details" className={classes.icon}>
                      <IconButton aria-label="Details"onClick={ () => showDetails(row.ID) }>
                                <OrderDetailsDialog 
                                  info = {order} />
                      </IconButton>
                  </Tooltip>*/}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter >
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={ORDERS.length}
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

export default OrderTable;