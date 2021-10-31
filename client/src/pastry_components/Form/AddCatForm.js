import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Cake";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Notification from "../Notifications/Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    marginLeft: theme.spacing(15),
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "863px",
    height: "340px",
    top: "323px",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    borderRadius: "50px",
    width: "30%",
  },
  cancel: {
    margin: theme.spacing(2, 0, 2),
    borderRadius: "50px",
    width: "30%",
    left: "40%",
  },
}));

export default function SignIn() {
  const classes = useStyles();
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
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Add />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a new categorie
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Name"
            label="Nom"
            name="Nom"
            autoComplete="Nom"
            autoFocus
          />

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              component={Link}
              to="../users"
              onClick={ClickEditBtn}
            >
              Save
            </Button>
            <Button
              type="cancel"
              variant="contained"
              color="secondary"
              className={classes.cancel}
              component={Link}
              to="../users"
            >
              cancel
            </Button>
            <Notification notify={notify} setNotify={setNotify} />
          </div>
        </form>
      </div>
    </Container>
  );
}
