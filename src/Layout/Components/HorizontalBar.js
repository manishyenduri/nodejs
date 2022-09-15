import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BsBell, BsChat, BsFillMenuButtonFill } from 'react-icons/bs'
import { GiTireIronCross } from 'react-icons/gi'
import somaniIcon from '../../Assests/icon2/Somani group logo icon.svg'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoIosContact } from 'react-icons/io'
import { BsFillEnvelopeFill , BsBookmarkFill, BsArrowLeftCircleFill } from "react-icons/bs";
import { RiArrowDownSLine } from 'react-icons/ri'
import { loginApi, forgotApi } from '../../store/Login/action'
import MaModalContact from '../ModalPopUp.jsx'
import blockChainIcon from '../../Assests/icon2/Bimg.svg'
import { Document, Page } from 'react-pdf';
import pdfFile from '../../Assests/icon2/About us BC-TNeGA.pdf'

class HorizontalBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDrawer: false,
      role: '',
      text: '',
      showContact: false,
    }
  }
  handleLogin = () => {
    const data = {
      role: this.state.role,
    }
    this.props.loginApi(data)
  }

  switchUser = () => {
    let select = document.getElementById('roles')
    let value = select.options[select.selectedIndex].value

    this.setState({ value })
    console.log('text', value)

    if (value == 'IGR') {
      this.props.history.push('/registration-dashboard')
    }

    if (value == 'DIG') {
      this.props.history.push('/registration-dashboard2')
    }
  }

  redirectPage = () => {
    console.log(this.props.role_info.user.role)
    if (this.props.role_info.user.role === 'DRO') {

      this.props.history.push({
        pathname: '/registration-dashboard2',
        state: {
          role: this.props.role_info.user.role,
          zone: this.props.role_info.user.Zone,
          district: this.props.role_info.user.District,
        },
      })

    }

    if (this.props.role_info.user.role === 'DIG') {

      this.props.history.push({
        pathname: '/registration-dashboard3',
        state: {
          role: this.props.role_info.user.role,
          zone: this.props.role_info.user.Zone,
          district: this.props.role_info.user.District,
        },
      })

    }

    if (this.props.role_info.user.role === 'SRO') {this.props.history.push({
      pathname: '/registration-dashboard4',
      state: {
        role: this.props.role_info.user.role,
        zone: this.props.role_info.user.Zone,
        district: this.props.role_info.user.District,
        SRO: this.props.role_info.user.SRO
      },
    })
    }

    if (this.props.role_info.user.role === 'admin') {
      
      this.props.history.push({pathname: '/registration-dashboard',
                state: { data:"Login" },});
    }
    if (this.props.role_info.user.role === 'IGR') {
      
      this.props.history.push({pathname: '/registration-dashboard',
                state: { data:"Login" },});
    }
  }
  componentDidMount(){
    if(localStorage.getItem('auth_token') === null){
      this.props.history.push('/')
    }
  }

  componentDidUpdate(prev) {
    if(prev.logout !== this.props.logout){
      if(this.props.logout.message === "Logout Successfully!!"){
        this.props.history.push('/')
      }
    }
  }
  

  
  RegisterPortal =() => {
    if(this.props.role_info.user.role == "admin" ){
      this.props.history.push('/registration-dashboard');
    }
    if(this.props.role_info.user.role == "DIG" ){
      this.props.history.push({
        pathname: '/registration-dashboard3',
        state: { zone: this.props.role_info.user.Zone,
          district:this.props.role_info.user.District },
      })
    }
    if(this.props.role_info.user.role == "SRO" ){
      this.props.history.push({
        pathname: '/registration-dashboard4',
        state: { zone: this.props.role_info.user.Zone,
          district:this.props.role_info.user.District,
          SRO:this.props.role_info.user.SRO, },
      })
    }
    if(this.props.role_info.user.role == "DRO" ){
      this.props.history.push({
        pathname: '/registration-dashboard2',
        state: { zone: this.props.role_info.user.Zone },
      })
    }

    
  }

  showContactModal = () => this.setState(prevState => ({
    showContact: !prevState.showContact,
  }));


  handleProfile=()=>{
    this.setState({
        profileStatus:!this.state.profileStatus
    })
  }

  handleLogout=()=>{
    this.props.history.push('/');
  }



  render() {
    console.log(this.props);
    const { text } = this.state

    console.log(this.props.user_info)
    let data = this.props.user_info.user
    console.log(data)

    return (
      <div className="header">
        <div className=" text-white mt-2" id="logoIcon">
          <a onClick={() => this.RegisterPortal()} style={{display:'flex'}}>
          <img src={blockChainIcon} id="img4" /> &nbsp;&nbsp;
          <span style={{ fontFamily: 'Muli',fontWeight:'bold',cursor:'pointer',fontSize:'20px' }} id="textSize1">Registration Portal</span>
          </a>
        </div>
        <div className="barTools">
          <ul>
            <li className="myCursor profileDetDisplay text-white">
              
              <span
                onClick={() => this.redirectPage()}
                style={{ fontFamily: ' Muli ' }}
              >
                Home
              </span>
              <br />
            </li>{' '}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <li className="myCursor profileDetDisplay text-white ">
              <span style={{ fontFamily: ' Muli ' }} onClick={this.showContactModal}>About Us</span>
              <br />
            </li>{' '}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <li className="myCursor profileDetDisplay text-white ">
              <span style={{ fontFamily: ' Muli ' }}
              onClick={() => this.props.history.push('/')}>Logout</span>
              <br />
            </li>{' '}
            &nbsp; &nbsp; &nbsp;
            <li className="myCursor profileDetDisplay text-white">
              <button
                className="SignIn"
                style={{ fontFamily: ' Muli' }}
                text-align="center"
              >
              </button>
            </li>{' '}
            &nbsp; &nbsp; &nbsp;
            <li style={{ position: 'relative' }}>

                <a onClick={this.handleProfile}><IoIosContact className="myCursor"  color={'white'} size={30}></IoIosContact></a> &nbsp;

                {this.state.profileStatus === true &&
                    <ul style={{backgroundColor:'white',display:'initial',marginTop:'33px',width:'272px', height:'140px',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'}}>
                        <li style={{color:'#377D22',marginLeft:'-19px',marginTop:'15px',cursor:'default'}}><IoIosContact className="myCursor"  color={'#377D22'} size={25}></IoIosContact> &nbsp;{data.username} </li>
                        <li style={{color:'#377D22',marginLeft:'-15px',cursor:'default'}}><BsFillEnvelopeFill className="myCursor"  color={'#377D22'} size={18}></BsFillEnvelopeFill> &nbsp;{data.email} </li>
                        <li style={{color:'#377D22',marginLeft:'-15px',cursor:'default'}}><BsBookmarkFill className="myCursor"  color={'#377D22'} size={18}></BsBookmarkFill> &nbsp;{data.role}  </li>
                        <li style={{marginLeft:'-15px',cursor:'pointer'}} onClick={this.handleLogout}><BsArrowLeftCircleFill className="myCursor"  color={'#377D22'} size={18}></BsArrowLeftCircleFill> &nbsp; <a style={{color:'#377D22',fontWeight:'bold'}}>Logout</a> </li>
                    </ul>
                }
              {/* <IoIosContact className="myCursor" color={'white'} size={30} ></IoIosContact> */}
              &nbsp;
            </li>
          </ul>
        </div>
        <MaModalContact open={this.state.showContact} onClose={this.showContactModal}>
                <div style={{margin:'20px'}}>
                    <div style={{marginLeft:'93%',fontWeight:'bold',fontSize:'25px',cursor:'pointer'}}><a onClick={this.showContactModal}>X</a></div>
                    <div style={{marginLeft:'42%'}}><h3 style={{color:'#377D22',fontWeight:'bold'}}>About Us</h3></div>
                    <Document file={pdfFile}>
                        <Page pageNumber={1} />
                    </Document>
                    
                </div>
            </MaModalContact>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    role_info: state.login.otp_verify,
    role_err: state.login.otp_verify_error,
    user_info: state.login.otp_verify,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginApi,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBar)
