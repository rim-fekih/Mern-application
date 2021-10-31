import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../api/users';
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function Priority(priority) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    status: '',
    name: 'status',
  });

  let thisPriority = '';
  let thisID = '';
  if (priority)
  {
    thisPriority = priority.priority;
    thisID = priority.postID;
  }

  const modPriority = async(id,value) => {
      const response =await api.get(`/offers/${id}`);
      console.log(id);
      console.log(value);
      let post = response.data;

      if (post)
      {
        post.priority = value;
        const response = await api.put(`/offers/${post.ID}`, post);
        //console.log(response.data);
        /*setNotify({
          isOpen:true,
          message: 'postponed Successfully.',
          type : 'success'
        });*/
        window.location.reload(false);
      };
    };
  const handleChange = (event) => {
    console.log("event : " + event.target.value);
    modPriority(thisID, event.target.value);
    };



  //console.log(priority)
  return (
    /*
    <Autocomplete
      id="combo-box-demo"
      options={priorities}
      getOptionLabel={(option) => option.title}
      style={{ width: 120 }}
      //onChange={() => handleChange()}
      renderInput={(params) => <TextField {...params}  label={thisPriority}  variant="outlined" />}
    />*/
    <NativeSelect
          className={classes.selectEmpty}
          name="priority"
          value={thisPriority}
          onChange={handleChange}
          inputProps={{ 'newStatus': 'status' }}
        >
          <option value="" disabled>
            {thisPriority}
          </option>
          <option value="haute">haute</option>
          <option value="moyenne">moyenne</option>
          <option value="basse">basse</option>
        </NativeSelect>
        
  );
}
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(0.2),
    width : 90
  },
}));
/*
const priorities = [
  { title: 'High', value: 'high' },
  { title: 'Meduim', value: 'meduim' },
  { title: 'Low', value: 'low' },
];*/