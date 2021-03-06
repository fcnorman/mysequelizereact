import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'
// import { history } from '../components/Navbar';
import {connect} from 'react-redux';
import {logIn} from '../../actions/';
import {Link} from 'react-router-dom';

const Styles = {
    myPaper: {
        margin: '20px 0px',
        padding: '20px'
    },
    button: {
        margin: '0px 20px'
    }

}

const MyLink = props => <Link to="/Forgot" {...props}/>

class signIn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {
                username: "",
                password: ""
            },
            loggedEmail: "",
            loginError: "",
            myToken: "",
            userLoggedIn: false,
            emailBlank: true,
            passwordBlank: true,
            emailInvalid: false,
            passwordInValid: false,
            // token:localStorage.getItem('JWT')
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        const {formData} = this.state;

        this.setState({
            formData: {
                ...formData,
                [e.target.name]: e.target.value
            }
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {formData} = this.state;
        const {username, password} = formData;

        const creds = {
            username,
            password
        }
        this
            .props
            .logIn(creds);
        console.log(creds);
        

    }

  

    render() {

        if (this.props.isAuthenticated) {
            return (<Redirect to="/dashboard"/>);
        }

        return (

            <div style={{
                padding: '20px 100px'
            }}>

                {this.props.error && (
                    <div style={{
                        color: 'red'
                    }}>
                        {this.props.error}
                    </div>
                )}

                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="outlined-name2"
                        label="Username"
                        className=""
                        style={{
                        width: 560
                    }}
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"/>
                    <br></br>
                    <TextField
                        id="outlined-name"
                        label="Password"
                        name="password"
                        type="password"
                        style={{
                        width: 560
                    }}
                        className=""
                        value={this.state.password}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"/>

                    <br></br>

                    <Button variant="outlined" color="primary" type="submit">
                        Log In
                    </Button>

                    <Button
                        component={MyLink}
                        variant="outlined"
                        type="submit"
                        style={Styles.button}>
                        Forgot Password ?
                    </Button>

                </form>

            </div>

        );
    }

}

const mapStateToProps = (state) => ({
    token: state.user.getToken, 
    isAuthenticated: state.user.isAuthenticated,
    error: state.user.authError
});

const mapDispatchToProps = (dispatch) => ({
    logIn: (user) => dispatch(logIn(user))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signIn));