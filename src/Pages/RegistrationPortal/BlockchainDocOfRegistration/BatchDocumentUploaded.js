import React, {Component} from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import titleIcon from '../../../Assests/icon2/term (1).svg';
import { MisPaginationBar } from '../../../Components/MisPagination'
import {getBatchUploadDataByID} from '../../../store/Admin/action';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ReactTooltip from "react-tooltip";
import grp115 from '../../../Assests/icon/Group 1115 (1).png'


class BatchDocumentUploaded extends Component{
  
    constructor(props){
        super(props);
        this.state={
            userPerPage: 5,
            userDisplayed: [],
            blockchain:'',
            timestamp: '',
            status:' ',
            batch_id: '',
            item: undefined,
            search: undefined,
            valuesdata:[],
            data:[
                // {batchID:"", totalDoc:"", verifiedDocs:"", missmatchedDocs:""},
                // {batchID:"R/Anna Nagar/Book1/1345/2021", totalDoc:"30/01/2021 - 08.00 AM", verifiedDocs:"12476hkjDkasndu2763dhac9381jnoih", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:"R/Amnjikarai/Book1/1745/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:"R/Ambattur/Book1/1235/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:"R/Kodambakkam/Book1/3563/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:"R/Aynavaram/Book1/1357/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:"R/Arumbakkam/Book1/1473/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
            ]
        }
    }
    componentDidMount(){
      // console.log(this.props)
        this.props.getBatchUploadDataByID(this.props.match.params.id);
        this.setState({
          batch_id: this.props.location.state.batch_Id,
        })
    }
    componentDidUpdate(prev){
        if(prev.batch_list_by_id!=this.props.batch_list_by_id){
            if(this.props.batch_list_by_id.status==true){
                var temp = this.state;

                for(var i =0; i<this.props.batch_list_by_id.data.ApiResponse.length; i++){
                  console.log(this.props.batch_list_by_id.data);
                    let myJson={batchID:"", totalDoc:"", docHash:[] , verifiedDocs:[], missmatchedDocs:""};
                    myJson.batchID=this.props.batch_list_by_id.data._id;
                    myJson.missmatchedDocs=this.props.batch_list_by_id.data.Status=="true"?'Added to BlockChain':'Added to BlockChain'
                    myJson.totalDoc=this.props.batch_list_by_id.data.ApiResponse[i].data.timestamp;
                    myJson.document= this.props.batch_list_by_id.data.ApiResponse[0].data.HashData
                    // for(var k=0; k<this.props.batch_list_by_id.data.ApiResponse[i].data.HashData.length;k++){
                        
                    //     myJson.verifiedDocs.push({bId:this.props.batch_list_by_id.data.ApiResponse[i].data.HashData[k].BlockchainID})
                    // }
                    // for(var k=0; k<this.props.batch_list_by_id.data.ApiResponse[i].data.HashData.length;k++){
                        
                    //     myJson.docHash.push({dochas:this.props.batch_list_by_id.data.ApiResponse[i].data.HashData[k].DocHash})
                    // }
                    console.log(myJson);
                    temp.blockchain = myJson.batchID ;
                    temp.timestamp = myJson.totalDoc.split(' ');
                    temp.status = myJson.missmatchedDocs;
                    temp.data.push(myJson)
                    temp.valuesdata.push(myJson)
                }
                // // temp.data[0].batchID=this.props.batch_list_by_id.data._id
                // temp.data[0].totalDoc=this.props.batch_list_by_id.data.txId;
                // temp.data[0].verifiedDocs=this.props.batch_list_by_id.data.TimeStamp;
                // temp.data[0].missmatchedDocs=this.props.batch_list_by_id.data.Status=="true"?'Added to Bloockchain':'Not Added to Bloockchain';
                temp.userDisplayed = this.state.data[0].document.slice(0, 5)
                temp.documentLength = this.state.data[0].document.length
                temp.lengthDisplay = this.state.data[0].docHash.length
                
                this.setState(temp)
                // console.log(this.state)
                // this.setState(temp);
            }
        }
    }

