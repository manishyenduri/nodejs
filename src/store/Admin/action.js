import { devUrl, devURLTnega } from '../../utilities/config'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  GET_BATCH_UPLOAD_LIST,
  GET_BATCH_UPLOAD_LIST_BY_ID,
  UPDATE_STATUS,
  GET_CITY_NAMES,
  GET_REPORT_TYPE,
  GET_STATE_NAMES,
  GET_USER_DEPARTMENTS,
  GET_USER_PREVILEGES,
  GET_USER_ROLE_LIST,
  POST_USER_ROLES,
  SET_ROUTING_NAME,
  POST_ADDUSER_DETAILS,
  POST_ADDUSER,
  POST_ADDUSER_ERROR,
  GET_ALL_USERS_DETAILS,
  GET_MIS_REPORT,
  GET_MIS_REPORT_BY_ID,
  GET_ALL_ZONES,
  GET_ALL_DISTRICT,
  GET_DOCUMENT_INDEX,
  GET_SRO_BY_DISTRICT,
  ADD_USER,
  GET_USER_DATA,
  BATCH_REPORT_ROW,
  GET_VIEWDOC,
  GET_SEARCH_DATA,
  GET_RANGE_SEARCH_DATA,
  GET_SEARCH_DATA_ING,
  GET_RANGE_SEARCH_DATA_ING,
  LOGOUT_DATA,
} from './types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import BatchId from '../../Pages/RegistrationPortal/BatchId/BatchId'
import { dispatch } from 'd3'
const MySwal = withReactContent(Swal)

let authtoken = localStorage.getItem('auth_token')

console.log(authtoken)
export const setRoutingName = (data) => (dispatch) => {
  if (data != '') dispatch({ type: SET_ROUTING_NAME, payload: data })
}

