import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import durationIcon from '../../../Assests/icon2/term (1).svg'
import chartIcon from '../../../Assests/icon/Component 91.svg'
import { BsCircleFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { MisPaginationBar } from '../../../Components/MisPagination'
import { misReport, sendDataToRedux, getRangeSearchDataIng, getSearchDataIng  } from '../../../store/Admin/action'
import BatchVerificationById from '../verificationById/BatchVerificationById'
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import back from "../../../Assests/icon/png-transparent.png"
import { data } from 'jquery'
import ModernDatepicker from 'react-modern-datepicker';
import '../../../style/components/Igr.css'

class MsiReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPerPage: 5,
      userDisplayed: [],
      switch_allDocs: true,
      navigate: false,
      rowData: [],
      batchId: '',
      search: undefined,
      item: undefined,
      startDate: undefined,
      values:[],
      endDate:undefined,
      page: 1,
      size: 5,
      totalData: undefined,
      displayEle: 5,
      seaechstate:false,
      maxDate: new Date(),
      data: [
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Missing', status:'Missing'},
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Seller Name In Document Index Mismatched', status:'Mismatched'},
        // {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Purchaser Name In Document Index Mismatched', status:'Mismatched'},
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Survey Number In Document Index Mismatched', status:'Mismatched'},
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'},
        // {doumentId:'R/Adayar/Book1/1607/2021', remarks:'Document Verified Successfully', status:'Verified'}
      ],

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
      // missmatchedDocuments:[
      //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Seller Name In Document Index Mismatched', status:'Mismatched'},
      //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Purchaser Name In Document Index Mismatched', status:'Mismatched'},
      //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Survey Number In Document Index Mismatched', status:'Mismatched'},
      //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Extend In Document Index Mismatched', status:'Mismatched'},
      //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Survey Number In Document Index Mismatched', status:'Mismatched'},
      //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Plot Number in Document Index Mismatched', status:'Mismatched'},
      //     {doumentId:'R/Kodambakkam/Book1/1607/2021', remarks:'Purchaser Name In Document Index Mismatched', status:'Mismatched'}
      // ]
    }
  }

  componentDidMount() {
    
    // if(this.props.history.location.state == undefined){
    //   this.props.history.push('/')
    // }
    console.log(localStorage)
    this.props.misReport(this.state.page,this.state.size)
  }

  componentDidUpdate(prev) {
    if (prev.getMisRep_list != this.props.getMisRep_list) {
      if (this.props.getMisRep_list.data.length != 0) {
        let temp = this.state
        const data1=[];
        const reverseData =this.props.getMisRep_list.data.reverse();
        for (var i = 0; i < reverseData.length; i++) {
          console.log(reverseData)
          var data = {
            BatchId:reverseData[i].BatchId,
            MissedDocuments: reverseData[i].MismatchedDocs,
            MissingDocuments: reverseData[i].MissingDocs,
            VerifiedDocs: reverseData[i].VerifiedDocs,
            TotalDocuments:reverseData[i].TotalDocuments,
            Timestamp:reverseData[i].TimeStamp,
          }
          // console.log("data",getMisRep_list);
          data1.push(data)
          temp.values.push(data)
        }
        temp.data=data1      
        temp.userDisplayed = this.state.data.slice(0, this.state.displayEle)
        temp.totalData = this.props.getMisRep_list.totaldoc
        this.setState(temp)
        console.log(this.state)
      }
    }
    if(prev.search_dataIntg !=  this.props.search_dataIntg){
      console.log('Testing')
      if(this.props.search_dataIntg.data.length!=0){
          console.log(this.props.search_dataIntg)
            let temp = this.state;
            const data1=[];
            const reverseData = this.props.search_dataIntg.data.reverse();
            for(var i=0; i<reverseData.length; i++){
              console.log(reverseData)
              var data = {
                BatchId:reverseData[i].BatchId,
                MissedDocuments: reverseData[i].MismatchedDocs,
                MissingDocuments: reverseData[i].MissingDocs,
                VerifiedDocs: reverseData[i].VerifiedDocs,
                TotalDocuments:reverseData[i].TotalDocuments,
                Timestamp:reverseData[i].TimeStamp,
              }
                data1.push(data);
                temp.values.push(data);
                console.log('data1')
            }
            console.log(data1)
            console.log('data1')
            temp.data=data1
            temp.userDisplayed = this.state.data.slice(0, this.state.displayEle)
            temp.totalData = this.props.search_dataIntg.totaldoc
            console.log(temp);
            this.setState(temp)
            console.log(this.state)
      }
    }
    

    console.log(prev);

    // if(){
    //     console.log(this.state)
    //     this.setState({...this.state,navigate:!this.state.navigate})
    // }
  }

  handleRoute(id, items) {
    this.setState({
      ...this.state,
      batchId: id,
      rowData: [
        parseInt(items.TotalDocuments),
        parseInt(items.VerifiedDocs),
        parseInt(items.MissedDocuments),
      ],
      navigate: !this.state.navigate,
    })

    // const data = {
    //     status:'render',
    //     data:items
    // }
    // this.props.sendDataToRedux(data);
    // this.props.history.push(`/admin/misreport/batchverification/${id}`)
    // this.props.history.push(`/igr-batch-verification/uploaded-document/${id}`)

    // this.props.history.push(`/igr-batch-upload/document/${id}`)
  }

  handlePaginate = (currentPage) => {
    console.log(currentPage)
    if(this.state.seaechstate === false){
      this.props.misReport(currentPage,this.state.size);
    }else{
      if(this.state.search !== undefined){
        if(this.state.startDate == undefined){
          this.props.getSearchDataIng(this.state.search,currentPage,this.state.size)
        }
      }
      if(this.state.search == undefined){
        if(this.state.startDate !== undefined){
          this.props.getRangeSearchDataIng(this.state.startDate,this.state.endDate,currentPage,this.state.size)
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

  redirectPageReg = () => {
    console.log(this.props.Role);
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

  keyPress = (e) => {
    console.log(e.target.value)
    console.log(this.props.getAllUsers_list);
    if(e.key === "Enter"){
      if(this.state.seaechstate == false ){
        this.setState({
          size:e.target.value,
          displayEle:e.target.value
        })
        this.props.misReport(this.state.page,e.target.value);
      }else{
        this.setState({
          size:e.target.value,
          displayEle:e.target.value
        })
        if(this.state.search !== undefined){
          if(this.state.startDate == undefined){
            this.props.getSearchDataIng(this.state.search,this.state.page,e.target.value);
          }
        }
        if(this.state.search == undefined){
          if(this.state.startDate !== undefined){
            this.props.getRangeSearchDataIng(this.state.startDate,this.state.endDate,this.state.page,e.target.value)
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
      this.props.getSearchDataIng(this.state.search,this.state.page,this.state.size)
    }
  }
  if(this.state.search == undefined){
    if(this.state.startDate !== undefined){
      this.props.getRangeSearchDataIng(this.state.startDate,this.state.endDate,this.state.page,this.state.size)
    }
  }
  // var data=undefined;
  // const data1=[];
  // let temp = this.state;
  
  // for(var i=0;i<this.state.values.length;i++){
  //   var date = undefined;
  //   date= this.state.values[i].Timestamp.split(' ')
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
  //       data=this.state.values[i].BatchId.includes(this.state.search)
  //       console.log('data1')
  //       if(data == true){
  //         data1.push(this.state.values[i])
  //       }
  //     }
  //   }
  //   if(this.state.search !== undefined){
  //     if(this.state.startDate !== undefined){
  //       const DataValue = [];
  //         data=this.state.values[i].BatchId.includes(this.state.search)
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

  render() {
    console.log('state value',this.state);
    console.log('props value',this.props);
    
    return (
      <div style={{overflowY:'scroll',height:'600px',width:'101%',overflowX:'hidden'}}>
      <>

        <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'3%',width: '84%',height: '41px',borderRadius: '5px'}}>
                {this.state.navigate &&
                  <Link
                    color="inherit"
                    onClick={() => window.location.reload()}
                    style={{padding:'10px',fontWeight:'bold',cursor:'pointer'}}
                  >
                    <img src={back} style={{width:'28px',height:'30px'}}/>
                  </Link>
                  }
                  <Link
                    color="inherit"
                    onClick={() => this.redirectPageReg()}
                    style={{padding:'10px',fontWeight:'bold',cursor:'pointer'}}
                  >
                    Registration Portal
                  </Link>
                  <Link
                    color="inherit"
                    style={{padding:'10px',fontWeight:'bold',color:'#377D22',cursor:'pointer'}}
                  >
                     Integrity Report
                  </Link>
                  
                </Breadcrumbs>
        {this.state.navigate ? (
          <BatchVerificationById
  history={this.props.history}
            mydata={this.state.rowData}
            batchId={this.state.batchId}
          ></BatchVerificationById>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <div className="igr-batch-id-index">
                <div className="igr-batch-id-Index-layout">
                  <div className="row">
                    <div className="col-md-12 igr-batch-id-Idnex-header" style={{height:'55px'}}>
                      <img src={durationIcon} /> &nbsp; &nbsp;
                      <span style={{width:'30%'}}>Integrity Report </span>
                      <input placeholder="search" id="searchBar" name="search" onChange={this.handleChange} style={{backgroundColor:'#fdfdfd',padding:'10px'}} />
                      
                      <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.startDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleChanges(date)} placeholder={'YY-MM-DD'}/></div>
                                      <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.endDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleEndChanges(date)} placeholder={'YY-MM-DD'}/></div>
                      <button onClick={this.handleSerach} id="searchbutton">Search</button>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="row">
                        <div className="col-md-7"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-2">
              <div className="igr-batch-id-index">
                <div className="igr-batch-id-Index-layout">
                  <div className="row">
                    <div className="igr-batch-tab-Index-header">
                      {/* <div style={{display:'flex'}}>
                      <input placeholder="search" id="searchBar" name="search" onChange={this.handleChange} />
                      
                      <div style={{marginLeft:'10px'}}><ModernDatepicker date={this.state.startDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleChanges(date)} placeholder={'yy-mm-dd'}/></div>
                                      <div style={{marginLeft:'10px'}}><ModernDatepicker date={this.state.endDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleEndChanges(date)} placeholder={'yy-mm-dd'}/></div>
                      <button onClick={this.handleSerach} id="searchbutton">Search</button>
                      </div> */}
                      </div>
                    <div className="col-md-12 mb-4 mt-4">
                      <div className="row table-responsive">
                        <table className="igr-batch-id-all-documents-table">
                          <tbody>
                            <tr className="theader">
                              <td>Batch ID</td>
                              <td>Total Documents</td>
                              <td style={{width:'100px'}}>Timestamp</td>
                              <td>Verified Documents</td>
                              <td>Mismatched Documents</td>
                              <td>Missing Documents</td>
                            </tr>
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
                                      this.handleRoute(items.BatchId, items)
                                    }
                                    className="idHighLighter"
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <span>{items.BatchId.slice(0, 10)+'...'}</span>
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    {items.TotalDocuments}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                      width:'100px'
                                    }}
                                  >
                                    {items.Timestamp}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    {items.VerifiedDocs}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    {' '}
                                    &nbsp;&nbsp;{items.MissedDocuments}
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    {' '}
                                    &nbsp;&nbsp;0
                                  </td>
                                </tr>
                              ))}

                            {/* {this.state.data.map((items,indx)=><tr className={indx%2==0?"batch-table-body1":"batch-table-body2"}>
                                        <td  onClick={()=>this.handleRoute(items.Batch)} className="idHighLighter"><span>{items.BatchId}</span></td>
                                        <td>{items.totalDoc}</td>
                                        <td>{items.verifiedDocs}</td>
                                        <td>{items.missmatchedDocs}</td>
                                        <td>{items.missingDocs}</td>
                                   </tr>)} */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-md-12 text-center mb-4">
                      <div style={{ width: '85%' }}>
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
        )}
      </>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    getMisRep_list: state.admin.getMis_report,
    Role: state.login.otp_verify.user.role,
    Zone: state.login.otp_verify.user.Zone,
    search_dataIntg:state.admin.getr_searchDataIng
  }
}

const mapDispatchToProps = (disptach) => {
  return bindActionCreators(
    {
      misReport,
      sendDataToRedux,
      getSearchDataIng,
      getRangeSearchDataIng,
    },
    disptach,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MsiReport)
