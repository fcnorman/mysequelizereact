import axios from 'axios';
import { history } from '../components/layout/Navbar';
import Axios from '../Axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import JWT from 'jsonwebtoken';
export const SET_USER = "SET_USER";
export const LOG_FAIL = "LOG_FAIL";

export const REG_SUC = "REG_SUCCESS";
export const REG_FAIL = "REG_FAIL";

export const POST_SUCC = "POST_SUCC";
export const POST_FAIL = "POST_FAIL";

export const LOGOUT = "LOGOUT";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const FORGOT = "FORGOT";
export const FORGOT_ERR = "FORGET_ERR";

export const RESET = "RESET";
export const RESET_FAIL = "RESET_FAIL";

export const UPDATEPASS = "UPDATEPASS";
export const UPDATEPASS_FAIL = "UPDATEPASS_FAIL";

export const POST_AUTH = "POST_AUTH";
export const SIGN_GITHUB = "SIGN_GITHUB";

export const GET_USER = "GET_USER";

export const logIn =  (user) => { 
    return (dispatch) => {
        axios.post(process.env.REACT_APP_BASE_SIGN_IN,{
            username: user.username,
            password: user.password,
            
        }).then( (res) => {
            const token = res.data.token;
            localStorage.setItem('auth', token);
            setAuthToken(token);
            history.push('/dashboard');
            dispatch({type: SET_USER, user});
        }).catch((err)=> {
       
            dispatch({type:  LOG_FAIL, err});
            console.log(err.response.data); // not even showing err console.
        })
        
    }
}

// export const getUser = () => {

//     return async (dispatch) =>{
//         Axios.get('/api/users/user', {
//              headers: {
//                  "Authorization" : `Bearer ${localStorage.getItem('auth')}`
//             } 
//         })
//         .then( (res, decoded) => {
//             console.log(res.data);
//             localStorage.setItem('auth', res.data.authenticated);
//             dispatch({type: GET_USER, payload: decoded});
//         }).catch( (err) => {
//             console.log(err);
//         })
//     }
// }


export const setCurrentUser = decoded => {
    return {
        type: GET_USER,
        payload: decoded
    };
};


export const signWithGithub =  () => { 
    return  (dispatch) => {  
        dispatch({type: SIGN_GITHUB});    
        console.log('im an owl');
    }
}

export const register = (user) => { 
    return (dispatch) => {
        Axios.post(process.env.REACT_APP_REGISTER,{
            username: user.username,
            password: user.password,
            email: user.email 
        }).then( (res) => {
            // signs user in once registered
            const token = res.data.token;
            localStorage.setItem('auth', token);
            setAuthToken(token);
            console.log(res.data);
            history.push('/dashboard');
            dispatch({type: REG_SUC, user});
        }).catch((err)=> {
            dispatch({type:  REG_FAIL, err});
            console.log(err.response.data); // shows console.log for this though.
        })
        
    }
}


export const newPost = (post, req) => { 
    return (dispatch) => {
        Axios.post(process.env.REACT_APP_NEWPOST ,{
            title: post.title,
            post_content: post.postContent
        }).then( (res) => {
            // console.log('success')
            history.push('/Posts');
            dispatch({type: POST_SUCC, post});
        }).catch((err)=> {
            dispatch({type:  POST_FAIL, err});
            console.log(err.response.data); // shows console.log for this though.
        })
        
    }
}

export const Forget = (creds)  => {
    return  (dispatch) =>{
       axios.post('/api/users/forgotPassword',{
            email: creds.email
        }).then(response => {
            console.log(creds.email);
            console.log(response.data);
            if (response.data === 'recovery email sent') {
                 dispatch({type:FORGOT, creds});     
            }
         }).catch(err => {
            console.log(err.response.data);
            if (err.response.data === 'email not in db') {
                dispatch({type:FORGOT_ERR, err});  
            }
           
         });
    }
}

export const updatePass = (creds)  => {
    return  (dispatch) =>{
        axios.put('/api/users/updatePasswordViaEmail', {
            username: creds.username,
            password: creds.password,
        }).then(response => {
            // console.log(creds.username);
            console.log(response);
            dispatch({type:UPDATEPASS, creds});            
         }).catch(err => {
            dispatch({type:UPDATEPASS_FAIL, err});       
         });
    }
}


export const Reset = () => {
    return async (dispatch) =>{
        await axios
            .get('/api/users/reset', {
                params: {
                    resetPasswordToken: this.props.match.params.token,
                },
            })
            .then(response => {
                console.log(response);
                if (response.data.message === 'password reset link a-ok') {
            
                    dispatch({ type: RESET});
                }
              })
              .catch(err => {
                console.log(err.response.data);
         
                dispatch({ type: RESET_FAIL, err});
              });
    }
}
