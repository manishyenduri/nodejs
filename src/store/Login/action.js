import axios from 'axios';
import { devURLTnega } from '../../utilities/config';
import {POST_LOGIN, POST_LOGIN_ERROR ,OTP_VERIFY,OTP_VERIFY_ERROR,LOGOUT_DATA, GET_USER, GET_ALL_MASTER_DATA, UPDATE_STATUS,VERIFY_OTP,VERIFY_OTP_ERROR, POST_FORGET,CHANGE_PASSWORD,CHANGE_PASSWORD_ERROR , POST_FORGET_ERROR, GET_BATCH_VERIFICATION} from './types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

let authtoken = localStorage.getItem('auth_token')
console.log(localStorage.getItem('auth_token'))
console.log(localStorage)

export const loginApi = data => dispatch =>{

    const API_URL = `${devURLTnega}api/users/login`;

    const body={
        "user": {
            "email": data.email,
            "password": data.password,            
        }
    };

    axios.post(API_URL,body,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
        },
      })
    .then((res)=>{
        console.log("user data", res);
        dispatch({type:POST_LOGIN, payload:res.data})
        dispatch({type:GET_USER , payload:res.data.user})
    })
    .catch(err=>{
        console.log("login--- ",err.response);
        // dispatch({type:POST_LOGIN_ERROR, payload:err.response.data})
        // MySwal.fire(err.response.data.message);
        // if(err.response.status == 401){

        //     const data ={
        //       refreshToken:localStorage.refresh_token
        //     }
        //     axios.post(`${devURLTnega}api/users/auth/token`,data)
        //     .then((res) => {
              
        //       localStorage.setItem('authorization',res.data.token)
        //       localStorage.setItem('refreshToken',res.data.refreshToken)  
        //     })
        //     .catch((err) => {
        //       const data={
        //         email: localStorage.getItem('email_id'),
        //         refreshToken:localStorage.getItem('refreshToken'),
        //       }
        //       axios.post('http://3.110.180.81:3000/api/users/logout',data)
        //       .then((res) => {
        //         localStorage.clear()
        //         dispatch({type:LOGOUT_DATA, payload:res})
        //       })
        //     })
        //   }
        // if(err.response.data.message=="Login Failed"){
        //     Swal.fire("Login","Failed","error");
        // }
    })
}



export const otpVerification = data => dispatch =>{

    const API_URL = `${devURLTnega}api/users/verifyotp`;
  console.log('rflkfmlfkmlskmfk',data)
    axios.post(API_URL,data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
        },
      })
    .then((res)=>{
        console.log("user data", res.data);        
        dispatch({type:OTP_VERIFY, payload:res.data})
        // localStorage.setItem('authorization',res.user.token)
        // localStorage.setItem('refreshToken',res.user.refreshtoken)
    })
    .catch(err=>{
        console.log("login--- ",err.response);
        dispatch({type:OTP_VERIFY_ERROR, payload:err})
        MySwal.fire("Invalid otp")
        
    })
}

export const forgotApi = data => dispatch =>{

    const API_URL = `${devURLTnega}api/forgotpassword`;

    const body={
    
            "email": data.email
           
        
    };

    axios.post(API_URL,body,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
        },
      })
    .then((res)=>{
        console.log(res.data);

        dispatch({type:POST_FORGET, payload:res.data})
        
    })
    .catch(err=>{
        console.log("Forgot --- ",err.response);
        dispatch({type:POST_FORGET_ERROR, payload:err.response.data})
        if(err.response.status == 401){

            const data ={
              refreshToken: localStorage.getItem('refresh_token')
            }
            axios.post(`${devURLTnega}api/users/auth/token`,data)
            .then((res) => {
              
              localStorage.setItem('authorization',res.data.token)
              localStorage.setItem('refreshToken',res.data.refreshToken)  
            })
          }
        if(err.response.data.message=="Login Failed"){
            Swal.fire("Login","Failed","error");
        }
    })
}


