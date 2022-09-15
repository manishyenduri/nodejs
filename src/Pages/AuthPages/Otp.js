import React, {Component} from 'react';
import signin_bannerImg from '../../Assests/icon/signin_bannerImg.png'
import Downlogo from '../../Assests/icon/downlogo.png'
import titleIcon from '../../Assests/icon2/Bimg.svg'
import loginIcon from '../../Assests/icon2/loginIcon.svg'
import OTPInput, { ResendOTP } from "otp-input-react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {otpVerification} from '../../store/Login/action'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { loginApi } from '../../store/Login/action'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import * as CryptoJS from 'crypto-js'

toast.configure()
const MySwal = withReactContent(Swal);

class SignIn_OTP extends Component{

    constructor(props){
        super(props);
        this.state={
            otp: "",
            timmer: '',
            time: new Date().toLocaleString(),
            valid: false,
            data:'',
            minutes: 3,
            seconds: 0,
        }
    }

   

    componentDidMount() {
        console.log(this.props)
        if(this.props.history.location.state === undefined){
          this.props.history.push('/')
        }
        this.myInterval = setInterval(() => {
          const { seconds, minutes } = this.state

          if (seconds > 0) {
              this.setState(({ seconds }) => ({
                  seconds: seconds - 1
              }))
          }
          if (seconds === 0) {
              if (minutes === 0) {
                  clearInterval(this.myInterval)
              } else {
                  this.setState(({ minutes }) => ({
                      minutes: minutes - 1,
                      seconds: 59
                  }))
              }
          } 
      }, 1000)

      
    }


    handleOtpChange = (event) => {
        console.log(event)
        this.setState({
            otp: event,
        })
    }
 

setErrors = error =>
  this.setState({
    errors: { ...this.state.errors, ...error }
  });

  handleSubmitOtp=()=>{
    if(this.state.minutes !== 0 || this.state.seconds !== 0){
      console.log("ok data")
      const encryptconfigs = {
        "key": "t700#zkrF@db0705",
        "iv": "i700#zkrF@db0705"
      }
      
      var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
          var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
          var encryptedData = CryptoJS.AES.encrypt(this.state.otp, key,{
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          });
         
          encryptedData = encryptedData.toString()
          console.log(encryptedData)

          // var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
          // var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
          var encryptedDataemail = CryptoJS.AES.encrypt(this.props.location.state.email, key,{
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          });

          encryptedDataemail = encryptedDataemail.toString()
          console.log(encryptedDataemail)
      
      const body={
          email: this.props.location.state.email,
          otp : encryptedData
      }
      this.props.otpVerification(body)   
    }else{
      MySwal.fire('Times Up').then(() => this.props.history.push('/'))
    }
  }

    componentDidUpdate = (prev) => {
      if(prev.otpVerify !== this.props.otpVerify){
        if (this.props.otpVerify.status == true) {
          console.log(this.props.otpVerify.user)
          if (this.props.otpVerify.user.role == 'SRO') {
              localStorage.setItem('auth_token', this.props.otpVerify.user.token)
              localStorage.setItem('refresh_token', this.props.otpVerify.user.refreshtoken)
              toast.success('Login Successful');
              this.props.history.push({
                pathname: '/registration-dashboard4',
                state: {
                  role: this.props.otpVerify.user.role,
                  zone: this.props.otpVerify.user.Zone,
                  district: this.props.otpVerify.user.District,
                  SRO: this.props.otpVerify.user.SRO,
                },
              })
          }
          if (this.props.otpVerify.user.role == 'DRO') {
              localStorage.setItem('auth_token', this.props.otpVerify.user.token)
              localStorage.setItem('refresh_token', this.props.otpVerify.user.refreshtoken)
              toast.success('Login Successful');
              this.props.history.push({
                pathname: '/registration-dashboard2',
                state: {
                  role: this.props.otpVerify.user.role,
                  zone: this.props.otpVerify.user.Zone,
                  district: this.props.otpVerify.user.District,
                },
              })
          }
          if (this.props.otpVerify.user.role == 'DIG') {
              localStorage.setItem('auth_token', this.props.otpVerify.user.token)
              console.log(this.props.otpVerify.user)
              localStorage.setItem('refresh_token', this.props.otpVerify.user.refreshtoken)
              toast.success('Login Successful');
              this.props.history.push({
                pathname: '/registration-dashboard3',
                state: {
                  role: this.props.otpVerify.user.role,
                  zone: this.props.otpVerify.user.Zone,
                  district: this.props.otpVerify.user.District,
                },
              })
          }
          if (this.props.otpVerify.user.role == 'IGR') {
              localStorage.setItem('auth_token', this.props.otpVerify.user.token)
              console.log(this.props.otpVerify.user)
              localStorage.setItem('refresh_token', this.props.otpVerify.user.refreshtoken)
              toast.success('Login Successful');
              this.props.history.push({
                pathname: '/registration-dashboard',
                state: { role: this.props.otpVerify.user.role },
              })
          }
          if (this.props.otpVerify.user.role == 'admin') {
              localStorage.setItem('auth_token', this.props.otpVerify.user.token)
              console.log(this.props.otpVerify.user)
              localStorage.setItem('refresh_token', this.props.otpVerify.user.refreshtoken)
              toast.success('Login Successful');
              this.props.history.push({
                pathname: '/registration-dashboard',
                state: { role: this.props.otpVerify.user.role,data:"Login" },
              })
          }
          
          
        }
      }
      if (prev.login_res != this.props.login_res) {
        if (this.props.login_res.status == true) {          
          toast.success(" Otp sent to your resgistered email Id")
        }
      }

      if (prev.login_res_err != this.props.login_res_err) {
          toast.success(" Otp Error")
      }
    }


