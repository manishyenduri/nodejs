import React, { Component } from 'react';
import titleIcon from '../../Assests/icon2/Bimg.svg';
import loginIcon from '../../Assests/icon2/loginIcon.svg';
import captachImg from '../../Assests/icon2/captach.PNG';
import SignIn_OTP from './Otp';
import { loginApi , changePassword } from '../../store/Login/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import signin_bannerImg from '../../Assests/icon/signin_bannerImg.png'
import RCG from 'react-captcha-generator';
import { BsJustify } from 'react-icons/bs';
const MySwal = withReactContent(Swal);



class ChangePass extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            newPassword:'',
            confirmPassword:'',
            role:'',
            Zone:'',
            District:'',
            booleanOTpPage:false,
            captcha:'',
            captchas:'',
          
        }

    }


    //OnChange function for input box 
    handleChange=(e)=>{
        const {name, value} = e.target;
        this.setState({...this.state,[name]:value})
        
    }


    //Submit Button function for change password
    handleChangePassword = () => {
        const data={
            email : this.props.location.state.email,
            newpassword : this.state.newPassword,
            confirmpassword : this.state.confirmPassword,
            token: this.props.location.state.token,
        }
        console.log(data);
        this.props.changePassword(data);
        // MySwal.fire(
        //    "Password Successfully Changes"
        // ).then(() => this.props.history.push('/'))
    }

    componentDidUpdate(prev) {
        if(prev.passChange_err !== this.props.passChange_err){
            console.log(this.props.passChange_err)
            MySwal.fire(
                this.props.passChange_err.data.message
            ).then(() => this.props.history.push('/'))
        }
        if(prev.Password_change !== this.props.Password_change){
            MySwal.fire(
            "Password Successfully Changes"
            ).then(() => this.props.history.push('/'))
        }
    }


    render(){
        console.log(this.state);
        console.log(this.props);
        if(this.props.history.location.state === undefined){
            this.props.history.push('/')
        }
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
                                            <img src={loginIcon} /> &nbsp;&nbsp; <label style={{fontFamily:'muli',fontWeight:'bold'}}>Change the Password</label>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <label style={{fontFamily:'muli',fontWeight:'600'}}>New Password</label>
                                        </div>
                                        <div className='col-md-12 mt-2'>
                                            <input type="password" name="newPassword" style={{width:'90%',borderRadius:'5px',border:'1px solid back',fontFamily:'muli'}} minlength="8" onChange={this.handleChange} value={this.state.newPassword}  placeholder='new Password' required/>
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col-md-12'>
                                            <label style={{fontFamily:'muli',fontWeight:'600'}}>Confirm Password</label>
                                        </div>
                                        <div className='col-md-12 mt-2'>
                                            <input type="password" name="confirmPassword" style={{width:'90%',borderRadius:'5px',border:'1px solid back',fontFamily:'muli'}} minlength="8" onChange={this.handleChange} value={this.state.confirmPassword} placeholder='confirm  Password' required/>
                                        </div>
                                    </div>
                                    <div className='row mt-5 mb-3 '>
                                        <div className='col-md-12 '>
                                            <button className='login-submit' style={{border:'2px solid #377D22',backgroundColor:'#377D22',borderRadius:'5px',color:'white'}} type="submit" onClick={this.handleChangePassword}>Change Password</button>
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
        Password_change: state.login.change_password,
        passChange_err : state.admin.change_password_err
    }
     
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        loginApi ,
        changePassword,
       },dispatch);
}


// export default Login;
export default connect(mapStateToProps,mapDispatchToProps)(ChangePass);