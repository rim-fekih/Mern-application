import faker from "faker";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/AddCircleOutlineSharp";
import EditIcon from "@material-ui/icons/Edit";
import DetailsIcon from "@material-ui/icons/DeveloperBoard";
import Notification from "../Notifications/Notification";
import BlockIcon from "@material-ui/icons/BlockRounded";
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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "30px 325px",
    width: "75%",
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    left: "70%",
  },
  title: {
    margin: theme.spacing(1),
    fontWeight: "bold",
    fontSize: "30px",
    right: "10%",
  },
  icon: {
    padding: "3px",
  },
}));

let USERS = [],
  STATUSES = ["Active", "Pending", "Blocked"];
for (let i = 0; i < 14; i++) {
  USERS[i] = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName(),
    joinDate: faker.date.past().toLocaleDateString("en-US"),
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
  };
}

function Tables() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const ClickEditBtn = () => {
    setNotify({
      isOpen: true,
      message: "Submitted Successfully.",
      type: "success",
    });
  };
  const ClickBlockBtn = () => {
    setNotify({
      isOpen: true,
      message: "Blocked Successfully.",
      type: "info",
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Classer vos produits par catégorie :
        </Typography>
        <Button
          component={Link}
          to="../Form/AddCatForm"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Ajouter une nouvelle categorie
        </Button>
      </Paper>
    </div>
  );
}

export default Tables;
