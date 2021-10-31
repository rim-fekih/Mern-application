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

export default function ChoiceRole(role) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    role: '',
    name: 'role',
  });
let thisRole = '';
if (role)
  thisRole = role.role
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...role,
      [name]: event.target.value,
    });
    role.setNewRole(event.target.value);
  };

  return (
    <div className={classes.divControl}>
        <NativeSelect
          className={classes.selectEmpty}
          value={state.role}
          name="role"
          onChange={handleChange}
          inputProps={{ 'newRole': 'role' }}
        >
          <option value="" disabled>
            {thisRole}
          </option>
          <option value="utilisateur">utilisateur</option>
          <option value="pâtisserie">pâtisserie</option>
        </NativeSelect>
        
    </div>

  )};