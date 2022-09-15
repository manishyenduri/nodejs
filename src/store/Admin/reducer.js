import {GET_BATCH_UPLOAD_LIST,LOGOUT_DATA,GET_RANGE_SEARCH_DATA_ING,GET_SEARCH_DATA_ING,GET_RANGE_SEARCH_DATA, GET_BATCH_UPLOAD_LIST_BY_ID, GET_CITY_NAMES,GET_SEARCH_DATA, GET_REPORT_TYPE,GET_VIEWDOC, GET_STATE_NAMES, GET_USER_DEPARTMENTS, GET_USER_PREVILEGES, GET_USER_ROLE_LIST, POST_USER_ROLES, SET_ROUTING_NAME,GET_ADDUSER_DETAILS,GET_USER_DATA ,POST_ADDUSER_ERROR, POST_ADDUSER , GET_ALL_USERS_DETAILS , GET_MIS_REPORT, GET_MIS_REPORT_BY_ID , GET_ALL_ZONES, GET_ALL_DISTRICT,GET_DOCUMENT_INDEX, GET_SRO_BY_DISTRICT, ADD_USER, BATCH_REPORT_ROW, UPDATE_STATUS} from './types';
// import 
const initialState = {
    city_list:'',
    state_list:'',
    route_title:'',
    get_user_previleges:'',
    get_user_dept:'',
    create_user_roles:'',
    user_role_list:'',
    user_role_report_type:'',
    getr_searchData:'',

    //add user
    adduser_response:'',
    adduser_response_err:'',
    
    //getallUsers

    getallUsers_details:'',
    getallUsers_details_err:'',
    block_user:'',
    User_Data:'',
    //getmisReport
    getMis_report:'',


    //batchVerificationById
    getbatchVbyId:'',

    //getallZones

    getallZones:'', 
    getDocumentIndex:'',
    get_viewDoc: undefined,
    //getallDistrict
    
        getallDistrict:'',

    getallSROList:'',
    addUserStatus:'',
    getr_searchDataIng:'',
    //Admin
    batch_upoad_list:'',
    batch_upload_list_by_id:'',

    batchReportRowData:'',
    all_users_action_update:'',
    message:'waiting for the reducer',
    logout_dataValue: undefined,
}

export default function reducer(state=initialState,{type,payload}){
    switch(type){
        case SET_ROUTING_NAME:
            return{...state, route_title:payload}
        case LOGOUT_DATA:
            return{...state, logout_dataValue:payload}
        case GET_USER_PREVILEGES:
            return {...state, get_user_previleges:payload}
        case GET_USER_DEPARTMENTS:
            return {...state, get_user_dept:payload}
        case POST_USER_ROLES:
            return {...state, create_user_roles:payload}
        case GET_USER_ROLE_LIST:
            return {...state, user_role_list:payload}
        case GET_REPORT_TYPE:
            return {...state,user_role_report_type:payload }
        case GET_CITY_NAMES:
            return {...state,city_list:payload }
        case GET_STATE_NAMES:
            return {...state, state_list:payload}
        case GET_VIEWDOC:
            return {...state, get_viewDoc:payload}
        case GET_SEARCH_DATA:
            return {...state, getr_searchData:payload}

        case GET_RANGE_SEARCH_DATA:
            return {...state, getr_searchData:payload}
            case GET_SEARCH_DATA_ING:
                return {...state, getr_searchDataIng:payload}
    
            case GET_RANGE_SEARCH_DATA_ING:
                return {...state, getr_searchDataIng:payload}
        //adduser

            case  GET_ADDUSER_DETAILS: 
                return {
                    
                        ...state
                }
            case POST_ADDUSER:
                return{
                    ...state,
                    adduser_response:payload
                }  
            case POST_ADDUSER_ERROR:
                return{
                    ...state,
                    adduser_response_err:payload
                } 

        //getallUserDetails

        case GET_ALL_USERS_DETAILS:{
                return { ...state , getallUsers_details:payload, block_user: payload.filter((user)=>user.status!=='Active')}
    
        }

        case GET_USER_DATA:{
            return { ...state , User_Data:payload,}

    }

        //getMisReport
             case GET_MIS_REPORT:{
                return { ...state , getMis_report:payload}

        }

        case GET_MIS_REPORT_BY_ID:{
            return { ...state , getbatchVbyId:payload}
        }

        case GET_ALL_ZONES:{
            return {
                ...state ,
                getallZones:payload
            }
        }


        //getAllDistrict
        case GET_ALL_DISTRICT:{
            return {
                ...state ,
                getallDistrict:payload
            }
        }
        case GET_DOCUMENT_INDEX:{
            return {
                ...state ,
                getDocumentIndex:payload
            }
        }
        //Admin
        case GET_BATCH_UPLOAD_LIST:
            return {...state, batch_upoad_list:payload}
        case GET_BATCH_UPLOAD_LIST_BY_ID:
            return {...state, batch_upload_list_by_id:payload}
        case GET_SRO_BY_DISTRICT:
            return {...state, getallSROList:payload}

        case ADD_USER:
            return{...state, addUserStatus:payload }
        case BATCH_REPORT_ROW:
            return{...state, batchReportRowData:payload}

        case UPDATE_STATUS:
            return{
                ...state, all_users_action_update:payload
            }
        default:
            return{
                ...state
            }
    }
}