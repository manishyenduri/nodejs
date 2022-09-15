import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import logo from '../../../Assests/icon2/Bimg.svg'
import rupeeLogo from '../../../Assests/icon2/rupeeimg.svg'
import dailyUploadReport from '../../../Assests/icon2/term (1).svg'
import dataIntegrityReport from '../../../Assests/icon2/Group 481.svg'
import pauseCurrentBatch from '../../../Assests/icon2/Group 482.svg'
import { SimpleModalPop } from '../../../Components/SimpleModalPop'
import {PageLoader} from '../../../Components/PageLoader'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Doughnut } from 'react-chartjs-2'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import '../../../style/components/Igr.css'
import {
  getallMasterApi,
  getZones,
  getDistrict,
  getSROList,
} from '../../../store/action'
import { Chart } from 'chart.js'
import doughchart from '../../../Assests/icon2/doughnuticon.PNG'

const MySwal = withReactContent(Swal);

class BlockchainDocOfRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalShow: null,
      isBtnClicked: true,
      zone: '',
      zoneArr: [this.props.match.params.role],
      district: '',
      districtArr: [],
      sub_reg_ofc: '',
      sub_reg_ofcArr: [],
      closePop: true,
      isLoading: true,
      errors: '',
      pieData: {
        datasets: [
          {
          
            data:[90 , 0, 10 ],
            backgroundColor: [
              'rgba(191, 221, 166, .8)',
              'rgba(73, 114, 149,.8)',
              'rgba(246, 141, 136,.8)',
            ],
          },
        ],
      },
      bookArr: ['BOOK 1','BOOK 3','BOOK 4'],
      book:'',
      yearArr: ['1975','1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1985','1985',
      '1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000'
      ,'2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014'
      ,'2015','2016','2017','2018','2019','2020','2021','2022'],
      year:'',
      documentId:'',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  //For Close And Open Function of popup Modal
  handleClick() {
    this.setState((state) => ({
      isBtnClicked: !state.isBtnClicked,
    }))
  }

  // ONCHANGE function for all the input box
  handleChange = ({ target }) => {
    this.setState({
      selectedOption: target.zone,
      selectedOption: target.dist,
      selectedOption: target.sub_reg_ofc,
      selectedOption: target.book,
      selectedOption: target.year,
      selectedOption: target.documentId,
    })
  }

  componentDidMount() {
    this.props.getZones()
    this.props.getDistrict(this.props.match.params.role)
    
    console.log(localStorage)
  }

  componentDidUpdate(prev) {
    
    if (prev.getUrZone != this.props.getUrZone) {
      if (this.props.getUrZone.length != 0) {
        let temp = this.state
        temp.zoneArr = this.props.getUrZone.data
        this.setState(temp)
        this.setState({
          isLoading:false,
        })
      }
    }

    if (prev.getUrDistrict != this.props.getUrDistrict) {
      if (this.props.getUrDistrict.data.length != 0) {
        let temp = this.state
        temp.districtArr = this.props.getUrDistrict.data
        this.setState(temp)
      }
    }

    if (prev.sroList != this.props.sroList) {
      if (this.props.sroList.data.length != 0)
        this.setState({
          ...this.state,
          sub_reg_ofcArr: this.props.sroList.data,
        })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    if ((name == 'zone') & (value != '')) {
      this.props.getDistrict(value)
    }
    if ((name == 'district') & (value != '')) {
      this.props.getSROList(value)
    }
    this.setState({ ...this.state.users, [name]: value })
  }


  //Modal Popup Function
  showModal() {
    const myModal = new bootstrap.Modal(
      document.getElementById('simpleModal'),
      {
        keyboard: false,
      },
    )
    myModal.show()
    $('.modal-backdrop').removeClass('modal-backdrop')
  }

  // For close Popup Function
  closeModalPop = () =>{
    this.setState({
      closePop: false,
    })
  }

  //Validation of registration portal
  handleValidation() {
    const errors = {};
    let formIsValid = true;
    if (this.state.zone === undefined || this.state.zone === '') {
      formIsValid = false;
      errors.zone = 'This is a required field';
    }
    if (this.state.zone === "Select Zone") {
      formIsValid = false;
      errors.zone = 'This is a required field';
    }
    if (this.state.district === undefined || this.state.district === '') {
      formIsValid = false;
      errors.district = 'This is a required field';
    }
    if (this.state.district === "Choose District") {
      formIsValid = false;
      errors.district = 'This is a required field';
    }
    if (this.state.sub_reg_ofc === undefined || this.state.sub_reg_ofc === '') {
      formIsValid = false;
      errors.sub_reg_ofc = 'This is a required field';
    }
    if (this.state.book === undefined || this.state.book === '') {
      formIsValid = false;
      errors.book = 'This is a required field';
    }
    if (this.state.year === undefined || this.state.year === '') {
      formIsValid = false;
      errors.year = 'This is a required field';
    }
    if (!this.state.documentId) {
      formIsValid = false;
      errors.documentId = 'This is required fields';
    } else if (!this.state.documentId.match(/^[0-9]+$/)) {
      formIsValid = false;
      errors.documentId = 'document value is not valid';
    }
    this.setState({ errors });
    return formIsValid;
  }

  //This Function Belongs To Submit
  SubmitData = () => {
    if(this.handleValidation())
    {
      this.props.history.push({
        pathname: '/3-step-document-verification',
        state: {
          zone: this.state.zone,
          district: this.state.district,
          sro: this.state.sub_reg_ofc,
          book:this.state.book,
          documentId: this.state.documentId,
          year: this.state.year,
        },
      })
    }
  }

  render() {
    console.log(this.state); 
    console.log(this.props)
    if(this.state.closePop === false){
      this.setState({
        closePop: true,
      })
    }
    // if(this.props.history.location.state === undefined){
    //   this.props.history.push('/')
    // }
    return (
      <div style={{overflowY:'scroll',width:'101%'}} id="all">
      <div>
        <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'8%',width: '84%',height: '41px',borderRadius: '5px'}}>
          <Link
            color="inherit"
            style={{padding:'10px',fontWeight:'bold',color:'#377D22',fontFamily:'muli',fontSize:'18px'}}
          >
            Registration Portal
          </Link>
        </Breadcrumbs>
        {this.state.isLoading === false ?
          <div className="blockChainDoc-index">
            {this.state.isLoading === true &&
              <PageLoader/>
            }
            {this.state.closePop === true &&
              <SimpleModalPop
                propClass="modal-lg modal-dialog-centered"
                iconSvg={dailyUploadReport}
                closeModalPop={this.closeModalPop}
              >
                <div className="b-index-popup">
                  <div className="b-index-body">
                    <div className="row">
                      <div className="col-md-8 p-0">
                        <div className="row mt-3">
                          <div className="col-md-12 b-index-popup-rowData">
                            <div>
                              <label>Batch ID</label>
                            </div>
                            <div>:</div>
                            <div>
                              <span>113297758</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 b-index-popup-rowData">
                            <div>
                              <label>Batch Started At</label>
                            </div>
                            <div>:</div>
                            <div>
                              <span>15/02/2018 - 12.00.00 AM</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 b-index-popup-rowData">
                            <div>
                              <label>No. Of . Documents</label>
                            </div>
                            <div>:</div>
                            <div>
                              <span>2,34,234</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 b-index-popup-rowData">
                            <div>
                              <label>Verified Documents</label>
                            </div>
                            <div>:</div>
                            <div>
                              <span>98,897</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div style={{ width: '80%', marginLeft: '2.5rem' }}>
                          {' '}
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
                        </div>
                        <div className="row mt-2 mb-2">
                          <div className="col-md-12 p-0 d-flex align-items-center">
                            <div
                              style={{
                                background: '#BFDDA6',
                                width: '1.5rem',
                                height: '0.8rem',
                                borderRadius: '5px',
                              }}
                            ></div>{' '}
                            &nbsp;&nbsp;{' '}
                            <span
                              style={{
                                color: 'rgba(0,0,0,0.7)',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                              }}
                            >
                              Verified Documents (90%)
                            </span>
                          </div>
                          <div className="col-md-12 p-0 d-flex align-items-center">
                            <div
                              style={{
                                background: '#F68D88',
                                width: '1.5rem',
                                height: '0.8rem',
                                borderRadius: '5px',
                              }}
                            ></div>{' '}
                            &nbsp;&nbsp;{' '}
                            <span
                              style={{
                                color: 'rgba(0,0,0,0.7)',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                              }}
                            >
                              Non - Verified Documents (10%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 p-0">
                        <button
                          className="b-index-popup-btn"
                          onClick={this.handleClick}
                        >
                          {this.state.isBtnClicked ? 'Pause Batch ' : 'Resume Batch'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleModalPop>
            }
            <div className="blockchainDoc-index-layout" id="blockChain">
              <div className="row">
                <div className="col-md-12 blockchainDoc-index-layout-row1">
                  <img src={logo} /> &nbsp;&nbsp;{' '}
                  <span style={{fontFamily:'muli',fontSize:'18px'}}>Blockchained Documents Of Registration</span>
                </div>
              </div>
              <div className="blockchainDoc-index-layout-row2">
                <div className="row">
                  <div className="col-md-12 mt-2 blockchain-doc-form-title d-flex align-items-center">
                    <img src={rupeeLogo} /> &nbsp;&nbsp;{' '}
                    <span style={{fontFamily:'muli',fontSize:'16px'}}>View a Registration Document</span>
                  </div>
                </div>
                <div className="blockchain-doc-form-body">
                  <div className="row">
                    <div className="col-md-4 ">
                      <label style={{fontFamily:'muli',fontSize:'16px'}}>Zone </label>
                      <select
                        type="text"
                        name="zone"
                        style={{ color: 'black' ,border:this.state.errors.zone === "This is a required field" ? '1px solid red' : ''
                      }}
                        value={this.state.zone}
                        onChange={this.handleChange}
                      >
                        <option selected style={{fontSize:'16px'}}>
                          Select Zone 
                        </option>
                        {this.state.zoneArr.length != 0 &&
                          this.state.zoneArr.map((id) => (
                            <option id style={{ color: 'black' }}>
                              {' '}
                              {id}
                            </option>
                          ))
                        }
                      </select>
                      {this.state.errors.zone !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.zone}</p>}
                    </div>
                    <div className="col-md-4">
                      <label selected style={{fontFamily:'muli',fontSize:'16px'}}>District </label>
                      <select
                        type="text"
                        name="district"
                        style={{ color: 'black',border:this.state.errors.district === "This is a required field" ? '1px solid red' : '' }}
                        value={this.state.district}
                        onChange={this.handleChange}
                      >
                        <option selected style={{fontSize:'16px'}}>
                          Choose District{console.log(this.state.district)}
                        </option>
                        {this.state.districtArr.length != 0 &&
                          this.state.districtArr.map((id) => (
                            <option id style={{ color: 'black' }}>
                              {' '}
                              {id}
                            </option>
                          ))}
                      </select>
                      {this.state.errors.district !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.district}</p>}
                    </div>
                    <div className="col-md-4">
                      <label style={{fontFamily:'muli',fontSize:'16px'}}>Sub Registrar Office </label>
                      <select
                        type="text"
                        name="sub_reg_ofc"
                        style={{ color: 'black',border:this.state.errors.sub_reg_ofc === "This is a required field" ? '1px solid red' : '' }}
                        value={this.state.sub_reg_ofc}
                        onChange={this.handleChange}
                      >
                        <option selected style={{fontFamily:'muli'}}>
                          Select SRO Officer{this.state.sub_reg_ofc}
                        </option>

                        {this.state.sub_reg_ofcArr != 0 &&
                          this.state.sub_reg_ofcArr.map((id) => (
                            <option id>{id}</option>
                          ))
                        }
                      </select>
                      {this.state.errors.sub_reg_ofc !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.sub_reg_ofc}</p>}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <label style={{fontFamily:'muli',fontSize:'16px'}}>Book </label>
                      <select
                        type="text"
                        name="book"
                        style={{ color: 'black',border:this.state.errors.book === "This is a required field" ? '1px solid red' : '' }}
                        value={this.state.book}
                        onChange={this.handleChange}
                      >
                        <option selected style={{fontFamily:'muli'}}>
                          Select Book{this.state.book}
                        </option>

                        {this.state.bookArr.length != 0 &&
                          this.state.bookArr.map((id) => (
                            <option id>{id}</option>
                          ))
                        }
                      </select>
                      {this.state.errors.book !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.book}</p>}
                    </div>
                    <div className="col-md-4">
                      <label style={{fontFamily:'muli',fontSize:'16px'}}>Document Number </label>
                      {this.state.errors.documentId === "This is required fields" &&
                      <>
                        <input type="text" style={{border:'1px solid red'}} placeholder="Enter Document Number" name="documentId" value={this.state.documentId} onChange={this.handleChange}/>
                        {this.state.errors.documentId !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.documentId}</p>}
                      </>
                      }  
                      {this.state.errors.documentId === "document value is not valid" &&
                        <input type="text" style={{border:'1px solid red'}} placeholder="Enter Document Number" name="documentId" value={this.state.documentId} onChange={this.handleChange}/>
                      }  
                      {this.state.errors.documentId === undefined &&
                        <input type="text"  placeholder="Enter Document Number" name="documentId" value={this.state.documentId} onChange={this.handleChange}/>
                      }
                    </div>
                    <div className="col-md-4">
                      <label style={{fontSize:'16px'}}>Year </label>
                      <select
                        type="text"
                        name="year"
                        style={{ color: 'black',border:this.state.errors.year === "This is a required field" ? '1px solid red' : '' }}
                        value={this.state.year}
                        onChange={this.handleChange}
                      >
                        <option selected style={{fontFamily:'muli'}}> 
                          Select Year{this.state.year}
                        </option>

                        {this.state.yearArr.length != 0 &&
                          this.state.yearArr.map((id) => (
                            <option id>{id}</option>
                          ))
                        }
                      </select>
                      {this.state.errors.year !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.year}</p>}
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <button
                        onClick={() => this.SubmitData()}
                        className="blockchain-doc-form-button"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blockchainDoc-index-layout-row3">
                <div
                  onClick={() => this.props.history.push({pathname:'/igr-batch-verification',state:{data:"Login"}})}
                >
                  <img src={dataIntegrityReport} /> &nbsp;&nbsp;&nbsp;{' '}
                  <span style={{fontFamily:'muli',fontSize:'16px'}}> Integrity Report </span>
                </div>
                <div
                  onClick={() => this.props.history.push({pathname:'/igr-batch-upload',state:{data:'Login'}})}
                  className="pushRight"
                >
                  {' '}
                  <img src={dailyUploadReport} /> &nbsp;&nbsp;&nbsp;{' '}
                  <span style={{fontFamily:'muli'}}>Daily Upload Report</span>
                </div>
                <div className="pushRight" onClick={this.showModal}>
                  <img src={pauseCurrentBatch} /> &nbsp;&nbsp;&nbsp;{' '}
                  <span style={{fontFamily:'muli',fontSize:'16px'}}>Pause Current Batch</span>
                </div>
              </div>
            </div>
          </div>
        :
          <PageLoader/>
        }
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('hello', state)
  return {
    // api integration to be done

    getUrZone: state.admin.getallZones,
    getUrDistrict: state.admin.getallDistrict,
    sroList: state.admin.getallSROList,
    getLogin_Resp: state.login.login_response
  }
}

const mapDispatchToProps = (disptach) => {
  return bindActionCreators(
    {
      getallMasterApi,

      getZones,
      getDistrict,
      getSROList,
    },
    disptach,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlockchainDocOfRegistration)