export const OtpVerified = data => dispatch =>{

    console.log(data);

    const API_URL = `${devURLTnega}api/users/verifyresetotp`;

    
    axios.post(API_URL,data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
        },
      })
    .then((res)=>{
        console.log(res.data);

        dispatch({type:VERIFY_OTP, payload:res.data})
        
    })
    .catch(err=>{
        console.log("verified otp ",err.response);
        dispatch({type:VERIFY_OTP_ERROR, payload:err.response})
        if(err.response.status == 401){

            const data ={
              refreshToken: localStorage.getItem('refresh_token')
            }
            axios.post(`${devURLTnega}api/users/auth/token`,data)
            .then((res) => {
              
              localStorage.setItem('authorization',res.data.token)
              localStorage.setItem('refreshToken',res.data.refreshToken)  
            })
          }
        if(err.response.data.message=="Login Failed"){
            Swal.fire("Login","Failed","error");
        }
    })
}

export const changePassword = data => dispatch =>{

    console.log(data);

    const API_URL = `${devURLTnega}api/users/changepassword`;

    
    axios.post(API_URL,data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
        },
      })
    .then((res)=>{
        console.log(res.data);

        dispatch({type:CHANGE_PASSWORD, payload:res.data})

        
    })
    .catch(err=>{
        console.log("verified otp ",err.response);
        dispatch({type:CHANGE_PASSWORD_ERROR, payload:err.response})
        if(err.response.status == 401){

            const data ={
              refreshToken: localStorage.getItem('refresh_token')
            }
            axios.post(`${devURLTnega}api/users/auth/token`,data)
            .then((res) => {
              
              localStorage.setItem('authorization',res.data.token)
              localStorage.setItem('refreshToken',res.data.refreshToken)  
            })
          }
        if(err.response.data.message=="Login Failed"){
            Swal.fire("Login","Failed","error");
        }
    })
}


//igr-batch-verification

export const getBatchVerification =()=>(dispatch)=>{
    const API_URL=`${devURLTnega}api/dashboard/batchschema `;
    axios.get(API_URL,{
        headers:{
            Authorization:'Bearer '+ authtoken
        }
    }).then((res)=>res.data)
    .then((response)=>{
        console.log('200 - ',response)
        if(response.status==200){
            dispatch({type:GET_BATCH_VERIFICATION, payload:response})
    }
    })
    .catch(err=>{
        console.log(err.response);
        if(err.response.status == 401){

            const data ={
              refreshToken: localStorage.getItem('refresh_token')
            }
            axios.post(`${devURLTnega}api/users/auth/token`,data)
            .then((res) => {
              
              localStorage.setItem('authorization',res.data.token)
              localStorage.setItem('refreshToken',res.data.refreshToken)  
            })
            .catch((err) => {
              const data={
                email: localStorage.getItem('email_id'),
                refreshToken:localStorage.getItem('refreshToken'),
              }
              axios.post('http://3.110.180.81:3000/api/users/logout',data)
              .then((res) => {
                localStorage.clear()
                dispatch({type:LOGOUT_DATA, payload:res})
              })
            })
          }
        if(err.response.data.message=="Login Failed"){
            Swal.fire("Login","Failed","error");
        }
    })
}


//ResetoPassword

export const resetPassword = data => dispatch =>{

    const API_URL = `${devURLTnega}api/resetpassword`;

    const body={
        "user": {
            "email": data.email,
            "password": data.password,
            "confirm_password": data.confirm_password,
            // "username": data.name,
            
            "role": data.role,
            "zone": data.Zone,
            "district": data.District
            
        }
    };

    axios.post(API_URL,body,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
        },
      })
    .then((res)=>{
        console.log("user data", res.data.user);
        dispatch({type:POST_LOGIN, payload:res.data})
        dispatch({type:GET_USER , payload:res.data.user})
    })
    .catch(err=>{
        console.log("login--- ",err.response);
        dispatch({type:POST_LOGIN_ERROR, payload:err.response.data})
        if(err.response.status == 401){

            const data ={
              refreshToken: localStorage.getItem('refresh_token')
            }
            axios.post(`${devURLTnega}api/users/auth/token`,data)
            .then((res) => {
              
              localStorage.setItem('authorization',res.data.token)
              localStorage.setItem('refreshToken',res.data.refreshToken)  
            })
            .catch((err) => {
              const data={
                email: localStorage.getItem('email_id'),
                refreshToken:localStorage.getItem('refreshToken'),
              }
              axios.post('http://3.110.180.81:3000/api/users/logout',data)
              .then((res) => {
                localStorage.clear()
                dispatch({type:LOGOUT_DATA, payload:res})
              })
            })
          }
        if(err.response.data.message=="Login Failed"){
            Swal.fire("Login","Failed","error");
        }
    })
}


