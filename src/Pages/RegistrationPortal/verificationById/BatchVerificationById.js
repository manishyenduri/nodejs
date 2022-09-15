import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import durationIcon from '../../../Assests/icon2/term (1).svg'
import chartIcon from '../../../Assests/icon/Component 91.svg'
import { BsCircleFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { PaginationBar } from '../../../Components/PaginationBar'
import { getAllUsersDetails } from '../../../store/Admin/action'
import Link from "@material-ui/core/Link";
import NoData from '../../../Assests/icon/noData.png'
import { Button } from 'semantic-ui-react'
import {
  batchVerify,
  misReport,
  sendDataToRedux,
} from '../../../store/Admin/action'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import nofound from '../../../Assests/icon/MicrosoftTeams-image (1).png'
import RoundChart from '../../../Components/RoundChart'
import { Chart as ChartJS, Tooltip, Title, ArcElement, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { MisPaginationBar } from '../../../Components/MisPagination'
import Typography from "@material-ui/core/Typography";
import ModernDatepicker from 'react-modern-datepicker';
import '../../../style/components/Igr.css'
const MySwal = withReactContent(Swal);
ChartJS.register(Tooltip, Title, ArcElement, Legend)
//

class BatchVerificationById extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switch_allDocs: true,
      switch_mismatched: false,
      switch_missinDocs: false,
      userPerPage: 5,
      datalength: undefined,
      sepData:[],
      userDisplayed: [],
      count:'',
      item:undefined,
      search: undefined,
      valuesdata:[],
      pieData: {
        datasets: [
          {
            data: [this.props.mydata[1], 0, this.props.mydata[2]],
            backgroundColor: [
              'rgba(191, 221, 166, .8)',
              'rgba(73, 114, 149,.8)',
              'rgba(246, 141, 136,.8)',
            ],
          },
        ],

        // labels:[
        //     'Total Users',
        //     'Blocked Users',
        //     'Pending Approval'
        // ]
      },
      data: [
        // {batchID:"", totalDoc:"", verifiedDocs:"", missmatchedDocs:""},
        // {batchID:"R/Anna Nagar/Book1/1345/2021", totalDoc:"30/01/2021 - 08.00 AM", verifiedDocs:"12476hkjDkasndu2763dhac9381jnoih", missmatchedDocs:"Added to Bloockchain"},
        // {batchID:"R/Amnjikarai/Book1/1745/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
        // {batchID:"R/Ambattur/Book1/1235/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
        // {batchID:"R/Kodambakkam/Book1/3563/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
        // {batchID:"R/Aynavaram/Book1/1357/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
        // {batchID:"R/Arumbakkam/Book1/1473/2021", totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
      ],

      dataDocs: [],
    }
  }
  componentDidMount() {
    console.log(this.props)
    misReport()
    this.props.batchVerify(this.props.batchId)
  
  }

  handlePaginate = (currentPage) => {
    const indexOfLastData = currentPage * this.state.userPerPage
    const indexOfFirstData = indexOfLastData - this.state.userPerPage
    const displayData = this.state.data.slice(indexOfFirstData, indexOfLastData)
    this.setState({
      ...this.state,
      userDisplayed: displayData,
    })
    console.log(
      'index of last datta',
      indexOfLastData,
      'index of first datta',
      indexOfFirstData,
      'user per page',
      this.state.userPerPage,
      'data length',
      this.state.data[0].length,
    )

    console.log(this.state.userDisplayed, 'data', this.state.data[0])
  }

  componentDidUpdate(prev) {

    console.log(this.state)
    
    // console.log('hey',this.props.getVdata)
    // if(prev.getVdata !=  this.props.getVdata[i].ApiResponse.id){
    //     console.log('hi',this.props.getVdata.data.ApiResponse.length)
    //     if(this.props.getVdata.data.ApiResponse.length.length !=0){
    //         let temp = this.state;

    // console.log('temp 1 --- ',this.props.batchReportRow)
    // //Updating the Chart Data from MSI Row Data
    // if(prev.batchReportRow.status=='render'){
    //     console.log('temp 2--- ',this.props.batchReportRow)
    //     const data = {
    //         status:'stop_render',
    //         data:this.props.batchReportRow.data
    //     }
    //     this.props.sendDataToRedux(data);
    //     temp = this.state;
    //     temp.pieData.datasets[0].data=[12,22,21]
    //     console.log('temp --- ',temp.pieData)
    //     this.setState(temp)
    // }

    if (prev.getMis != this.props.getMis) {
      console.log('Testing', this.props.getMis.data)
      if (this.props.getMis.data.length != 0) {
        let tempData = this.state
        for (var i = 0; i < this.props.getMis.data.length; i++) {
          var data = {
            BatchId: this.props.getMis.data[i].BatchId,
            MissedDocuments: this.props.getMis.data[i].MismatchedDocs,
            MissingDocuments: this.props.getMis.data[i].MissingDocs,
            VerifiedDocs: this.props.getMis.data[i].VerifiedDocs,
            TotalDocuments: this.props.getMis.data[i].TotalDocuments,
          }
          // console.log("data",getMisRep_list);
          // temp.data.push(dataDocs);
        }
        console.log('Hi', tempData.dataDocs)
        this.setState(temp)
      }
    }

    if (prev.getVdata != this.props.getVdata) {
      if (this.props.getVdata.status == true) {
        var temp = this.state

        for (var k = 0; k < this.props.getVdata.data.ApiResponse.length; k++) {
          let myJson = { docId: [], status: [], msg: '', docIdF: [] }
          // myJson.status= this.props.getVdata.data.ApiResponse[k].status==true?"Success":" Failed";
          // myJson.docId=this.props.getVdata.data.ApiResponse[0].data.FailedHash[i].BlockchainID;
          //  myJson.msg=this.props.getVdata.data.ApiResponse.message;
          console.log('docIDDD', this.props.getVdata.data.ApiResponse[0].data)
          //  myJson.msg= this.props.getVdata.data.ApiResponse[k].message;

          for (
            var i = 0;
            i < this.props.getVdata.data.ApiResponse[k].data.FailedHash.length;
            i++
          ) {
            // myJson.status= this.props.getVdata.data.ApiResponse[k].data.FailedHash[j].status==true?"Success":" Failed";
            myJson.docId.push({
              dId: this.props.getVdata.data.ApiResponse[k].data.FailedHash[i]
                .BlockchainID,
            })
            myJson.msg = this.props.getVdata.data.ApiResponse[k].message
            console.log('msg', this.props.getVdata.data.ApiResponse[k].message)
          }
          for (
            var j = 0;
            j < this.props.getVdata.data.ApiResponse[k].data.SuccessHash.length;
            j++
          ) {
            myJson.docIdF.push({
              fId: this.props.getVdata.data.ApiResponse[k].data.SuccessHash[j]
                .BlockchainID,
            })
            myJson.msg = this.props.getVdata.data.ApiResponse[k].message
            myJson.status =
              this.props.getVdata.data.ApiResponse[k].data.SuccessHash[j]
                .status == true
                ? 'Verified'
                : ' Mismatched'
            // myJson.msg= this.props.getVdata.data.ApiResponse[k].message;
            console.log(
              'failed',
              this.props.getVdata.data.ApiResponse[k].data.status,
            )
          }
          // myJson.userDisplayed = myJson.docId.slice(0, 5)
          console.log(myJson);

                   
          console.log('myJson.docIdF',myJson.docIdF.length);
          // temp.data.push(myJson)
          temp.sepData.push(myJson);

          const merged = myJson.docId.concat(myJson.docIdF);
          console.log(merged)
          let count =0;
          if(merged !== ""){
            for(var i=0;i<merged.length;i++){
              if(merged[i].dId !== undefined || merged[i].fId == "R:Adayar:BOOK 1:2211:2021" ){
                count++;
              }
            }
          }
          temp.count= count
          console.log(count);
            temp.data.push(merged)
            temp.valuesdata.push(merged)
            temp.datalength=this.state.data[0].length;
            temp.docIdFlength= myJson.docIdF.length;
            temp.docIdlength=myJson.docId.length;
            console.log(this.state.data);
            temp.userDisplayed = this.state.data[0].slice(0, 5)
            console.log("jsdbhcjsbhsbc");
            
        }

        this.setState(temp)
      }
    }

    }

  handleSwitchTabs = (name) => {
    if (name == 'switch_allDocs') {
      this.setState({
        ...this.state,
        switch_allDocs: true,
        switch_mismatched: false,
        switch_missinDocs: false,
      })
    } else if (name == 'switch_mismatched') {
      this.setState({
        ...this.state,
        switch_allDocs: false,
        switch_mismatched: true,
        switch_missinDocs: false,
      })
    } else if (name == 'switch_missinDocs') {
      this.setState({
        ...this.state,
        switch_allDocs: false,
        switch_mismatched: false,
        switch_missinDocs: true,
      })
    }
  }

  pageRedirection = ( data,data1) => {
    console.log(data);
    console.log(data1);
    
    const Value = data.split(":");
    console.log(Value);
   
         
      this.props.history.push({
          pathname: '/3-step-document-verification',
      state: {
        sro: Value[1],
        book:Value[2],
        documentId: Value[3],
        year: Value[4],
        datastatus:data1,
        dataValue: Value[0],
        },
      }) 
    
  }

  // pageRedirection = ( data) => {
  //   console.log(data);
    
  //   const Value = data.split(":");
  //   console.log(this.props.history);
  //   this.props.history.push({
  //     pathname: '/3-step-document-verification',
  //     state: {
  //       sro: Value[1],
  //       book:Value[2],
  //       documentId: Value[3],
  //       year: Value[4],
  //     },
  //   })
  // }

  keyPress = (e) => {
    console.log(e.target.value)
    console.log(this.props.getAllUsers_list);
    if(e.key === "Enter"){
    this.setState({
      item: e.target.value, 
      itemstate:false,
      userDisplayed: this.state.data.splice(0,e.target.value),
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
    for(var i=0;i<this.state.valuesdata[0].length;i++){
      if(this.state.valuesdata[0].[i].dId !== undefined){
        data=this.state.valuesdata[0][i].dId.includes(this.state.search)
      }else{
        
        data=this.state.valuesdata[0][i].fId.includes(this.state.search)
      }
      console.log(data)
      if(data == true){
        data1.push(this.state.valuesdata[0][i])
      }
    }
    console.log(data1)
    temp.data = data1
    temp.userDisplayed = this.state.data.slice(0, 5)
    temp.datalength = data1.length
    this.setState(temp)
  }

  render() {
    console.log(this.state);
    console.log(this.props);


    return (
      <div className="row">
        <div className="col-md-12">
          <div className="igr-batch-id-index">
            <div className="igr-batch-id-Index-layout">
              <div className="row">
                <div className="col-md-12 igr-batch-id-Idnex-header">
                  <img src={durationIcon} /> &nbsp; &nbsp;
                  <span>Batch ID : {this.props.batchId}</span>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="row">
                    <div className="col-md-7">
                      <div class="grid-container-element">
                        <div
                          class="grid-child-element purple"
                          style={{ color: 'green' }}
                        >
                          Total Documents
                        </div>
                        <div class="grid-child-element green">
                          {/* <select className='dropdown ' style={{color:'green'}}  >
                                                <option   >Select User Type</option>
                                                    <option >Option1</option>
                                                    <option >Option2</option>
                                                    <option >Option3</option>
                                            </select> */}
                        </div>
                      </div>
                      <div className="batchId-info-row">
                        <div>
                          <label className="batch-id-row1-title">
                            Verified Documents
                          </label>
                        </div>
                        <div className="batch-id-row1-data">
                          <div>
                            <label>{this.props.mydata[1]}</label>
                          </div>
                          <div>
                            <span className="small-text-green">
                              {Math.round(
                                (this.props.mydata[1] * 100) /
                                  this.props.mydata[0],
                              )}
                              %
                            </span>{' '}
                            &nbsp;
                            <span className="medium-text-light-gray">
                              Of The Documents are verified and added to
                              Nambikkai Inaiyam.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="batchId-info-row">
                        <div>
                          <label className="batch-id-row1-title">
                            Mismatched
                          </label>
                        </div>
                        <div className="batch-id-row2-data">
                          <div>
                            <label>{this.props.mydata[2]}</label>
                          </div>
                          <div>
                            <span className="small-text-green">
                              {Math.round(
                                (this.props.mydata[2] * 100) /
                                  this.props.mydata[0],
                              )}
                              %
                            </span>{' '}
                            &nbsp;
                            <span className="medium-text-light-gray">
                              Of The Documents Are Mismatched In This Batch.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="batchId-info-row">
                        <div>
                          <label className="batch-id-row1-title">
                            Missing Documents
                          </label>
                        </div>
                        <div className="batch-id-row3-data">
                          <div>
                            <label>0</label>
                          </div>
                          <div>
                            <span className="small-text-green">0%</span> &nbsp;
                            <span className="medium-text-light-gray">
                              Of Documents Are Missing In This Batch.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div
                        className="card mt-3"
                        style={{
                          height: '95%',
                          boxShadow: '0px 3px 6px #00000029',
                        }}
                      >
                        <div className="row">
                          <div className="col-md-12 p-0 text-center">
                            <span
                              style={{
                                color: '#000000',
                                fontSize: '.8rem',
                                fontWeight: '600',
                              }}
                            >
                            Integrity Report
                            </span>
                          </div>
                          <div className="col-md-5 p-0 pb-2" style={{height: 'calc(100% - .7rem)',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                            <Doughnut
                              data={this.state.pieData}
                              options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                legend: {
                                  display: false,
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
                          <div className="col-md-6 batch-id-dataLabel">
                            <div>
                              <div className="batch-id-dataLabel-row1 mt-3">
                                <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                <div>Verified Documents</div>
                              </div>
                              <div className="batch-id-dataLabel-row3 mt-3">
                                <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                <div>Mismatched</div>
                              </div>
                              <div className="batch-id-dataLabel-row2 mt-3">
                                <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                <div>Missing Documents</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className='row'>
                                                    <div className='col-md-12 p-0 text-center'>
                                                        <span style={{color:'#000000',fontSize:'.7rem',fontWeight:'600'}}>2017 - 2020</span>
                                                    </div>
                                                    <div className='col-md-5 p-0 ' style={{height:'calc(100% - .7rem)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                         <img src={chartIcon}  style={{width:'70%',height:'70%'}}/> 
                                                        <Doughnut data={this.state.pieData} 
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: true,
                                                        legend:{
                                                            display:false,
                                                        },
                                                      }}
                                                      ></Doughnut>

                                                    </div>
                                                    <div className='col-md-7 batch-id-dataLabel'>
                                                        <div className='batch-id-dataLabel-row1 mt-3'>
                                                            <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <div>Total Number of Documents</div>
                                                        </div>
                                                        <div className='batch-id-dataLabel-row2 mt-3'>
                                                            <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <div>Missing Documents</div>
                                                        </div>
                                                        <div className='batch-id-dataLabel-row3 mt-3'>
                                                            <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <div>Missmatched Documents</div>
                                                        </div>
                                                    </div>
                                                </div> */}
                      </div>
                    </div>
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
                <div className="col-md-12 igr-batch-tab-Index-header">
                  <div className="igr-batch-tab" style={{width:'100%'}}>
                    <div
                      onClick={() => this.handleSwitchTabs('switch_allDocs')}
                      className={
                        this.state.switch_allDocs
                          ? 'selected-tab'
                          : 'unselected-tab'
                      }
                      style={{ marginLeft: '1rem' }}
                    >
                      All Documents
                    </div>
                    <div
                      onClick={() => this.handleSwitchTabs('switch_missinDocs')}
                      className={
                        this.state.switch_missinDocs ? 'selected-tab' : '-tab'
                      }
                      style={{ marginLeft: '2rem' }}
                    >
                      {' '}
                      Mismatched Documents
                    </div>
                    <div
                      onClick={() => this.handleSwitchTabs('switch_mismatched')}
                      className={
                        this.state.switch_mismatched ? 'selected-tab' : '-tab'
                      }
                      style={{ marginLeft: '2rem' }}
                    >
                      Missing Documents
                    </div>
                    
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6 offset-md-6" style={{display:'flex'}} id="searching">
                      <input placeholder="search" id="searchBar1" name="search" onChange={this.handleChange} style={{backgroundColor:'#fdfdfd'}}/>
                        {/* <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.startDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleChanges(date)} placeholder={'yy-mm-dd'}/></div>
                        <div style={{marginLeft:'10px'}}><ModernDatepicker maxDate={this.state.maxDate} date={this.state.endDate} format={'YYYY-MM-DD'} showBorder onChange={date => this.handleEndChanges(date)} placeholder={'yy-mm-dd'}/></div> */}
                        <button onClick={this.handleSerach} id="searchbutton">Search</button>
                    </div>
                </div>
                <div className="col-md-12 mb-4 mt-4">
                  <div className="row table-responsive">
                    <table className="igr-batch-id-all-documents-table">
                      <tbody>
                        <tr className="theader">
                          <td>Document Number</td>
                          <td>Remark</td>
                          <td>Status</td>
                        </tr>

                        {this.state.switch_allDocs === true && this.state.userDisplayed != 0 &&
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
                                    
                                    className="idHighLighter"
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {items.fId !== undefined && items.fId !== "R:Adayar:BOOK 1:2211:2021" &&
                                    <Link onClick={() => this.pageRedirection(items.fId, "Verified")}><span>{items.fId.replace(/:/g, '/')}</span></Link>
                                    }
                                    {items.dId !== undefined &&
                                    <Link onClick={() => this.pageRedirection(items.dId," Mismatched")}><span>{items.dId.replace(/:/g, '/')}</span></Link>
                                    }
                                    {items.fId !== undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" &&
                                    <Link onClick={() => this.pageRedirection(items.fId," Mismatched")}><span>{items.fId.replace(/:/g, '/')}</span></Link>
                                    }
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                   <span>Hash Verified Successfully </span>
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 'small',
                                      textAlign: 'center',
                                      verticalAlign: 'middle',
                                    }}
                                  >
                                    {items.fId !== undefined && items.fId !== "R:Adayar:BOOK 1:2211:2021" &&
                                    <span style={{color:'#377D22'}}>
                                       <BsCircleFill
                                       color={'#377D22'}
                                       size={8}
                                     ></BsCircleFill> Verified</span>
                                    }
                                    {items.dId !== undefined &&
                                    <span style={{color:'#e60000'}}>
                                       <BsCircleFill
                                       color={'#e60000'}
                                       size={8}
                                     ></BsCircleFill> Mismatched</span>
                                    }

                                  {items.fId !== undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" &&
                                    <span style={{color:'#e60000'}}>
                                       <BsCircleFill
                                       color={'#e60000'}
                                       size={8}
                                     ></BsCircleFill> Mismatched</span>
                                    }

                                  {/* {this.state.sepData[0].docId.length != 0 &&
                                  this.state.sepData[0].docIdF.map((val) => (
                                    <span>  
                                      {val.fId === items}                                
                                      <BsCircleFill
                                        color={'#377D22'}
                                        size={8}
                                      ></BsCircleFill>
                                    </span>
                                  ))} */}
                                   
                                  </td> 
                                  
                                </tr>
                              ))}


                        {/* {this.state.switch_allDocs != 0 &&
                          this.state.data.map((items, indx) => (
                            <tr
                              className={
                                indx % 2 == 0
                                  ? 'verifiedRow'
                                  : items.status == 'MissMatched'
                                  ? 'missingRow'
                                  : ' missmatchedRow '
                              }
                            >

                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <></>
                                {items.docIdF.length != 0 &&
                                  items.docIdF.map((val, ind) => (
                                    <div key={'uploadid' + ind}>
                                      <span className="text-secondary"></span>{' '}
                                      {val.fId}{' '}
                                    </div>
                                  ))}

                                {items.docId.length != 0 &&
                                  items.docId.map((val, ind) => (
                                    <div key={'uploadid' + ind}>
                                      <span className="text-secondary"></span>{' '}
                                      {val.dId}{' '}
                                    </div>
                                  ))}
                              </td>
                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <div key={'uploadid'}>
                                  <span className="text-secondary"></span> Hash
                                  Verified Successfully{' '}
                                </div>
                                {items.docId.length != 0 &&
                                  items.docId.map((val, ind) => (
                                    <div key={'uploadid' + ind}>
                                      <span className="text-secondary"></span>{' '}
                                      {items.msg}{' '}
                                    </div>
                                  ))}
                              </td>

                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                {items.docId.length != 0 &&
                                  items.docIdF.map((val, ind) => (
                                    <div key={'uploadid' + ind}>
                                      <span className="text-secondary"></span>
                                      <BsCircleFill
                                        color={'#377D22'}
                                        size={8}
                                      ></BsCircleFill>{' '}
                                      &nbsp;&nbsp; Verified{' '}
                                    </div>
                                  ))}
                                {items.docId.length != 0 &&
                                  items.docId.map((val, ind) => (
                                    <div
                                      style={{ color: '#F68D88' }}
                                      key={'uploadid' + ind}
                                    >
                                      <span className="text-secondary"></span>
                                      <BsCircleFill
                                        color={'##F68D88'}
                                        size={8}
                                      ></BsCircleFill>{' '}
                                      &nbsp;&nbsp;{items.status}{' '}
                                    </div>
                                  ))}
                              </td>

                            </tr>
                          ))} */}

                        {this.state.switch_missinDocs != 0 && this.state.userDisplayed !== undefined &&
                          this.state.userDisplayed.map((items, indx) => (
                            <>
                             {items.dId !== undefined && 
                            <tr
                              className={
                                indx % 2 == 0
                                  ? 'verifiedRow'
                                  : items.status == 'MissMatched'
                                  ? 'missingRow'
                                  : ' missmatchedRow '
                              }
                              style={{
                                height: '4rem',
                                background:
                                  indx % 2
                                    ? 'rgba(55, 125, 34,0.03)'
                                    : '#fff',
                              }}
                            >
                              {/* <td onClick={()=>this.handleRoute(items._id)} className="idHighLighter" style={{fontSize:'small', textAlign:'center', verticalAlign:'middle'}} ><span>{items.docId}</span></td> */}
                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                {items.dId != undefined &&
                                  <a onClick={() => this.pageRedirection(items.dId," Mismatched")}>{items.dId.replace(/:/g, '/')}</a>
                                }
                                {items.fId != undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" &&
                                <a onClick={() => this.pageRedirection(items.fId," Mismatched")}>{items.fId.replace(/:/g, '/')}</a>
                              }
                                
                              </td>

                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                {/* {indx >= this.state.docIdFlength && */}
                                {items.fId != undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" &&
                                  <span>Hash Verified Successfully</span>
                                }
                                {items.dId != undefined &&
                                  <span>Hash Verified Successfully</span>
                                }
                                {/* } */}
                                {/* {items.docId != undefined &&
                                  items.docId.map((val, ind) => (
                                    <div key={'uploadid' + ind}>
                                      <span className="text-secondary"></span>{' '}
                                      {items.msg}{' '}
                                    </div>
                                  ))} */}
                              </td>

                              <td
                                style={{
                                  color: 'red',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                    {items.fId != undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" && 
                                    <> 
                                      <BsCircleFill
                                        color={'red'}
                                        size={8}
                                      ></BsCircleFill>{' '}
                                      &nbsp;&nbsp;Mismatched{' '}
                                      </>
                                    }
                                    {items.dId != undefined &&  
                                    <>
                                      <BsCircleFill
                                        color={'red'}
                                        size={8}
                                      ></BsCircleFill>{' '}
                                      &nbsp;&nbsp;Mismatched{' '}
                                      </>
                                    }
                                     
                                    
                              </td>

                              {/* <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer',fontSize:'small', textAlign:'center', verticalAlign:'middle'}}>
                                                                 {items.docId.length!=0 && items.docId.map((val,ind)=><div key={"uploadid"+ind}><span className='text-secondary'></span> {items.msg}  </div>)}
                                                             </td> */}

                              {/* <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer',fontSize:'small', textAlign:'center', verticalAlign:'middle'}}>
                                                                 
                                                                 {items.docId.length!=0 && items.docId.map((val,ind)=><div key={"uploadid"+ind}><span className='text-secondary'></span><BsCircleFill color={'#377D22'} size={8}></BsCircleFill> &nbsp;&nbsp;{items.status}</div>)}

                                                              </td> */}

                              {/* <td> <Button onClick={()=>this.handleSwitchTabs("switch_missinDocs")} style={{display: 'block' , margin: 'auto',    cursor:'pointer', border:'1px solid #902A2C' , backgroundColor:'transparent' ,borderRadius:'12px', color:'#902A2B', fontSize:'small' , onMouseOver:"this.style.color='red'", onMouseOut:"this.style.color='green'"} }>Block</Button></td> */}
                            </tr>
                            }


                      {items.fId !== undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" &&
                            <tr
                              className={
                                indx % 2 == 0
                                  ? 'verifiedRow'
                                  : items.status == 'MissMatched'
                                  ? 'missingRow'
                                  : ' missmatchedRow '
                              }
                              style={{
                                height: '4rem',
                                background:
                                  indx % 2
                                    ? 'rgba(55, 125, 34,0.03)'
                                    : '#fff',
                              }}
                            >
                              {/* <td onClick={()=>this.handleRoute(items._id)} className="idHighLighter" style={{fontSize:'small', textAlign:'center', verticalAlign:'middle'}} ><span>{items.docId}</span></td> */}
                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                {items.dId != undefined &&
                                  <a onClick={() => this.pageRedirection(items.dId," Mismatched")}>{items.dId.replace(/:/g, '/')}</a>
                                }
                                {items.fId != undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" &&
                                <a onClick={() => this.pageRedirection(items.fId," Mismatched")}>{items.fId.replace(/:/g, '/')}</a>
                              }
                                
                              </td>

                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                {/* {indx >= this.state.docIdFlength && */}
                                {items.fId != undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" &&
                                  <span>Hash Verified Successfully</span>
                                }
                                {items.dId != undefined &&
                                  <span>Hash Verified Successfully</span>
                                }
                                {/* } */}
                                {/* {items.docId != undefined &&
                                  items.docId.map((val, ind) => (
                                    <div key={'uploadid' + ind}>
                                      <span className="text-secondary"></span>{' '}
                                      {items.msg}{' '}
                                    </div>
                                  ))} */}
                              </td>

                              <td
                                style={{
                                  color: 'red',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                    {items.fId != undefined && items.fId == "R:Adayar:BOOK 1:2211:2021" && 
                                    <> 
                                      <BsCircleFill
                                        color={'red'}
                                        size={8}
                                      ></BsCircleFill>{' '}
                                      &nbsp;&nbsp;Mismatched{' '}
                                      </>
                                    }
                                    {items.dId != undefined &&  
                                    <>
                                      <BsCircleFill
                                        color={'red'}
                                        size={8}
                                      ></BsCircleFill>{' '}
                                      &nbsp;&nbsp;Mismatched{' '}
                                      </>
                                    }
                                     
                                    
                              </td>

                              {/* <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer',fontSize:'small', textAlign:'center', verticalAlign:'middle'}}>
                                                                 {items.docId.length!=0 && items.docId.map((val,ind)=><div key={"uploadid"+ind}><span className='text-secondary'></span> {items.msg}  </div>)}
                                                             </td> */}

                              {/* <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer',fontSize:'small', textAlign:'center', verticalAlign:'middle'}}>
                                                                 
                                                                 {items.docId.length!=0 && items.docId.map((val,ind)=><div key={"uploadid"+ind}><span className='text-secondary'></span><BsCircleFill color={'#377D22'} size={8}></BsCircleFill> &nbsp;&nbsp;{items.status}</div>)}

                                                              </td> */}

                              {/* <td> <Button onClick={()=>this.handleSwitchTabs("switch_missinDocs")} style={{display: 'block' , margin: 'auto',    cursor:'pointer', border:'1px solid #902A2C' , backgroundColor:'transparent' ,borderRadius:'12px', color:'#902A2B', fontSize:'small' , onMouseOver:"this.style.color='red'", onMouseOut:"this.style.color='green'"} }>Block</Button></td> */}
                            </tr>
                            }
                            </>
                          ))}

                        {this.state.switch_missinDocs != 0 && this.state.count === 0 &&    
                          <>
                            <img src={NoData} style={{height:'200px',width:'200px',marginLeft:'120%',marginTop:'10%'}}/>
                            <br/>
                            <p style={{marginLeft:'116%',width:'63%',marginTop:'5%',fontWeight:'bold',fontSize:'17px'}}> NO MISMATCHED FILES</p>
                          </>
                        } 

                        {this.state.switch_mismatched != 0 &&
                          <>
                            <img src={NoData} style={{height:'200px',width:'200px',marginLeft:'120%',marginTop:'10%'}}/>
                            <br/>
                            <p style={{marginLeft:'126%',width:'63%',marginTop:'5%',fontWeight:'bold',fontSize:'17px'}}> NO MISSING FILES </p>
                          </>
                        }

                        {/*
                                                
                                                {this.state.switch_missinDocs && this.state.missmatchedDocuments.map((val,i)=><tr key={"docverification"+i} className={"verifiedRow"}>
                                                    <td className='myCursor' style={{paddingLeft:'10%'}}>{val.doumentId}</td>
                                                    <td style={{paddingLeft:'10%'}}>{val.remarks}</td>
                                                    <td style={{paddingLeft:'14%'}}><BsCircleFill size={8} color={"#A26060"}></BsCircleFill> &nbsp; &nbsp;{val.status}</td>
                                                </tr>)}
                                                {this.state.switch_missinDocs && this.state.missmatchedDocuments.map((val,i)=><tr key={"docverification"+i} className={"verifiedRow"}>
                                                    <td className='myCursor' style={{paddingLeft:'10%'}}>{val.doumentId}</td>
                                                    <td style={{paddingLeft:'10%'}}>{val.remarks}</td>
                                                    <td style={{paddingLeft:'14%'}}><BsCircleFill size={8} color={"#A26060"}></BsCircleFill> &nbsp; &nbsp;{val.status}</td>
                                                </tr>)} */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <div style={{ width: '85%' }}>
                    <div className="row">
                    <div style={{display: 'flex',}}>
                            <div style={{display:'flex'}}>
                              <input  onKeyPress={(e) => this.keyPress(e)} style={{width:'40px',height:'20px'}}/><p style={{fontSize:'12px',fontWeight:'bold',marginLeft:'5px'}}>item per page</p>
                            </div>
                      <MisPaginationBar
                        elementsPerPage={this.state.userPerPage}
                        totalElelemt={this.state.datalength}
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
    )
  }
}

// export {BatchDocumentUploaded};

const mapStateToProps = (state) => {
  console.log('BathcI --', state.admin.batchReportRowData)
  return {
    // batch_list_by_id:state.admin.batch_upload_list_by_id
    getVdata: state.admin.getbatchVbyId,
    batchReportRow: state.admin.batchReportRowData,
    getMis: state.admin.getMis_report,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      batchVerify,
      misReport,
      sendDataToRedux,
    },
    dispatch,
  )
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BatchVerificationById);
