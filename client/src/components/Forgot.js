import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
const Styles = {
    myPaper: {
        margin: '20px 0px',
        padding: '20px'
    },
    wrapper: {
        padding: '0px 60px'
    },

    textF: {
        width: '500px'
    }

}

class Forgot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
            showNullError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    sendEmail = e => {
        e.preventDefault();
        if (this.state.email === '') {
            this.setState({showError: false, messageFromServer: '', showNullError: true});
        } else {
            axios
               .post('/api/users/forgotPassword', {email: this.state.email})
               .then(response => {
                    console.log(response.data);
                    if (response.data === 'recovery email sent') {
                        this.setState({showError: false, messageFromServer: 'recovery email sent', showNullError: false});
                    }
                })
                .catch(error => {
                    console.log(error.response.data);
                    if (error.response.data === 'email not in db') {
                        this.setState({showError: true, messageFromServer: '', showNullError: false});
                    }
                });
        }
    };

    render() {
        const {email, messageFromServer, showNullError, showError} = this.state;

        return (
            <div className="App" style={Styles.wrapper}>
                <h1> Forgot Password</h1>


                {showError && (
                  <div>
                    <p>
                      That email address isn't recognized. Please try again or register
                      for a new account.
                    </p>
                  
                  </div>
                )}

                {messageFromServer === 'recovery email sent' && (
                    <div>
                        <h3>Password Reset Email Successfully Sent!</h3>
                    </div>
                )}

                <form className="profile-form" onSubmit={this.sendEmail}>
                    <TextField
                        id="email"
                        label="Email"
                        style={Styles.textF}
                        value={email}
                        onChange={this.handleChange('email')}
                        placeholder="Email Address"/>
                    <br></br>
                    <br></br>
                    <Button variant="outlined" type="submit">
                        Send Password Reset Email
                    </Button>
                </form>


            </div>
        );
    }
}

export default Forgot;