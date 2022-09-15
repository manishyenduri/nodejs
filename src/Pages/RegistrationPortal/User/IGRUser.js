import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import durationIcon from '../../../Assests/icon2/term (1).svg';
import chartIcon from '../../../Assests/icon/Component 91.svg';
import { BsCircleFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { PaginationBar } from '../../../Components/PaginationBar';
import {getAllUsersDetails} from '../../../store/Admin/action'
import { Button } from 'semantic-ui-react';
import { Chart as ChartJS, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
ChartJS.register(
    Tooltip, Title, ArcElement, Legend
)
// import { Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartSeriesLabels } from '@progress/kendo-react-charts';
// import 'hammerjs';
// import data from './power-distribution-data.json';

// const labelContent = e => e.category;
// import { Doughnut } from 'react-chartjs-2';


class IGRUser extends Component {

    constructor(props){
        super(props);
        this.state={
            switch_allDocs:true,
            switch_mismatched:false,
            switch_blockedUser:false,
            pieData:{
                datasets:[{
                    data:[234389,2779,4567],
                    backgroundColor:[
                        'rgba(191, 221, 166, .8)',
                        'rgba(73, 114, 149,.8)',
                        'rgba(246, 141, 136,.8)'
                    ]
                }],

                // labels:[
                //     'Total Users',
                //     'Blocked Users',
                //     'Pending Approval'
                // ]
            },
            data:[
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Seller Name In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Purchaser Name In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Survey Number In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'}
            // ],

            // missingDocument:[
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
            //     {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'}
            // ],
            // blockedUser:[
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Seller Name In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Purchaser Name In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Survey Number In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Extend In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Survey Number In Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Plot Number in Document Index Mismatched', status:'Mismatched'},
            //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Purchaser Name In Document Index Mismatched', status:'Mismatched'}
            ],

            blockData:[ ]
     
          }
        }

        componentDidMount(){
            this.props.getAllUsersDetails();
        }

        componentDidUpdate(prev){
            console.log('hey',this.props.getAllUsers_list.length) 
            if(prev.getAllUsers_list !=  this.props.getAllUsers_list){
                console.log('hey',this.props.getAllUsers_list.length)       
                if(this.props.getAllUsers_list.length!=0){
                    let temp = this.state;
                    
               for(var i=0; i<this.props.getAllUsers_list.length; i++){
                        var data={
                            userId:this.props.getAllUsers_list[i]._id,
                            email:this.props.getAllUsers_list[i].email,
                            role:this.props.getAllUsers_list[i].role,
                            status:this.props.getAllUsers_list[i].status
                       
                        }

                        console.log("ch",temp.data);
                        temp.data.push(data);
                    }
    
                    this.setState(temp);
                }
            }
        }


            
    

    handleSwitchTabs=(name)=>{
        if(name=="switch_allDocs"){
            this.setState({...this.state,switch_allDocs:true,switch_mismatched:false,switch_blockedUser:false});
        }else  
        if(name=="switch_blockedUser"){
            this.setState({...this.state,switch_allDocs:false,switch_mismatched:false,switch_blockedUser:true});
        }
    }

    
    handleRoute(id){
        // this.props.history.push(`/batch-id/${id}`)
        this.props.history.push(`/${id}`)
    }

    handleBlock(id){
        this.state.push(this.state.blockData)
    }

    render(){
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='igr-batch-id-index'>
                        <div className='igr-batch-id-Index-layout'>
                            <div className="row">
                                <div className='col-md-12 igr-batch-id-Idnex-header'>
                                    <img src={durationIcon} /> &nbsp; &nbsp;<span>Users: {this.props.match.params.id}</span>
                                </div>
                                <div className='col-md-12 mb-4'>
                                    <div className='row'>
                                        <div className='col-md-7'>
                                        <div class="grid-container-element">
                                            {/* <div class="grid-child-element purple" style={{color:'green'}}>All District Regional Users</div> */}
                                            {/* <div class="grid-child-element green">      
                                           <select className='dropdown  ' style={{color:'green',border:'1px solid #377D22', outline:'none', padding:'.5rem .7rem'}}  >
                                                <option   >Select User Type</option>
                                                    <option >Option1</option>
                                                    <option >Option2</option>
                                                    <option >Option3</option>
                                            </select>
                                            </div> */}
                                                 </div>
                                           <div className="row m-0">
                                                <div className="col-md-4 p-0">
                                                    <div className='batchId-info-row'>
                                                        <div><label className='batch-id-row1-title'>Total Users</label></div>
                                                        <div className='batch-id-row1-data'>
                                                            <div><label>{this.props.getAllUsers_list.length}</label></div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 p-0">
                                                    <div className='batchId-info-row'>
                                                        <div><label className='batch-id-row1-title'>Blocked Users</label></div>
                                                        <div className='batch-id-row2-data'>
                                                            <div><label>0</label></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 p-0">
                                                    <div className='batchId-info-row'>
                                                        <div><label className='batch-id-row1-title'>Pending Approval</label></div>
                                                        <div className='batch-id-row3-data'>
                                                            <div><label>0</label></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                           
                                           </div>
                                        </div>
                                        <div className='col-md-5'>
                                            <div className='card mt-3' style={{height:'95%',boxShadow:'0px 3px 6px #00000029'}}>
                                                <div className='row' >
                                                    <div className='col-md-12 p-0 text-center'>
                                                        <span style={{color:'#000000',fontSize:'.8rem',fontWeight:'600'}}>All Users</span>
                                                    </div>
                                                    <div className='col-md-1'></div>
                                                    <div className='col-md-5 p-0 pb-2' style={{height:'calc(100% - .7rem)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                    <Doughnut data={this.state.pieData} 
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: true,
                                                        legend:{
                                                            display:false,
                                                        },
                                                      }}
                                                      ></Doughnut>
                                                    {/* <Chart>
                                                        <ChartSeries>
                                                        <ChartSeriesItem type="donut" data={[ {
                                                                    "kind": "Hydroelectric", "share": 0.175
                                                                }, {
                                                                    "kind": "Nuclear", "share": 0.238
                                                                }, {
                                                                    "kind": "Coal", "share": 0.118
                                                                }, {
                                                                    "kind": "Solar", "share": 0.052
                                                                }, {
                                                                    "kind": "Wind", "share": 0.225
                                                                }, {
                                                                    "kind": "Other", "share": 0.192
                                                                } ]
                                                                } categoryField="kind" field="share">
                                                            <ChartSeriesLabels color="#fff" background="none" 
                                                            // content={labelContent} 
                                                            />
                                                        </ChartSeriesItem>
                                                        </ChartSeries>
                                                        <ChartLegend visible={false} />
                                                    </Chart> */}
 {/* <img src={chartIcon}  style={{width:'70%',height:'70%'}}/> */}
                                                    </div>
                                                    <div className='col-md-6 batch-id-dataLabel'>
                                                        <div>
                                                        <div className='batch-id-dataLabel-row1 mt-3'>
                                                            <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <div>Total Users</div>
                                                        </div>
                                                        <div className='batch-id-dataLabel-row3 mt-3'>
                                                            <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <div>Blocked Users</div>
                                                        </div>
                                                        <div className='batch-id-dataLabel-row2 mt-3'>
                                                            <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <div>Pending Approval</div>
                                                        </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 mt-2'>
                    <div className='igr-batch-id-index'>
                        <div className='igr-batch-id-Index-layout'>
                            <div className="row">
                                <div className='col-md-12 igr-batch-tab-Index-header'>
                                   <div className='igr-batch-tab'>
                                        <div onClick={()=>this.handleSwitchTabs("switch_allDocs")} className={this.state.switch_allDocs?"selected-tab":"unselected-tab"} style={{marginLeft:'1rem'}}>All Users</div>
                                        <div onClick={()=>this.handleSwitchTabs("switch_blockedUser")} className={this.state.switch_blockedUser?"selected-tab":"-tab"} style={{marginLeft:'2rem'}}>Blocked Users</div>

                                   </div>
                                </div>
                                <div className='col-md-12 mb-4 mt-4'>
                                    <div className='row table-responsive'>
                                         <table className='igr-batch-id-all-documents-table'>
                                            <tbody>
                                                <tr className='theader'>
                                                    <td>User ID</td>
                                                    <td>Email</td>
                                                    <td>Role</td>
                                                    <td>Status</td>
                                                    <td>Action</td>
                                                </tr>
                                                {/* {this.state.switch_allDocs && this.state.data.map((val,i)=><tr key={"docverification"+i} className={val.status=="Verified"?"verifiedRow":(val.status=="Missing"? "missingRow":"Blocked Users ")}>
                                                    <td className='myCursor' style={{paddingLeft:'10%'}}>{val.doumentId}</td>
                                                    <td style={{paddingLeft:'10%'}}>{val.Role}</td>
                                                    <td style={{paddingLeft:'14%'}}><BsCircleFill size={8} color={val.status=="Verified"?"#377D22":(val.status=="Missing"? "#3C638B":"#A26060")}></BsCircleFill> &nbsp; &nbsp;{val.status}</td>
                                                </tr>)}
                                                {this.state.switch_mismatched && this.state.missingDocument.map((val,i)=><tr key={"docverification"+i} className={"verifiedRow"}>
                                                    <td className='myCursor' style={{paddingLeft:'10%'}}>{val.doumentId}</td>
                                                    <td style={{paddingLeft:'10%'}}>{val.remarks}</td>
                                                    <td style={{paddingLeft:'14%'}}><BsCircleFill size={8} color={"#3C638B"}></BsCircleFill> &nbsp; &nbsp;{val.status}</td>
                                                </tr>)}
                                                
                                                {this.state.switch_blockedUser && this.state.blockedUser.map((val,i)=><tr key={"docverification"+i} className={"verifiedRow"}>
                                                    <td className='myCursor' style={{paddingLeft:'10%'}}>{val.doumentId}</td>
                                                    <td style={{paddingLeft:'10%'}}>{val.remarks}</td>
                                                    <td style={{paddingLeft:'14%'}}><BsCircleFill size={8} color={"#A26060"}></BsCircleFill> &nbsp; &nbsp;{val.status}</td>
                                                </tr>)}
                                                {this.state.switch_blockedUser && this.state.blockedUser.map((val,i)=><tr key={"docverification"+i} className={"verifiedRow"}>
                                                    <td className='myCursor' style={{paddingLeft:'10%'}}>{val.doumentId}</td>
                                                    <td style={{paddingLeft:'10%'}}>{val.remarks}</td>
                                                    <td style={{paddingLeft:'14%'}}><BsCircleFill size={8} color={"#A26060"}></BsCircleFill> &nbsp; &nbsp;{val.status}</td>
                                                </tr>)} */}
                                                
                                                    
                                                {/* {this.state.switch_blockedUser && this.state.blockedUser.map((items,indx)=><tr  className={indx%2==0?"all-users":"blocked-user"} style={{height:'4rem', background:indx%2?'rgba(55, 125, 34,0.03)':'#fff'}}>
                                                    <td className='myCursor' style={{paddingLeft:'10%'}}>{items.userId}</td>
                                                    <td style={{paddingLeft:'10%'}}>{items.email}</td>
                                                    <td style={{paddingLeft:'14%'}}><BsCircleFill size={8} color={"#A26060"}></BsCircleFill> &nbsp; &nbsp;{items.status}</td>
                                                </tr>)} */}
                                                     
                                                      

                                                        {this.state.data.length !=0 && this.state.data.map((items,indx)=><tr  className={indx%2==0?"all-users":"blocked-user"} style={{height:'4rem', background:indx%2?'rgba(55, 125, 34,0.03)':'#fff'}}>
                                                        <td onClick={()=>this.handleRoute(items._id)} className="idHighLighter" style={{fontSize:'small', textAlign:'center', verticalAlign:'middle'}} ><span>{items.userId}</span></td>
                                                        <td>{items.email}</td>
                                                        <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer',fontSize:'small', textAlign:'center', verticalAlign:'middle'}}>{items.role}</td>
                                                        <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer',fontSize:'small', textAlign:'center', verticalAlign:'middle'}}><BsCircleFill color={'#377D22'} size={8}></BsCircleFill> &nbsp;&nbsp;{items.status}</td>
                                                        <td> <Button onClick={(id)=>this.handleSwitchTabs("switch_blockedUser")} style={{display: 'block' , margin: 'auto',    cursor:'pointer', border:'1px solid #902A2C' , backgroundColor:'transparent' ,borderRadius:'12px', color:'#902A2B', fontSize:'small' , onMouseOver:"this.style.color='red'", onMouseOut:"this.style.color='green'"} }>Block</Button></td>
                                                       
                                                </tr>)} 
                                                <tr>
                                                {this.state.switch_blockedUser && this.state.data.map((items,indx)=><tr  className={"blocked-user"} style={{height:'4rem', background:indx%2?'rgba(55, 125, 34,0.03)':'#fff'}}>
                                                            <h1></h1>
                                                    </tr>)}

                                                </tr>


                                            </tbody>
                                        </table>  
                                    </div>
                                </div>
                                <div className='col-md-12 text-center'>
                                    <div style={{width:'85%'}}>
                                        <div className='row'>
                                            <PaginationBar></PaginationBar>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) =>{
    //  console.log(state)
    return {
            getAllUsers_list:state.admin.getallUsers_details
          
        }
        
}

const mapDispatchToProps =disptach=>{
    return bindActionCreators({
            getAllUsersDetails
    }, disptach)
}

export default connect(mapStateToProps,mapDispatchToProps)(IGRUser);