export const user_privileges = () => (dispatch) => {
  const API_URL = `${devUrl}module-privileges/`
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==200){
      dispatch({ type: GET_USER_PREVILEGES, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err)
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

export const viewDocument = (data) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/gettiff`
  axios
    .post(API_URL, data,{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==200){
      dispatch({ type: GET_VIEWDOC, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err)
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

export const getUserDept = () => (dispatch) => {
  const API_URL = `${devUrl}department/`
  axios(API_URL, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    },
  })
    .then((res) => res.data)
    .then((response) =>
      dispatch({ type: GET_USER_DEPARTMENTS, payload: response }),
    )
    .catch((err) => {console.log(err)
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
    }})
}

// report-type
export const getUserRole_ReportType = () => (dispatch) => {
  const API_URL = `${devUrl}report-type/`
  axios(API_URL, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    },
  })
    .then((res) => res.data)
    .then((response) => dispatch({ type: GET_REPORT_TYPE, payload: response }))
    .catch((err) => {console.log(err)
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
    }})
}

export const createUserRole = (data) => (dispatch) => {
  const API_URL = `${devUrl}api/users/role/?department_id=1`
  //     const body ={
  // "role_id": "SG0003",
  // "status_id": 1,
  // "role_name": "Manger",
  // "department_ids": [1],
  // "description": "test descr hai",
  // "creation_date": "2021-12-19",
  // "deactivation_date": "2022-12-19",
  // "sanction_transaction_min": "100",
  // "sanction_transaction_max": "50000",
  // "transaction_auth_limit_min": "400",
  // "transaction_auth_limit_max": "50000",
  // "data_upload_access_upload" : "True",
  // "data_upload_access_download" : "True",
  // "remarks" : data.remarks,
  // "reports_name_id" : 2,
  // "privileges": {
  // 	"1": [1,2],
  //     "3": [2, 4]
  // }
  // }
  // const body = {
  //     "role_id":  data.role_id,
  //     "status_id": 1,
  //     "role_name": data.role_name,
  //     "department_ids": data.department_ids,
  //     "description":  data.description,
  //     "creation_date": data.creation_date,
  //     "deactivation_date": data.deactivation_date,
  //     "sanction_transaction_min": data.sanction_transaction_min,
  //     "sanction_transaction_max": data.sanction_transaction_max,
  //     "transaction_auth_limit_min": data.transaction_auth_limit_min,
  //     "transaction_auth_limit_max": data.transaction_auth_limit_max,
  //     "data_upload_access_upload" : "True",
  //     "data_upload_access_download" : "True",
  //     "remarks" : data.remarks,
  //     "reports_name_id" :2,
  //     // data.reports_name,
  //     "privileges": {
  //         "1": [1,2]
  //     }
  //     }
  const body = {
    role_id: data.role_id,
    status_id: parseInt(data.status_id),
    role_name: data.role_name,
    department_ids: data.department_ids,
    description: data.description,
    creation_date: data.creation_date,
    deactivation_date: data.deactivation_date,
    privileges: data.privileges,
    sanction_transaction_min: data.sanction_transaction_min,
    sanction_transaction_max: data.sanction_transaction_max,
    transaction_auth_limit_min: data.transaction_auth_limit_min,
    transaction_auth_limit_max: data.transaction_auth_limit_max,
    data_upload_access_upload: data.data_upload_access_upload,
    data_upload_access_download: data.data_upload_access_download,
    remarks: data.remarks,
    // remark_history:'',
    report_types: data.reports_name,
  }
  console.log(body)
  // return;
  axios
    .post(API_URL, body, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((response) => {
      console.log('user - role -- ', response)
      // if(response.status===200){
      dispatch({ type: POST_USER_ROLES, payload: response.data })
      MySwal.fire('User Role Creation', 'Completed', 'success')
      // }
    })
    .catch((err) => {
      MySwal.fire('User Role Creation', err.response.data.error, 'error')
      console.log('Error-> ', err.response)
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
      // dispatch({type:FETCH_TRADE_LIST, payload:err.response.data})
    })
}

export const user_roles_list = () => (dispatch) => {
  const API_URL = `${devUrl}api/users/role/?department_id=1`
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
      dispatch({ type: GET_USER_ROLE_LIST, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err)
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

//New integration of 2022
export const get_citys = () => (dispatch) => {
  const API_URL = `${devUrl}state/`
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
      dispatch({ type: GET_CITY_NAMES, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err)
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

//
export const get_state = () => (dispatch) => {
  const API_URL = `${devUrl}city/`
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
      dispatch({ type: GET_STATE_NAMES, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err)
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

//Admin APIs

export const getBatchUploadData = (data,data1) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchupload?pageNo=${data}&size=${data1}`
  console.log(API_URL)
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
      dispatch({ type: GET_BATCH_UPLOAD_LIST, payload: response })
      // }
    })
    .catch((err) => {
      console.log(err.response)
      if(err.response.status == 401){
        console.log(localStorage)
        const data ={
          refreshToken:localStorage.getItem('refresh_token')
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

export const getBatchUploadDataByID = (id) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchupload/${id}`
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
      dispatch({ type: GET_BATCH_UPLOAD_LIST_BY_ID, payload: response })
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

//adduser

export const addUserApi = (data) => (dispatch) => {
  console.log(data)
  // return;
  const API_URL = `${devURLTnega}api/adduser`

    axios
    .post(API_URL, data,{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'), //localStorage.getItem('auth_token')
      },
    })
    .then((res) => {
      console.log(res.data)

      dispatch({ type: POST_ADDUSER, payload: res.data })
    })
    .catch((err) => {
      console.log('Failed Adding User ', err.response)
      dispatch({ type: POST_ADDUSER_ERROR, payload: err.response })
      if(err.response !== undefined){
      if (err.response.data.errors.email !==  undefined && err.response.data.errors.username !== undefined && err.response.data.errors.mobileno !== undefined) {
        Swal.fire('Email,Username,Mobileno ', err.response.data.errors.email)
      }
      if (err.response.data.errors.email !==  undefined && err.response.data.errors.username === undefined) {
        Swal.fire('Email', err.response.data.errors.email)
      }
      if (err.response.data.errors.email ===  undefined && err.response.data.errors.username === undefined) {
        Swal.fire('Username', err.response.data.errors.username)
      }
      }

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

//userScreen getAllUserData

export const getAllUsersDetails = () => (dispatch) => {
  const API_URL = `${devURLTnega}api/allusers`
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
      dispatch({ type: GET_ALL_USERS_DETAILS, payload: response })
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


export const getUserData = (id) => (dispatch) => {
  const API_URL = `${devURLTnega}api/user/${id}`
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token')
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==200){
      dispatch({ type: GET_USER_DATA, payload: response })
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

//mis report data

export const misReport = (data,data1) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchverification?pageNo=${data}&size=${data1}`
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

//get batch verification by id

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

export const getDistrict = (id) => (dispatch) => {
  const API_URL = `${devURLTnega}api/master/getdistrictzone/${id}`
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



export const documentIndex = (data,data1,data2,data3,data4,data5) => (dispatch) => {
  // console.log(data);
  // console.log(data1);
  // console.log(data2);
  // console.log(data3);
  // console.log(data4);
  // console.log(data5);
  const API_URL = `${devURLTnega}api/dashboard/documentindex/${data}${data5}${data1}${data2}${data1}${data3}${data1}${data4}`
  console.log(API_URL);
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
      dispatch({ type: GET_DOCUMENT_INDEX, payload: response })
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


export const getSROList = (id) => (dispatch) => {
  const API_URL = `${devURLTnega}api/master/getsroname/${id}`
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
      dispatch({ type: GET_SRO_BY_DISTRICT, payload: response })
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

export const addUser = (data) => (dispatch) => {
  console.log('sdatga -- ', data)
  return
  const API_URL = `${devURLTnega}api/adduser`
  const body = {
    // "user": {
    //     "username" : "pkthakur02",
    //     "email": "prakashpusa@gmail.com",
    //     "mobile" : "+919931021948",
    //     "role" : "SRO",
    //     "zone" : "testZone",
    //     "sub_reg_ofc" : "Test Sub registrat Office",
    //     "designation" : "test designation",
    //     "district": "CHENNAI"
    // }
  }
  axios
    .post(API_URL, body, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      // if(response.status==true){
      dispatch({ type: ADD_USER, payload: response })
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
      }
    if(err.response.data.message=="Login Failed"){
        Swal.fire("Login","Failed","error");
    }
    })
}

export const sendDataToRedux = (data) => (dispatch) => {
  dispatch({ type: BATCH_REPORT_ROW, payload: data })
}

export const updateStatus = (id, status) => (dispatch) => {
  const token = localStorage.getItem('auth_token')
  console.log('auth_token', token)

  const API_URL = `${devURLTnega}api/user/updatestatus/${id}`
  axios
    .put(
      API_URL,
      {
        status: status === 'Inactive' ? 'Active' : 'Inactive',
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
        },
      },
    )
    .then((res) => res.data)
    .then((response) => {
      console.log('200 - ', response)
      dispatch({ type: UPDATE_STATUS, payload: response })
      toast.success(response.message)
      // }
    })
    .catch((err) => {
      MySwal.fire(
        'Unable to block user. Error Message: ',
        err.response.data.errors.error.message,
      )
      console.log(err)
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

export const getSearchData = (id,data,data1) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchupload/search/${id}?pageNo=${data}&size=${data1}`
  console.log(API_URL)
  axios
    .get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      console.log('khfiwhfoiwuhfowi')
      console.log('200 - ', response)
      // if(response.status==true){
      dispatch({ type: GET_SEARCH_DATA, payload: response })
      // }
    })
    .catch((err) => {
      console.log('error')
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
export const getRangeSearchData = (data,data1,data2,data3) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchupload/range?startDate=${data}&endDate=${data1}&pageNo=${data2}&size=${data3}`
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
      dispatch({ type: GET_RANGE_SEARCH_DATA, payload: response })
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

export const getSearchDataIng = (id,data,data1) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchverification/search/${id}?pageNo=${data}&size=${data1}`
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
      dispatch({ type: GET_SEARCH_DATA_ING, payload: response })
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
export const getRangeSearchDataIng = (data,data1,data2,data3) => (dispatch) => {
  const API_URL = `${devURLTnega}api/dashboard/batchverification/range?startDate=${data}&endDate=${data1}&pageNo=${data2}&size=${data3}`
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
      dispatch({ type: GET_RANGE_SEARCH_DATA_ING, payload: response })
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