    componentWillUnmount() {
      clearInterval(this.myInterval)
  }

    resendotp = () => {
      const data={
        email:this.props.history.location.state.email,
        password:this.props.history.location.state.pass
      }
      this.props.loginApi(data);
    }

    onPress=(e)=>{
      if(e.key === 'Enter'){
        this.handleSubmitOtp()
      }
    }

    render(){
      
      
      console.log(this.state)
      console.log(this.props)
      const { minutes, seconds } = this.state
        return (
            <div className='login-layout'>
            <div className='login-sub-layout'>
              <div className='row mt-3'>
                <div className='col-md-7  login-titleRow'>
                  <div>
                  <img src={titleIcon} /> &nbsp;&nbsp;
                  <label style={{fontSize:'19px'}}>Blockchained Documents Of Registration</label>
                  <div className=' text' id="text" style={{fontSize:'17px',width:'76%'}}>
                    All Tamil Nadu Registration documents secured by Tamil Nadu Blockchain backbone infrastructure.
                  </div>
                  <div className='login-bannerImg'>
                    <img src={signin_bannerImg}  id="sideImg"/> &nbsp;&nbsp;    
                  </div>
                  </div>
                </div >
                <div className='col-md-5'>
                  <div className='login-card'>
                    <div className='login-card-sub-layout'>
                        <div className='row'>
                            <div className='col-md-12 loginRow1'>
                                <img src={loginIcon} /> &nbsp;&nbsp; <label style={{color:'#292828D8',fontSize:'19px',fontWeight:'bold'}}>Sign In</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <label style={{color:'#292828D8',fontSize:'17px',marginTop:'40px',fontWeight:'600'}}>Enter OTP from your Registered Email Id?</label>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:'30px'}}>                            
                            <div id="OtpBox" onKeyPress={this.onPress}><OTPInput value={this.state.otp} onChange={this.handleOtpChange} autoFocus OTPLength={6} otpType="number" disabled={false} secure /></div>
                        </div>
                        <div id="rsndOtp" >
                          <a onClick={() => this.resendotp()} style={{color:'#377D22',fontSize:'17px',cursor:'pointer'}}>Didn’t Receive Code Resend OTP?</a>
                        </div>
                        <div className='row mt-5 mb-3 '>
                            <div className='col-md-12 ' style={{display:'flex'}}>
                                <button  onClick={() => this.handleSubmitOtp()} className='login-submit' type="submit" style={{color:'white',backgroundColor:'#20570F',border:'none',borderRadius:'5px',padding:'5px 10px',fontWeight:'bold'}}>Log In</button>
                                
                                { minutes === 0 && seconds === 0
                                    ? <h1 style={{fontSize: '17px',marginLeft: '10px',marginTop: '10px'}}>Times Up
                                    !</h1>
                                    : <h1 style={{fontSize: '17px',marginLeft: '10px',marginTop: '10px'}}>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
                            </div>
                        </div>
                    </div>
                  </div>
                </div> 
              </div>
              <div className="row" style={{marginTop:'2%',marginLeft:'40%'}}>                    
                <div style={{display: 'flex'}}>
                  <img src={Downlogo} style={{height:'25px'}}/>
                  <p style={{fontSize:'13px',marginLeft:'1%'}}>Powered By Nambikkai Inaiyam</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
      otpVerify:state.login.otp_verify,
      otp_verify_error: state.login.otp_verify_error,
      login_res: state.login.login_response,
      login_res_err: state.login.login_response_err,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        otpVerification,
        loginApi
      },
      dispatch,
    )
  }
  
  // export default Login;
  export default connect(mapStateToProps, mapDispatchToProps)(SignIn_OTP)
  
