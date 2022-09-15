import {GET_ALL_MASTER_DATA , GET_ALL_ZONES,LOGOUT_DATA , GET_ALL_DISTRICT , GET_MIS_REPORT , BATCH_REPORT_ROW , GET_MIS_REPORT_BY_ID} from './types';


const initialState = {
    
    getallMasters_data:'',
     //getallZones

     getallZones:'', 

     //getallDistrict
    getallDistrict:'',
    getMis_report:'',
    getbatchVbyId:'',
    logout_dataValue:undefined,

    
}



export default function reducer(state=initialState,{type,payload}){
    switch(type){
        
            case GET_ALL_MASTER_DATA:
                return{
                    ...state ,
                    getallMasters_data:payload
                }
                case LOGOUT_DATA:
                    return{
                        ...state ,
                        logout_dataValue:payload
                    }

                case GET_ALL_ZONES:{
                    return {
                        ...state ,
                        getallZones:payload
                    }
                }
        
                case GET_ALL_DISTRICT:{
                    return {
                        ...state ,
                        getallDistrict:payload
                    }
                }
                //getAllMisData
                case GET_MIS_REPORT:{
                    return { ...state , 
                        getMis_report:payload}}

                //batchRowData
                case BATCH_REPORT_ROW:
                    return{...state,
                         batchReportRowData:payload}
                //verificationByBatchId
                case GET_MIS_REPORT_BY_ID:
                    return {...state, getbatchVbyId:payload}
                        
        default:
            return{
                ...state
            }
    }
    
}