    handlePaginate = (currentPage) => {
        const indexOfLastData = currentPage * this.state.userPerPage
        const indexOfFirstData = indexOfLastData - this.state.userPerPage
        const displayData = this.state.data[0].document.slice(indexOfFirstData, indexOfLastData)
        this.setState({
          ...this.state,
          userDisplayed: displayData,
        })
      }

      redirectPageReg = () => {
        // console.log(this.props);
        if(this.props.Role === "DIG")
        {
          this.props.history.push({
            pathname: '/registration-dashboard3',
            state: {
              zone: this.props.Zone,
            },
          })
        }
        if(this.props.Role === "DRO")
        {
          this.props.history.push({
            pathname: '/registration-dashboard2',
            state: {
              zone: this.props.Zone,
            },
          })
        }
        if(this.props.Role === "SRO")
        {
          this.props.history.push({
            pathname: '/registration-dashboard4',
            state: {
              zone: this.props.Zone,
            },
          })
        }
        if(this.props.Role === "admin")
        {
          this.props.history.push({
            pathname: '/registration-dashboard',
            state: {
              zone: this.props.Zone,
            },
          })
        }
        if(this.props.Role === "IGR")
        {
          this.props.history.push({
            pathname: '/registration-dashboard',
            state: {
              zone: this.props.Zone,
            },
          })
        }
      }

      pageRedirection = ( data) => {
        // console.log(data);
        
        const Value = data.split(":");
        this.props.history.push({
          pathname: '/3-step-document-verification',
          state: {
            sro: Value[1],
            book:Value[2],
            documentId: Value[3],
            year: Value[4],
            datastatus: "Verified",
            dataset:data
          },
        })
      }


      keyPress = (e) => {
        console.log(e.target.value)
        console.log(this.props.getAllUsers_list);
        if(e.key === "Enter"){
        this.setState({
          item: e.target.value, 
          itemstate:false,
          userDisplayed: this.state.data[0].document.slice(0,e.target.value),
          userPerPage:e.target.value
        })
      }
      }

      handleChange=(e)=>{
        const {name, value} = e.target;
        this.setState({...this.state,[name]:value})
        
    }

    handleSerach = () => {
      var data=undefined;
      const data1=[];
      let temp = this.state;
      for(var i=0;i<this.state.valuesdata[0].document.length;i++){
          data=this.state.valuesdata[0].document[i].BlockchainID.includes(this.state.search)
        
        console.log(data)
        if(data == true){
          data1.push(this.state.valuesdata[0].document[i])
        }
      }
      console.log(data1)
      temp.data[0].document = data1
      temp.userDisplayed = data1.slice(0, 5)
      temp.datalength = data1.length
      this.setState(temp)
    }
    render(){
      console.log(this.state);
        return (
          <div style={{overflowY:'scroll',height:'600px',width:'101%',overflowX:'hidden'}}>
          <div>
             <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'3%',width: '84%',height: '41px',borderRadius: '5px'}}>
                  <Link
                    color="inherit"
                    style={{padding:'10px',fontWeight:'bold',cursor:'pointer'}}
                    onClick={() => this.redirectPageReg()}
                  >
                    Registration Portal
                  </Link>
                  <Link
                    color="inherit"
                    style={{padding:'10px',fontWeight:'bold',cursor:'pointer'}}
                    onClick={() => this.props.history.push({pathname:'/igr-batch-upload',state:{data:'Login'}})}
                  >
                    Daily Upload Batch
                  </Link>
                  <Link
                    color="inherit"
                    style={{padding:'10px',fontWeight:'bold',color:'#377D22',cursor:'pointer'}}
                  >
                    Daily Upload Document
                  </Link>
                  
