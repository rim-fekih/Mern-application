import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  divControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(0.2),
    width : 220
  },
}));

export default function ChoiceStatus(status) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    status: '',
    name: 'status',
  });
  let thisStatus = '';
  if (status)
    thisStatus = status.status;

  //const [newStatus, setNewStatus] = React.useState('');
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...status,
      [name]: event.target.value,
    });
    status.setNewStatus(event.target.value);
    //props.passChildStatus(event.target.value)
  };

  return (
    <div className={classes.divControl}>
        <NativeSelect
          className={classes.selectEmpty}
          value={state.status}
          name="status"
          onChange={handleChange}
          inputProps={{ 'newStatus': 'status' }}
        >
          <option value="" disabled>
            {thisStatus}
          </option>
          <option value="active">active</option>
          <option value="bloqué">bloqué</option>
        </NativeSelect>
        
    </div>

  )};