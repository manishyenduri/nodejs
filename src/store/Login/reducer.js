import {GET_LOGIN_DETAILS,OTP_VERIFY,OTP_VERIFY_ERROR,LOGOUT_DATA, POST_LOGIN, POST_LOGIN_ERROR , GET_USER,UPDATE_STATUS,CHANGE_PASSWORD,CHANGE_PASSWORD_ERROR , GET_ALL_MASTER_DATA,VERIFY_OTP_ERROR,VERIFY_OTP, POST_FORGET, POST_FORGET_ERROR , GET_BATCH_VERIFICATION} from './types';


const initialState = {
    login_response: undefined,
    login_response_err:'',
    message:'waiting for the reducer',
    forget_response:'',
    forget_response_err:'',
    message:'OTP Sent',
    get_batch_verification:'', 
    getallMasters_data:'',
    getMis_report:'',
    verify_otp:'',
    verify_otp_err:'',
    change_password: undefined,
    change_password_err:undefined,
    otp_verify:undefined,
    otp_verify_error:undefined,  
    logout_dataValue: undefined,  
}



export default function reducer(state=initialState,{type,payload}){
    switch(type){
        case GET_LOGIN_DETAILS:
            return{
                ...state
            }
        case POST_LOGIN:
            return{
                ...state,
                login_response:payload
            }
        case LOGOUT_DATA:
            return{
                ...state,
                logout_dataValue:payload
            }
        case OTP_VERIFY:
            return{
                ...state,
                otp_verify:payload
            }
        case OTP_VERIFY_ERROR:
            return{
                ...state,
                otp_verify_error:payload
            }
        case POST_LOGIN_ERROR:
            return{
                ...state,
                login_response_err:payload
            }

        case POST_FORGET:
            return{
                ...state,
                forget_response:payload
            }    
        case POST_FORGET_ERROR:
            return{
                ...state,
                forget_response_err:payload
        }

        case VERIFY_OTP:
            return{
                ...state,
                verify_otp:payload
            }    
        case VERIFY_OTP_ERROR:
            return{
                ...state,
                verify_otp_err:payload
        }

        case CHANGE_PASSWORD:
            return{
                ...state,
                change_password:payload
            }    
        case CHANGE_PASSWORD_ERROR:
            return{
                ...state,
                change_password_err:payload
        }
            
        case GET_USER:{

            return{
                ...state,
                user: payload
            }
        }
        //get MIS Report for roles
     

        //igr-batch-verification
        case GET_BATCH_VERIFICATION:
            return{
                ...state 
            }      

        case UPDATE_STATUS:
            return{
                ...state
            }
        default:
            return{
                ...state
            }
    }
    
}