                </Breadcrumbs>
                <div style={{backgroundColor:'white',marginLeft:'50px',width:'93%',height:'186px',boxShadow:'0px 3px 6px #00000029',borderRadius:'5px',opacity:'1'}}>
                  <div className="row">
                    <div style={{display:'flex',borderBottom:'2px solid #00000029',width:'97%',marginLeft:'20px'}}>
                      <img src={grp115} style={{width:'65px'}}/>
                      <p style={{fontWeight:'500',marginTop:'20px',fontSize:'15px'}}>Batch ID : <span>{this.state.batch_id}</span></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <center>
                        <p style={{color:'#377D22',marginTop:'8%',fontWeight:'500',fontSize:'15px'}}>Blockchain ID : <span style={{color:'black',fontSize:'15px',fontWeight:"500"}}> {this.state.blockchain}</span></p>
                      </center>
                    </div>
                    <div className="col-md-4">
                      <center>
                        <p style={{color:'#377D22',marginTop:'8%',fontWeight:'500',fontSize:'15px'}}>Time Stamp : <span style={{color:'black',fontSize:'15px',fontWeight:'500'}}>{this.state.timestamp[0]} {this.state.timestamp[1]}</span></p>
                      </center>
                    </div>
                    <div className="col-md-4">
                      <center>
                        <p style={{color:'#377D22',marginTop:'8%',fontWeight:'500',fontSize:'15px'}}>Status : <span style={{color:'black',fontSize:'15px',fontWeight:'500'}}>{this.state.status}</span></p>
                      </center>
                    </div>
                  </div>
                </div>
            <div className='batchVerification-Index'>
                <div  className='batchVerification-Index-layout'>
                    <div className='inner-batchVerification-Index-layout'>
                        <div className='row'>
                            <div className='col-md-12 title-row'>
                                <img src = {titleIcon} /> &nbsp;&nbsp; <span>Daily Uploaded Document</span>
                            </div>
                            <div className='col-md-12'>
                              <div className="col-md-6 offset-md-6" style={{display:'flex'}} id="searching">
                                <input placeholder="search" id="searchBar1" name="search" onChange={this.handleChange} style={{backgroundColor:'#fdfdfd'}}/>
                                {/* <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.startDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleChanges(date)} placeholder={'yy-mm-dd'}/></div>
                                <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.endDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleEndChanges(date)} placeholder={'yy-mm-dd'}/></div> */}
                                <button onClick={this.handleSerach} id="searchbutton">Search</button>
                              </div>
                            </div>
                            <div className='col-md-12 mt-3 table-responsive body-row'>
                                <table>
                                  <tbody>
                                      <tr className='batch-table-header'>
                                            <td>Document Number</td>
                                            <td>Document Hash</td>
                                      </tr>

                                      
                                      {/* {this.state.data.length!=0 && this.state.data.map((items,indx)=><tr className={indx%2==0?"batch-table-body1":"batch-table-body2"}>
                                            <td className="myCursor" style={{textAlign:'left', paddingLeft:'1.5rem'}}>{items.batchID}</td>
                                            <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer'}}>
                                                {items.verifiedDocs.length!=0 && items.verifiedDocs.map((val,ind)=><div key={"uploadid"+ind}><span className='text-secondary'>BID :</span> {val.bId}  </div>)}
                        
                                                </td>
                                                <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer'}}>
                                                {items.verifiedDocs.length!=0 && items.docHash.map((val,ind)=><div key={"uploadid"+ind}><span className='text-secondary'></span> {val.dochas} </div>)}
                        
                                                </td>
                                            <td>{items.totalDoc}</td>
                                            
                                            <td><BsCircleFill color={'#377D22'} size={8}></BsCircleFill> &nbsp;&nbsp;{items.missmatchedDocs}</td>
                                      </tr>)} */}

