import React, { Component } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import titleIcon from '../../../Assests/icon2/term (1).svg';
import {misReport ,batchVerify, sendDataToRedux} from '../../../store/DRO/action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class IGRBatchVerification extends Component{

    constructor(props){
        super(props);
        this.state={
            switch_allDocs:true,
            navigate:false,
            rowData:[],
            batchId:'',
        
            data:[
                // {batchID:123439, totalDoc:"5,35,378", verifiedDocs:"5,32,178", missmatchedDocs:"3,000", missingDocs:200},
                // {batchID:143437, totalDoc:"5,35,378", verifiedDocs:"5,32,178", missmatchedDocs:"3,000", missingDocs:200},
                // {batchID:243431, totalDoc:"5,35,378", verifiedDocs:"5,32,178", missmatchedDocs:"3,000", missingDocs:200},
                // {batchID:643432, totalDoc:"5,35,378", verifiedDocs:"5,32,178", missmatchedDocs:"3,000", missingDocs:200},
                // {batchID:743431, totalDoc:"5,35,378", verifiedDocs:"5,32,178", missmatchedDocs:"3,000", missingDocs:200},
                // {batchID:948433, totalDoc:"5,35,378", verifiedDocs:"5,32,178", missmatchedDocs:"3,000", missingDocs:200},
                // {batchID:888435, totalDoc:"5,35,378", verifiedDocs:"5,32,178", missmatchedDocs:"3,000", missingDocs:200}
            ]
        }
    }

    // handleRoute(id){
    //     this.props.history.push(`/batch-id/${id}`)
    //     // {console.log("whts id",id)}
    //     // this.props.history.push(`/igr-batch-verification/uploaded-document/${id}`)
    // }
    

    handleRoute(id, items){
        this.setState({...this.state,
            batchId:id,
            rowData:[parseInt(items.TotalDocuments), parseInt(items.VerifiedDocs), parseInt(items.MissedDocuments)],
            navigate:!this.state.navigate})

        // const data = {
        //     status:'render',
        //     data:items
        // }
        // this.props.sendDataToRedux(data);
        // this.props.history.push(`/admin/misreport/batchverification/${id}`)
        // this.props.history.push(`/igr-batch-verification/uploaded-document/${id}`)
      
            // this.props.history.push(`/igr-batch-upload/document/${id}`)
        
    }

    componentDidMount(){
        this.props.misReport()
    }

    componentDidUpdate(prev){
        if(prev.getMisRep_list !=  this.props.getMisRep_list){
            console.log('data length',this.props.getMisRep_list.data.length)       
            if(this.props.getMisRep_list.data.length!=0){
                let temp = this.state;
           for(var i=0; i<this.props.getMisRep_list.data.length; i++){
                    var data={
                        BatchId:this.props.getMisRep_list.data[i].BatchId,
                        MissedDocuments:this.props.getMisRep_list.data[i].MismatchedDocs,
                        MissingDocuments:this.props.getMisRep_list.data[i].MissingDocs,
                        VerifiedDocs:this.props.getMisRep_list.data[i].VerifiedDocs,
                        TotalDocuments:this.props.getMisRep_list.data[i].TotalDocuments  
                     }
                    // console.log("data",getMisRep_list);
                    temp.data.push(data);
                }
                console.log("Hi",temp.data);
               this.setState(temp);
            }
        }

        // if(){
        //     console.log(this.state)
        //     this.setState({...this.state,navigate:!this.state.navigate})
        // }
    }
    handleRoute(id, items){
        this.setState({...this.state,
            batchId:id,
            rowData:[parseInt(items.TotalDocuments), parseInt(items.VerifiedDocs), parseInt(items.MissedDocuments)],
            navigate:!this.state.navigate})

        // const data = {
        //     status:'render',
        //     data:items
        // }
        // this.props.sendDataToRedux(data);
        // this.props.history.push(`/admin/misreport/batchverification/${id}`)
        // this.props.history.push(`/igr-batch-verification/uploaded-document/${id}`)
      
            // this.props.history.push(`/igr-batch-upload/document/${id}`)
        
    }


    render(){
        return <div className='batchVerification-Index'>
            <div  className='batchVerification-Index-layout'>
                <div className='inner-batchVerification-Index-layout'>
                    <div className='row'>
                        <div className='col-md-12 title-row'>
                            <img src={titleIcon} /> &nbsp;&nbsp; <span>Batch Verification</span>
                        </div>
                        <div className='col-md-12 mt-3 table-responsive body-row'>
                            <table>
                               <tbody>
                                   <tr className='batch-table-header'>
                                        <td>Batch ID</td>
                                        <td>Total Documents</td>
                                        <td>Verified Documents</td>
                                        <td>Mismatched Documents</td>
                                        <td>Missing Documents</td>
                                   </tr>
                                  {/* {this.state.data.map((items,indx)=><tr className={indx%2==0?"batch-table-body1":"batch-table-body2"}>
                                        <td  onClick={()=>this.handleRoute(items.batchID)} className="idHighLighter"><span>{items.batchID}</span></td>
                                        <td>{items.totalDoc}</td>
                                        <td>{items.verifiedDocs}</td>
                                        <td>{items.missmatchedDocs}</td>
                                        <td>{items.missingDocs}</td>
                                   </tr>)} */}


                                            {this.state.data.length !=0 && this.state.data.map((items,indx)=><tr className={indx%2==0?"batch-table-body1":"batch-table-body2"} style={{height:'4rem', background:indx%2?'rgba(55, 125, 34,0.03)':'#fff'}}>
                                                        <td onClick={()=>this.handleRoute(items.BatchId, items)} className="idHighLighter" style={{fontSize:'small', textAlign:'center', verticalAlign:'middle', cursor:'pointer'}} ><span>{items.BatchId}</span></td>
                                                        <td style={{fontSize:'small', textAlign:'center', verticalAlign:'middle'}}>{items.TotalDocuments}</td>
                                                        <td style={{fontSize:'small', textAlign:'center', verticalAlign:'middle'}}>{items.VerifiedDocs}</td>
                                                        <td style={{fontSize:'small', textAlign:'center', verticalAlign:'middle'}}> &nbsp;&nbsp;{items.MissedDocuments}</td>
                                                        <td style={{fontSize:'small', textAlign:'center', verticalAlign:'middle'}}> &nbsp;&nbsp;0</td>
                                                         {console.log("batchId ka Data",items.BatchId)}
                                                  </tr>)}  
                               </tbody>
                            </table>
                        </div>
                        <div className='col-md-12 mt-5 mb-4 batch-verification-end-row'>
                            <div className='batch-dataNumber'>
                                <div className='batch-page-data-count'>7</div>
                                &nbsp; &nbsp;
                                <label>Items Per Page</label>
                            </div>
                            <div className='batch-pagenumber'>
                                <div className='batch-paggination'>
                                    <AiFillStepBackward style={{width:'3rem',cursor:'pointer'}}></AiFillStepBackward>
                                    <label className='active'>1</label> &nbsp;&nbsp;
                                    <label>2</label>
                                    <label>3</label>
                                    <label>4</label>
                                    <label>5</label>
                                    <label>6</label>
                                    <label>7</label>
                                    <label>8</label>
                                    <label>9</label>
                                    <AiFillStepForward style={{cursor:'pointer'}}></AiFillStepForward>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    }
}



const mapStateToProps=(state)=>{
     console.log('BathcI --',state.dro)
    return {
        // batch_list_by_id:state.admin.batch_upload_list_by_id,
        // getVdata: state.admin.getbatchVbyId,
        // batchReportRow: state.admin.batchReportRowData,
        // getMis :state.admin.getMis_report
        getMisRep_list: state.dro.getMis_report
    
    }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        batchVerify,
         misReport,
         sendDataToRedux}
        ,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(IGRBatchVerification);