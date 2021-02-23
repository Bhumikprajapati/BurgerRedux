import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
};
export const authSuccess=(idToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:idToken,
        userId:userId
    }
};
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
};
export const logout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const authTimeout=(expireTime)=>{
    return dispatch=>{
setTimeout(()=>{
dispatch(logout())
},expireTime)
    }

}
export const auth=(email,password,signOption)=>{
    return dispatch=>{
        dispatch(authStart()) 
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLc9_Y3jTCUmAWMxVFAZNOEe5KO9ar-14';
        if(!signOption){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLc9_Y3jTCUmAWMxVFAZNOEe5KO9ar-14'
        }
        axios.post(url,authData )
        .then(response=>  {console.log(response); 
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(authTimeout(response.data.expiresIn))
        }
           
            )
        .catch(err=>dispatch(authFail(err.response.data.error)))
    }
}