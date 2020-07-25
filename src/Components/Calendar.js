import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const moment = require('moment')


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
  let currentDate = moment(new Date()).zone("+0530").format('YYYY-MM-DD')
  
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Select Date"
        type="date"
        defaultValue={currentDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.changeDate}
      />
    </form>
  );
}
