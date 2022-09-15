import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import logo from '../../../Assests/icon2/Bimg.svg'
import rupeeLogo from '../../../Assests/icon2/rupeeimg.svg'
import dailyUploadReport from '../../../Assests/icon2/term (1).svg'
import dataIntegrityReport from '../../../Assests/icon2/Group 481.svg'
import pauseCurrentBatch from '../../../Assests/icon2/Group 482.svg'
import { SimpleModalPop } from '../../../Components/SimpleModalPop'
import { Doughnut } from 'react-chartjs-2'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {
  getallMasterApi,
  getZones,
  getDistrict,
  getSROList,
} from '../../../store/action'
import { Chart } from 'chart.js'
import doughchart from '../../../Assests/icon2/doughnuticon.PNG'

const MySwal = withReactContent(Swal);

class screenforSRO extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalShow: null,
      isBtnClicked: true,
      zone: this.props.location.state.zone,
      zoneArr: [this.props.location.state.zone],
      district: this.props.location.state.district,
      districtArr: [this.props.location.state.district],
      sub_reg_ofc: this.props.location.state.SRO ,
      sub_reg_ofcArr: [this.props.location.state.SRO],
      bookArr: ['BOOK 1','BOOK 3','BOOK 4'],
      book:'',
      yearArr: ['1975','1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1985','1985',
      '1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000'
      ,'2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014'
      ,'2015','2016','2017','2018','2019','2020','2021','2022'],
      year:'',
      documentId:'',
      errors:'',
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
    }
  }

  //validation of registration portal
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
    if (!this.state.documentId) {
      formIsValid = false;
      errors.documentId = 'This is required fields';
    } else if (!this.state.documentId.match(/^[0-9]+$/)) {
      formIsValid = false;
      errors.documentId = 'document value is not valid';
    }
    if (this.state.year === undefined || this.state.year === '') {
      formIsValid = false;
      errors.year = 'This is a required field';
    }
    this.setState({ errors });
    return formIsValid;
  }

  //function for submit button
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
  componentDidMount() {}

  componentDidUpdate(prev) {
    
    //get Zone List
    if (prev.getUrZone != this.props.getUrZone) {
      console.log('Click', this.props.getUrZone)
      if (this.props.getUrZone.length != 0) {
        let temp = this.state
        console.log('tempdata', temp.data)
        temp.zoneArr = this.props.getUrZone.data
        this.setState(temp)
      }
      console.log('temp', this.state.zone)
    }

    //get district data
    if (prev.getUrDistrict != this.props.getUrDistrict) {
      console.log('districtOne', this.props.getUrDistrict)
      if (this.props.getUrDistrict.data.length != 0) {
        let temp = this.state
        console.log('districtArr', temp.data)
        temp.districtArr = this.props.getUrDistrict.data
        this.setState(temp)
      }
    }


    //get Sro List
    if (prev.sroList != this.props.sroList) {
      if (this.props.sroList.data.length != 0)
        this.setState({
          ...this.state,
          sub_reg_ofcArr: this.props.sroList.data,
        })
    }
  }

  //onChange funcgtion of registration portal
  handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    if ((name == 'zone') & (value != '')) {
      this.props.getDistrict(value)
    }
    if ((name == 'district') & (value != '')) {
      this.props.getSROList(value)
    }
    this.setState({ ...this.state.users, [name]: value })
  }

  render() {
    console.log(this.state);
    return (
      <div style={{overflowY:'scroll',width:'101%'}}>
      <div>
        <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:'8%',width: '84%',height: '41px',borderRadius: '5px'}}>
          <Link
            color="inherit"
            style={{padding:'10px',fontWeight:'bold',color:'#377D22',fontFamily:'muli',fontSize:'18px'}}
          >
            Registration Portal
          </Link>
        </Breadcrumbs>
        <div className="blockChainDoc-index">
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
                  <div className="col-md-4">
                    <label style={{fontFamily:'muli',fontSize:'16px'}}>Zone </label>
                    <select type="text" name="zone" style={{ color: 'black',border:this.state.errors.zone === "This is a required field" ? '1px solid red' : '' }} value={this.state.zone} onChange={this.handleChange}>
                      {this.state.zoneArr.length != 0 &&
                      this.state.zoneArr.map((id) => (
                        <option id style={{ color: 'black' }}>
                          {' '}
                          {id}
                        </option>
                      ))}
                    </select>
                    {this.state.errors.zone !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.zone}</p>}
                  </div>
                  <div className="col-md-4">
                    <label selected style={{fontFamily:'muli',fontSize:'16px'}}>District </label>
                  <select type="text" name="district" style={{ color: 'black',border:this.state.errors.district === "This is a required field" ? '1px solid red' : '' }} value={this.state.district} onChange={this.handleChange} >
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
                  <label style={{fontFamily:'muli',fontSize:'16px'}}>Sub Registrar Office</label>
                  <select type="text" name="sub_reg_ofc" style={{ color: 'black',border:this.state.errors.sub_reg_ofc === "This is a required field" ? '1px solid red' : '' }} value={this.state.sub_reg_ofc} onChange={this.handleChange} >
                    {this.state.sub_reg_ofcArr != 0 &&
                      this.state.sub_reg_ofcArr.map((id) => (
                        <option id>{id}</option>
                      ))}
                  </select>
                  {this.state.errors.sub_reg_ofc !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.sub_reg_ofc}</p>}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <label style={{fontFamily:'muli',fontSize:'16px'}}>Book </label>
                  <select type="text" name="book" style={{ color: 'black',border:this.state.errors.book === "This is a required field" ? '1px solid red' : '' }} value={this.state.book} onChange={this.handleChange}>
                    <option selected style={{fontFamily:'muli'}}>
                      Select Book{this.state.book}
                    </option>
                    {this.state.bookArr.length != 0 &&
                      this.state.bookArr.map((id) => (
                        <option id>{id}</option>
                    ))}
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
                  <select type="text" name="year" style={{ color: 'black',border:this.state.errors.year === "This is a required field" ? '1px solid red' : '' }} value={this.state.year} onChange={this.handleChange}>
                    <option selected style={{fontFamily:'muli',fontSize:'16px'}}>
                      Select Year{this.state.year}
                    </option>

                    {this.state.yearArr.length != 0 &&
                      this.state.yearArr.map((id) => (
                        <option id>{id}</option>
                    ))}
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
            <div id="button1" onClick={() => this.props.history.push({pathname:'/igr-batch-verification',state:{data:"Login"}})} >
              <img src={dataIntegrityReport} /> &nbsp;&nbsp;&nbsp;{' '}
              <span style={{fontFamily:'muli',fontSize:'16px'}}>Integrity Report </span>
            </div>
            <div id="button2" onClick={() => this.props.history.push({pathname:'/igr-batch-upload',state:{data:'Login'}})} className="pushRight"  >
              {' '}
              <img src={dailyUploadReport} /> &nbsp;&nbsp;&nbsp;{' '}
              <span style={{fontFamily:'muli',fontSize:'16px'}}>Daily Upload Report</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('hello', state)
  return {
    getUrZone: state.admin.getallZones,
    getUrDistrict: state.admin.getallDistrict,
    sroList: state.admin.getallSROList,
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

export default connect(mapStateToProps, mapDispatchToProps)(screenforSRO)