                                {this.state.userDisplayed.length !== 0 &&
                                  this.state.userDisplayed.map((items, indx) => (
                                    <tr
                                      className={
                                        indx % 2 === 0
                                          ? 'batch-table-body1'
                                          : 'batch-table-body2'
                                      }
                                      key={items.BatchId}
                                       
                                    >
                                      <td
                                      
                                        className="idHighLighter"
                                        style={{
                                          fontSize: 'small',
                                          textAlign: 'center',
                                          verticalAlign: 'middle',
                                          cursor: 'pointer',
                                          width:'50%'
                                        }}
                                      >
                                          {/* {items.verifiedDocs.length!==0 && items.verifiedDocs.map((val,ind)=> */}
                                          <div style={{
                                            height:'50px',
                                            paddingTop: '2%',
                                            fontSize:'15px',
                                            background:
                                              indx % 2 ? 'rgba(55, 125, 34,0.03)' : '#fff',
                                          }}><a onClick={() => this.pageRedirection(items.BlockchainID)}>{items.BlockchainID.replace(/:/g, '/')}</a></div>
                                          {/* )} */}
                                      </td>
                                      
                                      <td
                                        style={{
                                          fontSize: '12px',
                                          textAlign: 'center',
                                          verticalAlign: 'middle',
                                        }}
                                      >

                                        {/* {items.verifiedDocs.length!==0 && items.docHash.map((val,ind) =>
                                        // <div>{val.dochas.slice(0, 15)+'...'} </div>
                                          <> */}
                                        <div data-tip data-for="registerTip"  style={{
                                            height:'50px',
                                            paddingTop: '2%',
                                            background:
                                              indx % 2 ? 'rgba(55, 125, 34,0.03)' : '#fff',
                                          }} >{items.DocHash}</div>
                                        {/* <ReactTooltip  id="registerTip" place="top" effect="solid">
                                        {val.dochas}
                                        </ReactTooltip> */}
                                        {/* </>
                                        
                                        )} */}
                                      
                                        {/* {items.verifiedDocs.length!==0 && items.docHash.map((val,ind)=><div key={"uploadid"+ind} ><span className='text-secondary'></span> {val.dochas.slice(0, 15)+'...'} </div>)} */}
                                      </td>
                                      
                                    </tr>
                                  ))}

                                      
                                  </tbody>
                                </table>
                            </div>
                            <div className='col-md-12 mt-5 mb-4 batch-verification-end-row'>
                                <div className='batch-dataNumber'>
                                    {/* <div className='batch-page-data-count'>7</div>
                                    &nbsp; &nbsp;
                                    <label>Items Per Page</label> */}
                                </div>
                                <div className="col-md-12 text-center">
                                      <div style={{ width: '100%' }}>
                                        <div className="row">
                                          <div style={{display: 'flex',}}>
                                            <div style={{display:'flex'}}><input  onKeyPress={(e) => this.keyPress(e)} style={{width:'40px',height:'20px'}}/><p style={{fontSize:'12px',fontWeight:'bold',marginLeft:'5px'}}> 5 item per page</p>
                                            </div>
                                            <MisPaginationBar
                                              elementsPerPage={this.state.userPerPage}
                                              totalElelemt={this.state.documentLength}
                                              onPaginationChange={this.handlePaginate}
                                            ></MisPaginationBar>
                                          </div>
                                        </div>
                                    {/* <div className='batch-pagenumber'>
                                        <div className='batch-paggination' style={{marginTop:'-8%'}}>
                                          <div className="row">
                                        <div style={{display: 'flex',}}>
                                      <div style={{display:'flex'}}>
                                        <input  onKeyPress={(e) => this.keyPress(e)} style={{width:'40px',height:'20px'}}/><p style={{fontSize:'12px',fontWeight:'bold',marginLeft:'5px'}}>item per page</p>
                                      </div>
                                        <MisPaginationBar
                                            elementsPerPage={this.state.userPerPage}
                                            totalElelemt={this.state.data.length}
                                            onPaginationChange={this.handlePaginate}
                                        ></MisPaginationBar>
                                        </div>
                                        </div>
                                            {/* <AiFillStepBackward style={{width:'3rem',cursor:'pointer'}}></AiFillStepBackward>
                                            <label className='active'>1</label> &nbsp;&nbsp;
                                            <label>2</label>
                                            <label>3</label>
                                            <label>4</label>
                                            <label>5</label>
                                            <label>6</label>
                                            <label>7</label>
                                            <label>8</label>
                                            <label>9</label>
                                            <AiFillStepForward style={{cursor:'pointer'}}></AiFillStepForward> */}
                                        </div>
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

// export {BatchDocumentUploaded};

const mapStateToProps=(state)=>{
    console.log(state)
    return {
        batch_list_by_id:state.admin.batch_upload_list_by_id,
        Role: state.login.otp_verify.user.role,
        Zone: state.login.otp_verify.user.Zone,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getBatchUploadDataByID}
        ,dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(BatchDocumentUploaded);