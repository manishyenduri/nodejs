import React, { Component } from 'react'
import titleIcon from '../../Assests/icon2/Bimg.svg'
import loginIcon from '../../Assests/icon2/loginIcon.svg'
import captachImg from '../../Assests/icon2/captach.PNG'
import SignIn_OTP from './Otp'
import { loginApi, forgotApi } from '../../store/Login/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import signin_bannerImg from '../../Assests/icon/signin_bannerImg.png'
import Downlogo from '../../Assests/icon/downlogo.png'
import RCG from 'react-captcha-generator';
import { BsJustify } from 'react-icons/bs';
import CaptchaTest from './CaptchaTest';
import {toast} from 'react-toastify';
import alert from 'alert'
import 'react-toastify/dist/ReactToastify.css';
import '../../style/components/Igr.css'
import * as CryptoJS from 'crypto-js'

toast.configure()
const MySwal = withReactContent(Swal);



class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email: undefined,
      password:'',
      role:'',
      Zone:'',
      District:'',
      captchas:undefined,
      booleanOTpPage:false,
      captcha:''
    }
    this.result = this.result.bind(this)
    this.handleClick = this.handleSubmit.bind(this)
  }

  

  componentDidMount() {
    localStorage.clear()
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
      window.history.pushState(null, document.title,  window.location.href);
    });
  }  


 
  componentDidUpdate = (prev) => {

    //For LOgin Data binding
    if (prev.login_res != this.props.login_res) {
      console.log('Login Data--->', this.props.login_res)
      if (this.props.login_res.status == true) {
        const encryptconfigs = {
          "key": "t700#zkrF@db0705",
          "iv": "i700#zkrF@db0705"
        }
        
        var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
        var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
        console.log(this.state.email, encryptconfigs.key,encryptconfigs.iv)
        var encryptedData = CryptoJS.AES.encrypt(this.state.email, key,{
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
           
        encryptedData = encryptedData.toString()
        console.log(encryptedData)
    
        var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
        var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
        var encryptedData1 = CryptoJS.AES.encrypt(this.state.password, key,{
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        
        encryptedData1 = encryptedData1.toString()
        console.log(encryptedData1)
        


        this.props.history.push({pathname: '/verifyOTP',state:{email:encryptedData,pass:encryptedData1}})
        

      }
    }
    if (prev.forget_res != this.props.forget_res) {
      console.log('Forgot Password--->', this.props.forget_res)
      if(this.props.forget_res.message === "Invalid mail Id")
      {
        MySwal.fire('please enter a valid email address')
      }else (
        MySwal.fire(
          'Password reset OTP has been sent to your mail',
        ).then(() => {
          this.props.history.push({
          pathname: '/otpAuth',
          state: { email: this.state.email, pass: this.state.password },
          })
        })
      )
    }
  }

  //For OnChange function  of Form
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ ...this.state, [name]: value })
    
  }
  
  //For Login Submit Button Function
  handleSubmit = (e) => {
    e.preventDefault()
    this.handleLogin()
  }

  // For Forgot Password Function
  handleForgotPass = () => {
    if(this.state.email !== undefined && this.state.email !== '' ){
      this.handleForgot()
    }else{
      MySwal.fire('please enter the email Id')
    }
  }

  

  //For Login
  handleLogin=()=>{
    const encryptconfigs = {
      "key": "t700#zkrF@db0705",
      "iv": "i700#zkrF@db0705"
    }
    
    var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
    var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
    console.log(this.state.email, encryptconfigs.key,encryptconfigs.iv)
    var encryptedData = CryptoJS.AES.encrypt(this.state.email, key,{
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
       
    encryptedData = encryptedData.toString()
    console.log(encryptedData)

    var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
    var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
    var encryptedData1 = CryptoJS.AES.encrypt(this.state.password, key,{
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    
    encryptedData1 = encryptedData1.toString()
    console.log(encryptedData1)
    // this.setState({
    //   email:encryptedData,
    //   password:encryptedData1
    // })

    if(this.state.captchas !== undefined){
      if(this.state.captchas === this.state.captcha){        
        localStorage.setItem('email_id',this.state.email) 
        const data={
          email:encryptedData,
          password:encryptedData1
        }
        this.props.loginApi(data);
      }else{
        Swal.fire("Entered Captcha is not matched");
      }
    }else{
      Swal.fire("Please enter the captcha");
    }
  }
  
  //For Forgot Password
  handleForgot = () => {
    const encryptconfigs = {
      "key": "t700#zkrF@db0705",
      "iv": "i700#zkrF@db0705"
    }
    
    var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
        var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
        var encryptedData = CryptoJS.AES.encrypt(this.state.email, key,{
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
       
        encryptedData = encryptedData.toString()
        console.log(encryptedData)
    
    console.log(this.state.email)
    const data = {
      email: encryptedData,
    }
    this.props.forgotApi(data)
    // MySwal.fire(
    //   'Password reset OTP has been sent to your mail',
    //   `${this.state.email}`,
    //   'success',
    // ).then(() => {
    //   this.props.history.push({
    //     pathname: '/otpAuth',
    //     state: { email: this.state.email },
    //   })
    // })
  }

  onPress = (e) => {
    if(e.key === "Enter"){
      this.handleLogin();
    }
  }


  //For Captcha Display
  result(text) {
    this.setState({
      captcha: text,
    })
  }

  render(){
    console.log(this.state);
    console.log(this.props);
    return (
      <div className='login-layout'>
        <div className='login-sub-layout'>
          <div className='row mt-3'>
            <div className='col-md-7  login-titleRow'>
              <img src={titleIcon} /> &nbsp;&nbsp;
              <label id="label" style={{fontFamily:'muli',fontSize:'19px'}}>Blockchained Documents Of Registration</label>
              <div className=' text' id="textSize">
                <p style={{fontFamily:'muli',fontSize:'17px',width:'124%'}}>All Tamil Nadu Registration documents secured by Tamil Nadu Blockchain backbone infrastructure.</p>
              </div>
              <div className='login-bannerImg'>
                <img src={signin_bannerImg} id="imgSize"/> &nbsp;&nbsp;    
              </div>
            </div >
            <div className='col-md-5'>
              <div className='sideLogin'>
                <div className=''>
                  <div className='row'>
                    <div className='col-md-12 loginRow1'>
                      <img src={loginIcon} /> &nbsp;&nbsp; <label style={{fontFamily:'muli',fontWeight:'bold',fontSize:'19px'}}>Sign In</label>
                    </div>
                  </div>
                  {this.state.booleanOTpPage==false? 
                    <form className='login-form pb-3 mt-4' onSubmit={this.handleSubmit}>
                      <div className='row'>
                        <div className='col-md-12'>
                          <label style={{fontWeight:'bold',fontFamily:'muli',fontSize:'17px'}}>Enter Your Email</label>
                        </div>
                        <div className='col-md-12 mt-2'>
                          <input type="email" style={{fontFamily:'muli',fontSize:'17px'}} name="email" id="inputBox" onChange={this.handleChange} value={this.state.email}  placeholder='Enter Your Email' required/>
                        </div>
                      </div>
                      <div className='row mt-4'>
                        <div className='col-md-12'>
                          <label style={{fontWeight:'bold',fontFamily:'muli',fontSize:'17px'}}>Enter Your Password</label>
                        </div>
                        <div className='col-md-12 mt-2'>
                          <input type="password" name="password" style={{fontFamily:'muli',fontSize:'17px'}} id="inputBox" onChange={this.handleChange} value={this.state.password} placeholder='Enter Your Password' required/>
                        </div>
                      </div>
                      <div className='row mt-4'>
                        <div className='col-md-12'>
                          <label style={{fontWeight:'bold',fontFamily:'muli',fontSize:'17px'}}>Enter The Captcha</label>
                        </div>
                        <div className='col-md-12'  style={{float:'right'}}>
                          <CaptchaTest getCaptchaValue={this.result} />
                        </div>
                        <div className='col-md-12 mt-2'>
                          <input type="text" placeholder='Enter The Captcha' name="captchas"  style={{padding: '7px',borderRadius: '5px',width: '90%',backgroundColor: '#E8F0FE',border:'none',fontSize:'17px'}} onChange={this.handleChange} onKeyPress={this.onPress}  value={this.state.captchas} />
                        </div>
                      </div>
                      <div className='row mt-5 mb-3 '>
                        <div className='col-md-12 '>
                          <button className='login-submit' type="submit" id="Login" style={{fontFamily:'muli'}}>Log In</button>
                        </div>
                      </div>
                      <div className='row mt-0 mb-3 '>
                        <div className='col-md-12 '>
                          <a className='forgot-psswrd' type="password" onClick={this.handleForgotPass} style={{color:'green',cursor:'pointer',fontFamily:'muli',fontSize:'16px'}}>Forgot Password ?</a>
                        </div>
                      </div>
                    </form>
                  : <SignIn_OTP history={this.props.history}></SignIn_OTP> 
                  }
                </div>
              </div>
            </div> 
          </div>
          <div className="row" style={{marginTop:'2%',marginLeft:'40%'}}>                    
            <div style={{display: 'flex'}}>
              <img src={Downlogo} style={{height:'25px'}}/>
              <p style={{fontSize:'13px',marginLeft:'1%',fontFamily:'muliItalic'}}>Powered By Nambikkai Inaiyam</p>
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
    login_res: state.login.login_response,
    login_res_err: state.login.login_response_err,
    //forget call
    forget_res: state.login.forget_response,
    forget_res_err: state.login.forget_res_err,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginApi,
      forgotApi,
    },
    dispatch,
  )
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login)
