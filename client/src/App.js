import React, { Component } from 'react';
// import axios from 'axios';
import Navbar from './components/Navbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  chip: {
    margin: theme.spacing.unit,
  },
});


class App extends Component {

  constructor(props){
    super(props);
     
    this.state = {
      user: ""
    }

}
  


  render() {

    const { classes } = this.props;
    return (
      
      <div className="App">

        <Navbar />

      

      </div>
    );
  }
}
export default withStyles(styles)(App);
