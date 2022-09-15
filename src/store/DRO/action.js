import axios from 'axios'
import { devURLTnega } from '../../utilities/config'
import {
  GET_ALL_MASTER_DATA,
  GET_ALL_ZONES,
  GET_ALL_DISTRICT,
  GET_MIS_REPORT,
  BATCH_REPORT_ROW,
  GET_MIS_REPORT_BY_ID,
  LOGOUT_DATA,
} from './types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


let authtoken = localStorage.getItem('auth_token')
console.log(localStorage.getItem('auth_token'))



export const getallMasterApi = () => (dispatch) => {
  const API_URL = `${devURLTnega}api/master/districtsro `
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      if (response.status == true) {
        dispatch({ type: GET_ALL_MASTER_DATA, payload: response })
      }
    })
    .catch((err) => {
      console.log(err.response)
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

export const getZones = () => (dispatch) => {
  const API_URL = `${devURLTnega}api/master/getallzone`
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==true){
      dispatch({ type: GET_ALL_ZONES, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err.response)
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

export const getDistrict = () => (dispatch) => {
  const API_URL = `${devURLTnega}api/master/getdistrictzone`
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==true){
      dispatch({ type: GET_ALL_DISTRICT, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err.response)
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

export const misReport = () => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchverification`
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==200){
      dispatch({ type: GET_MIS_REPORT, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err.response)
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

export const batchVerify = (id) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchverification/${id}`
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==true){
      dispatch({ type: GET_MIS_REPORT_BY_ID, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err.response)
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

export const sendDataToRedux = (data) => (dispatch) => {
  dispatch({ type: BATCH_REPORT_ROW, payload: data })
}
