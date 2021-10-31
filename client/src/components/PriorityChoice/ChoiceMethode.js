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
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(0.2),
    width : 300
  },
}));

export default function ChoiceMethode(methode) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    methode: '',
    name: 'methode',
  });
  let thisMethode = '';
  if (methode)
  thisMethode = methode.methode;

  //const [newStatus, setNewStatus] = React.useState('');
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...methode,
      [name]: event.target.value,
    });
    methode.setNewMethode(event.target.value);
    //props.passChildStatus(event.target.value)
  };

  return (
    <div className={classes.divControl}>
        <NativeSelect
          className={classes.selectEmpty}
          value={state.status}
          name="methode"
          onChange={handleChange}
          inputProps={{ 'newMethode': 'methode' }}
        >
          <option value="">Choisir la méthode de paiement</option>
          <option value="à la livraison">à la livraison</option>
          <option value="à la réception">à la réception</option>
        </NativeSelect>
        
    </div>

  )};