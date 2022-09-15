import React, {Component} from 'react';
import titleIcon from '../../Assests/icon2/Bimg.svg';
import loginIcon from '../../Assests/icon2/loginIcon.svg';
import captachImg from '../../Assests/icon2/captach.PNG';
import SignIn_OTP from './Otp';
import { loginApi , OtpVerified ,forgotApi} from '../../store/Login/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import signin_bannerImg from '../../Assests/icon/signin_bannerImg.png'
import RCG from 'react-captcha-generator';
import { BsJustify } from 'react-icons/bs';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPInput, { ResendOTP } from "otp-input-react";
import * as CryptoJS from 'crypto-js'

toast.configure()
const MySwal = withReactContent(Swal);

class Forget_OTP extends Component{

   
    constructor(props){
        super(props);
        this.state={
            email:'',
            booleanOTpPage:false,
            otp: "",
            minutes: 3,
            seconds: 0,
        }
    }

    validateOTP=()=>{
        this.props.history.push('/changePassword')
    }

    //OnChange function for OTP input Box
    handleOtpChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    //Submit button function for Otp Verification
    handleVerifyOTP=()=>{

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
        

              var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
              var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
              var encryptedData1= CryptoJS.AES.encrypt(this.props.location.state.email, key,{
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
              });
             
              encryptedData1 = encryptedData1.toString()
              console.log(encryptedData1)
        
        if(this.state.minutes !== 0 || this.state.seconds !== 0){
        console.log("otp verify");
        const data={
            email:encryptedData1,
            otp: encryptedData
        }
        this.props.OtpVerified(data);
        }else{
            MySwal.fire('Times Up').then(() => this.props.history.push('/'))
          }

    }

    componentDidMount() {
        console.log(this.props);
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

    componentDidUpdate(prevProps) {

        //For Check OTP is verified  successfully or not
       if(prevProps.verify_otp !== this.props.verify_otp){
            console.log(this.props.verify_otp);
            MySwal.fire(this.props.verify_otp.message)
            .then(() =>
                this.props.history.push({
                    pathname: '/ChangePassword',
                    state: {
                        token: this.props.verify_otp.token,
                        email:this.props.location.state.email,
                    },
                }),
            )
        }

        //For Verify OTP error message
        if(prevProps.VerifyOtp_err !== this.props.VerifyOtp_err){
            console.log(prevProps.VerifyOtp_err)
            toast.error('Invalid OTP');
        }
    }

    handleOtpChange = (event) => {
        console.log(event)
        this.setState({
            otp: event,
        })
    }
    

    resendotp = () => {
        const data={
          email:this.props.history.location.state.email,
        }
        this.props.forgotApi(data);
      }
    render(){
        console.log(this.state);
        console.log(this.props);
        const { minutes, seconds } = this.state
        return (
            <div className='login-layout'>
                <div className='login-sub-layout'>
                    <div className='row mt-3'>
                        <div className='col-md-8  login-titleRow'>
                            <img src={titleIcon} /> &nbsp;&nbsp;
                            <label>Blockchained Documents Of Registration</label>
                            <div className=' text'>
                                All Tamil Nadu Registration documents secured by Tamil Nadu Blockchain backbone infrastructure.
                            </div>
                        
                            <div className='login-bannerImg'>
                                <img src={signin_bannerImg} /> &nbsp;&nbsp;    
                            </div>
                        </div >              
                        <div className='col-md-4'>
                            <div className='login-card'>
                                <div className='login-card-sub-layout'>
                                    <div className='row'>
                                        <div className='col-md-12 loginRow1'>
                                            <img src={loginIcon} /> &nbsp;&nbsp; <label>Enter OTP </label>
                                        </div>
                                    </div>
                                    <div className='col mt-4'>
                                        <div className='col-md-12'>
                                        <OTPInput value={this.state.otp} onChange={this.handleOtpChange} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                                        <div id="rsndOtp" >
                                            <a style={{cursor:'pointer'}} onClick={() => this.resendotp()} style={{color:'#377D22'}}>Didn’t Receive Code Resend OTP?</a>
                                        </div>
                                        <div className='row mt-5 mb-3 '>
                                            <div className='col-md-12 ' style={{display:'flex'}}>
                                                <button  onClick={() => this.handleVerifyOTP()} className='login-submit' type="submit" style={{color:'white',backgroundColor:'#20570F',border:'none',borderRadius:'5px',padding:'5px 10px'}}>Log In</button>
                                                { minutes === 0 && seconds === 0
                                                    ? <h1 style={{fontSize: '15px',marginLeft: '10px',marginTop: '10px'}}>Times Up!</h1>
                                                    : <h1 style={{fontSize: '15px',marginLeft: '10px',marginTop: '10px'}}>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                                                }
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
        login_res: state.login.otp_verify,
        login_res_err: state.login.otp_verify_error,
        verify_otp: state.login.verify_otp,
        forget_res: state.login.forget_response,
        forget_res_err: state.login.forget_res_err,
        VerifyOtp_err: state.login.verify_otp_err.data
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            loginApi,
            OtpVerified,
            forgotApi,
        },
        dispatch,
    )
}
  

export default connect(mapStateToProps, mapDispatchToProps) (Forget_OTP);