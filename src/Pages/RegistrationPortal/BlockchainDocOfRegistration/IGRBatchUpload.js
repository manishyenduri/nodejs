import React, { Component } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import titleIcon from '../../../Assests/icon2/term (1).svg';
import { getBatchUploadData, getSearchData, getRangeSearchData } from '../../../store/Admin/action';
import { MisPaginationBar } from '../../../Components/MisPagination'
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ModernDatepicker from 'react-modern-datepicker';
import '../../../style/components/Igr.css'


class IGRBatchUpload extends Component{

    constructor(props){
        super(props);
        this.state={
            userPerPage: 5,
            userDisplayed: [],
            search: undefined,
            item: undefined,
            startDate: undefined,
            endDate:undefined,
            values:[],
            page:1,
            size:5,
            totalData:0,
            displayEle: 5,
            seaechstate:false,
            maxDate: new Date(),
            data:[
                // {batchID:243435, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:222226, totalDoc:"30/01/2021 - 08.00 AM", verifiedDocs:"12476hkjDkasndu2763dhac9381jnoih", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:233337, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:243434, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:243135, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:123435, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                // {batchID:553435, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
            ]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handlePaginate = (currentPage) => {
      console.log(currentPage)
      if(this.state.seaechstate === false){
        this.props.getBatchUploadData(currentPage,this.state.size);
      }else{
        if(this.state.search !== undefined){
          if(this.state.startDate == undefined){
            this.props.getSearchData(this.state.search,currentPage,this.state.size)
          }
        }
        if(this.state.search == undefined){
          if(this.state.startDate !== undefined){
            this.props.getRangeSearchData(this.state.startDate,this.state.endDate,currentPage,this.state.size)
          }
        }
      }
        // const indexOfLastData = currentPage * this.state.userPerPage
        // const indexOfFirstData = indexOfLastData - this.state.userPerPage
        // const displayData = this.state.data.slice(indexOfFirstData, indexOfLastData)
        // this.setState({
        //   ...this.state,
        //   userDisplayed: displayData,
        // })
        // console.log(
        //   'index of last datta',
        //   indexOfLastData,
        //   'index of first datta',
        //   indexOfFirstData,
        //   'user per page',
        //   this.state.userPerPage,
        //   'data length',
        //   this.state.data.length,
        // )
    
        // console.log(this.state.userDisplayed, 'data', this.state.data)
      }

    componentDidMount(){
        this.props.getBatchUploadData(this.state.page,this.state.size);
        if(this.props.history.location.state == undefined){
          this.props.history.push('/')
        }
    }

    componentDidUpdate(prev){
        if(prev.batch_list !=  this.props.batch_list){
            console.log('Testing')
            if(this.props.batch_list.data.length!=0){
              console.log(this.props.batch_list)
                let temp = this.state;
                const data1=[];
                const reverseData = this.props.batch_list.data.reverse();
                for(var i=0; i<reverseData.length; i++){
                  console.log(reverseData[i])
                    var data={
                        batchID:reverseData[i].BatchId,
                        totalDoc:reverseData[i].TimeStamp,
                        verifiedDocs:reverseData[i].txId,
                        missmatchedDocs:reverseData[i].Status
                       
                    }
                    data1.push(data);
                    temp.values.push(data);
                }
                console.log(data1)
                temp.data=data1
                temp.userDisplayed = this.state.data.slice(0, this.state.displayEle)
                temp.totalData = this.props.batch_list.totaldoc
                console.log(temp);
                this.setState(temp)
                console.log(this.state)

                // console.log(temp);
                // this.setState(temp);
            }
        }
        if(prev.search_data !=  this.props.search_data){
          console.log('Testing')
            if(this.props.search_data.data.length!=0){
              console.log(this.props.search_data)
                let temp = this.state;
                const data1=[];
                const reverseData = this.props.search_data.data.reverse();
                for(var i=0; i<reverseData.length; i++){
                  console.log('data1')
                    var data={
                        batchID:reverseData[i].BatchId,
                        totalDoc:reverseData[i].TimeStamp,
                        verifiedDocs:reverseData[i].txId,
                        missmatchedDocs:reverseData[i].Status
                       
                    }
                    data1.push(data);
                    temp.values.push(data);
                    console.log('data1')
                }
                console.log(data1)
                console.log('data1')
                temp.data=data1
                temp.userDisplayed = this.state.data.slice(0, this.state.displayEle)
                temp.totalData = this.props.search_data.totaldoc
                console.log(temp);
                this.setState(temp)
                console.log(this.state)
              }
        }
        
    }

    handleRoute(id){
        // this.props.history.push(`/batch-id/${id}`)
        this.props.history.push({
          pathname: `/igr-batch-upload/document/${id}`,
          state: {
            batch_Id: id}
        })
    }

    redirectPageReg = () => {
        console.log(this.props);
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
      }

      keyPress = (e) => {
        console.log(e.target.value)
        console.log(this.props.getAllUsers_list);
        if(e.key === "Enter"){
          if(this.state.seaechstate == false ){
            this.setState({
              size:e.target.value,
              displayEle:e.target.value
            })
            this.props.getBatchUploadData(this.state.page,e.target.value);
          }else{
            this.setState({
              size:e.target.value,
              displayEle:e.target.value
            })
            if(this.state.search !== undefined){
              if(this.state.startDate == undefined){
                this.props.getSearchData(this.state.search,this.state.page,e.target.value);
              }
            }
            if(this.state.search == undefined){
              if(this.state.startDate !== undefined){
                this.props.getRangeSearchData(this.state.startDate,this.state.endDate,this.state.page,e.target.value)
              }
            }
          }
        // this.setState({
        //   item: e.target.value, 
        //   itemstate:false,
        //   userDisplayed: this.state.data.splice(0,e.target.value),
        //   userPerPage:e.target.value
        // })
      }
      }

      handleChange=(e)=>{
        const {name, value} = e.target;
        this.setState({...this.state,[name]:value})
        
    }
    
    handleSerach = () => {
      this.setState({
        seaechstate:true,
      })

      if(this.state.search !== undefined){
        if(this.state.startDate == undefined){
          this.props.getSearchData(this.state.search,this.state.page,this.state.size)
        }
      }
      if(this.state.search == undefined){
        if(this.state.startDate !== undefined){
          this.props.getRangeSearchData(this.state.startDate,this.state.endDate,this.state.page,this.state.size)
        }
      }


      // var data=undefined;
      // const data1=[];
      // let temp = this.state;
      
      // for(var i=0;i<this.state.values.length;i++){
      //   var date = undefined;
      //   date= this.state.values[i].totalDoc.split(' ')
      //   this.state.values[i].Date = date[0]
      //   console.log(this.state.startDate)
      //   console.log(this.state.values[i].Date)
      //   console.log(this.state.endDate)
      //   if(this.state.search == undefined){
      //     if(this.state.startDate !== undefined){
      //       if(this.state.startDate <= this.state.values[i].Date && this.state.values[i].Date <= this.state.endDate ){
      //         console.log('data')
      //         data1.push(this.state.values[i])
      //       }
      //     }
      //   }
      //   if(this.state.search !== undefined){
      //     if(this.state.startDate == undefined){
      //       data=this.state.values[i].batchID.includes(this.state.search)
      //       console.log(data)
      //       if(data == true){
      //         data1.push(this.state.values[i])
              
      //           console.log(data1)
      //       }
      //     }
      //   }
      //   if(this.state.search !== undefined){
      //     if(this.state.startDate !== undefined){
      //       const DataValue = [];
      //         data=this.state.values[i].batchID.includes(this.state.search)
      //         console.log(data)
      //         if(data == true){
      //           if(this.state.startDate <= this.state.values[i].Date && this.state.values[i].Date <= this.state.endDate ){
      //             console.log('data')
      //             data1.push(this.state.values[i])
      //           }
      //         }
      //     }
      //   }
      // }
      // console.log(data1)
      // console.log(data1.length)
      // temp.data = data1
      // temp.userDisplayed = this.state.data.slice(0, 5)
      // this.setState(temp)
    }

    handleChanges(date) {
      this.setState({
        startDate: date,
      });
    }
    handleEndChanges(date) {
      this.setState({
        endDate: date,
      });
    }
    
    render(){
        console.log(this.state);
        console.log(this.props);
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
                    style={{padding:'10px',fontWeight:'bold',color:'#377D22',cursor:'pointer'}}
                  >
                    Daily Upload Batch
                  </Link>
                  
                </Breadcrumbs>
                <div className='batchVerification-Index'>
                    
                    <div  className='batchVerification-Index-layout'>
                        <div className='inner-batchVerification-Index-layout'>
                            <div className='row'>
                                <div className='col-md-12 title-row'>
                                    <img src={titleIcon} /> &nbsp;&nbsp; <span>Daily Upload Batch</span>
                                    <div style={{display:'flex'}} id="flexbox">
                                      <input placeholder="search" id="searchBar" name="search" onChange={this.handleChange} style={{backgroundColor:'#fdfdfd',padding:'5px'}}/>
                                      <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.startDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleChanges(date)} placeholder={'yy-mm-dd'}/></div>
                                      <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.endDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleEndChanges(date)} placeholder={'yy-mm-dd'}/></div>
                                      {/* <DatePicker selected={this.state.startDate} format="dd-mm-yy" onChange={(date) => this.startDates(date)} />
                                      <DatePicker selected={this.state.endDate} onChange={(date) => this.endDates(date)} />                                  */}
                                      <button onClick={this.handleSerach} id="searchbutton">Search</button>
                                    </div>
                                </div>
                                <div className='col-md-12 mt-3 table-responsive body-row'>
                                    <table>
                                    <tbody>
                                        <tr className='batch-table-header'>
                                                <td>Batch ID</td>
                                                <td>Time Stamp</td>
                                                <td>Transaction ID</td>
                                                <td>Status</td>
                                        </tr>
                                        {/* {this.state.data.length!=0 && this.state.data.map((items,indx)=><tr className={indx%2==0?"batch-table-body1":"batch-table-body2"}>
                                                <td onClick={()=>this.handleRoute(items.batchID)} className="idHighLighter" ><span>{items.batchID}</span></td>
                                                <td>{items.totalDoc}</td>
                                                <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer'}}>{items.verifiedDocs}</td>
                                                <td><BsCircleFill color={'#377D22'} size={8}></BsCircleFill> &nbsp;&nbsp;{items.missmatchedDocs}</td>
                                        </tr>)} */}

                                            {this.state.userDisplayed.length != 0 &&
                                                this.state.userDisplayed.map((items, indx) => (
                                                    <tr
                                                    className={
                                                        indx % 2 == 0
                                                        ? 'batch-table-body1'
                                                        : 'batch-table-body2'
                                                    }
                                                    key={items.BatchId}
                                                    style={{
                                                        height: '4rem',
                                                        background:
                                                        indx % 2
                                                            ? 'rgba(55, 125, 34,0.03)'
                                                            : '#fff',
                                                    }}
                                                    >
                                                    <td
                                                        onClick={() =>
                                                        this.handleRoute(items.batchID)
                                                        }
                                                        className="idHighLighter"
                                                        style={{
                                                        fontSize: 'small',
                                                        textAlign: 'center',
                                                        verticalAlign: 'middle',
                                                        cursor: 'pointer',
                                                        }}
                                                    >
                                                        <span>{items.batchID.slice(0, 15)+'...'}</span>
                                                    </td>
                                                    <td
                                                        style={{
                                                        fontSize: 'small',
                                                        textAlign: 'center',
                                                        verticalAlign: 'middle',
                                                        }}
                                                    >
                                                        {items.totalDoc}
                                                    </td>
                                                    <td
                                                        style={{
                                                        fontSize: 'small',
                                                        textAlign: 'center',
                                                        verticalAlign: 'middle',
                                                        }}
                                                    >
                                                        {items.verifiedDocs.slice(0, 15)+'...'}
                                                    </td>
                                                    <td
                                                        style={{
                                                        fontSize: 'small',
                                                        textAlign: 'center',
                                                        verticalAlign: 'middle',
                                                        }}
                                                    >
                                                        {' '}
                                                        &nbsp;&nbsp;{items.missmatchedDocs}
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
                                      <div style={{ width: '100%',marginLeft:'-4%'}}>
                                        <div className="row">
                                          <div style={{display: 'flex',}}>
                                            <div style={{display:'flex'}}>
                                              <input  onKeyPress={(e) => this.keyPress(e)} style={{width:'40px',height:'20px'}}/><p style={{fontSize:'12px',fontWeight:'bold',marginLeft:'5px'}}>item per page</p>
                                            </div>
                                            <MisPaginationBar
                                              elementsPerPage={this.state.size}
                                              totalElelemt={this.state.totalData}
                                              onPaginationChange={this.handlePaginate}
                                            ></MisPaginationBar>
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
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state)
    return {
        batch_list:state.admin.batch_upoad_list,
        Role: state.login.otp_verify.user.role,
        Zone: state.login.otp_verify.user.Zone,
        search_data:state.admin.getr_searchData,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getBatchUploadData,getSearchData, getRangeSearchData}
        ,dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(IGRBatchUpload);
// export default IGRBatchUpload;

