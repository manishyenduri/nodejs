import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BsBell,BsChat, BsFillMenuButtonFill} from 'react-icons/bs';
import {GiTireIronCross} from 'react-icons/gi';
import somaniIcon from'../../Assests/icon2/Somani group logo icon.svg';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {IoIosContact} from 'react-icons/io';
import { BsFillEnvelopeFill , BsBookmarkFill, BsArrowLeftCircleFill } from "react-icons/bs";
import {RiArrowDownSLine} from 'react-icons/ri';
import { loginApi , forgotApi } from '../../store/Login/action';
import MaModalContact from '../ModalPopUp.jsx'
import blockChainIcon from'../../Assests/icon2/Bimg.svg';
import '../../style/components/Igr.css'
import { Document, Page } from 'react-pdf';
import pdfFile from '../../Assests/icon2/About us BC-TNeGA.pdf'

class HorizontalBarForIGR extends Component{
    constructor(props){
        super(props);
        this.state={
            openDrawer:false,
            role:'',
            text: "IGR" ,  
            showContact: false,
            profileStatus: false
        }
    }
    handleLogin=()=>{
        const data={
            role:this.state.role,
     }
        this.props.loginApi(data);
    }

    componentDidMount(){
        if(localStorage.getItem('auth_token') === null){
          this.props.history.push('/')
        }
      }


     switchUser = () => {
        let select=document.getElementById("roles")
        let value=select.options[select.selectedIndex].value

          this.setState({ value }); 
          console.log("text", value)
       
            if(value=="Super Admin" ){
            this.props.history.push({pathname:'/superadmin/first',state:{data:"Login"}});
            }

            if(value=="Logout" ){
                localStorage.clear()
                this.props.history.push('/');
                }
            
            if(value=="DIG" ){
                this.props.history.push('/registration-dashboard2');
            }

            if(value=="DRO" ){
                this.props.history.push('/registration-dashboard3');
            }
            if(value=="SRO" ){
                this.props.history.push('/registration-dashboard4');
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
    render(){
        console.log(this.state)
        const { text } = this.state

        console.log(this.props.user_info)
        let data = this.props.user_info.user
        console.log(data)

        return  <div className="header">
            {/* <div className="hamBurgerMenu">
                {!this.state.openDrawer?<BsFillMenuButtonFill color={'white'} onClick={this.props.switchDrawerOn} size={24}></BsFillMenuButtonFill>
                :<GiTireIronCross  color={'white'} onClick={this.props.switchDrawerOff}></GiTireIronCross>}
            </div> */}
            <div className="bigIcon text-white mt-2" id="logoIcon">
                    <a style={{display:'flex'}}><img src={blockChainIcon} id="img2"/> &nbsp;&nbsp;<span id="logoName">Registration Portal</span></a>
            </div> 
            <div className="barTools">
                    <ul>
                    <li className="myCursor profileDetDisplay text-white" >
                            <span onClick={()=>this.props.history.push({pathname:'/registration-dashboard',state:{data:"Login"}})} style={{fontFamily:' Muli '}}>Home</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                        
                        {/* <li className="myCursor profileDetDisplay text-white" >
                            <span style={{fontFamily:' Muli '}}  >Help</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp; */}
                        <li className="myCursor profileDetDisplay text-white " >
                            <span style={{fontFamily:' Muli '}} onClick={this.showContactModal}>About Us</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                     
                        <li className="myCursor profileDetDisplay text-white" >
                           
                            <button className='SignIn'  style={{fontFamily:' Muli'}} text-align="center">

                            <select className='dropdown ' style={{color:'white'}}  id="roles" onChange={()=> {this.switchUser()}} >
                            <option value="IGR"  style={{color:'black'}} >{text}</option>
                                  <option value="Super Admin" style={{color:'black'}} > Operator </option>
                                  <option value="Logout" style={{color:'black'}} > Logout </option>
                                  {/* <option value="DIG" style={{color:'black'}} > DIG </option>
                                  <option value="DRO" style={{color:'black'}} >DRO </option>
                                  <option value="SRO" style={{color:'black'}} > SRO </option> */}


                            </select> 
                            {/* <button onClick={ () => {{this.state.isbtnClkd=true } this.switchUser("SuperAdmin")}  } style={{color:'white' , fontFamily:' Muli ', fontWeight:'' , backgroundColor: 'Transparent', border:'none'}}>{text}</button> */}

                          </button>
                        </li> &nbsp; &nbsp; &nbsp;
                        <li style={{position:'relative'}}>

                        <a onClick={this.handleProfile}><IoIosContact className="myCursor"  color={'white'} size={30}></IoIosContact></a> &nbsp;

                            {this.state.profileStatus === true &&
                                <ul style={{backgroundColor:'white',display:'initial',marginTop:'33px',width:'272px', height:'140px',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'}}>
                                    <li style={{color:'#377D22',marginLeft:'-19px',marginTop:'15px',cursor:'default'}}><IoIosContact className="myCursor"  color={'#377D22'} size={25}></IoIosContact> &nbsp;{data.username} </li>
                                    <li style={{color:'#377D22',marginLeft:'-15px',cursor:'default'}}><BsFillEnvelopeFill className="myCursor"  color={'#377D22'} size={18}></BsFillEnvelopeFill> &nbsp;{data.email} </li>
                                    <li style={{color:'#377D22',marginLeft:'-15px',cursor:'default'}}><BsBookmarkFill className="myCursor"  color={'#377D22'} size={18}></BsBookmarkFill> &nbsp;{data.role}  </li>
                                    <li style={{marginLeft:'-15px',cursor:'pointer'}} onClick={this.handleLogout}><BsArrowLeftCircleFill className="myCursor"  color={'#377D22'} size={18}></BsArrowLeftCircleFill> &nbsp; <a style={{color:'#377D22',fontWeight:'bold'}}>Logout</a> </li>
                                </ul>
                            }
                            
                            {/* <IoIosContact onClick={() => this.profileHandle()} className="myCursor" color={'white'} size={30}></IoIosContact> &nbsp; */}
                                  {/* {this.state.profileStatus == true &&
                                    <ul style={{backgroundColor:'white',borderRadius:'5px',border:'2px 5px grey',display:'initial'}}>
                                        <li>Logout</li>&nbsp; &nbsp; &nbsp;
                                        <li>Logout</li>&nbsp; &nbsp; &nbsp;
                                        
                                    </ul>
                                  } */}
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
                    {/* <div className="row">
                        <p style={{fontSize:'20px',fontWeight:'bold',textDecoration:'underline',color:'#377D22'}}>Tamil Nadu e-Governance Agency</p>
                        <p>Tamil Nadu e-Governance Agency (TNeGA), as a State Nodal Agency has been formed to support and drive all e-Governance
                            initiatives of the Government of Tamil Nadu. TNeGA is implementing various e-Governance projects with the objective of making
                            all Government services, wherever feasible & accessible to the common man in an efficient and transparent manner. Major
                            citizen facing initiatives of TNeGA include setting up and operating the e-Sevai online portal and CSC centres, Nambikkai
                            Inaiyam (Tamil Nadu Blockchain Backbone) and the Tamil Nadu State Family Database to name a few.
                        </p>
                    </div>
                    <div className="row" style={{marginTop:'20px'}}>
                        <p style={{fontSize:'20px',fontWeight:'bold',textDecoration:'underline',color:'#377D22'}}>Nambikkai Inaiyam</p>
                        <p>Nambikkai Inaiyam is the Tamil Nadu Blockchain Backbone platform. It is a modular Blockchain as a Service
                            platform that is being leveraged by the Tamil Nadu government departments for building secure and efficient
                            eGovernance services for the residents and businesses of Tamil Nadu</p>
                    </div>
                    <div className="row" style={{marginTop:'20px'}}>
                        <p style={{fontSize:'20px',fontWeight:'bold',textDecoration:'underline',color:'#377D22'}}>e-Pattagam</p>
                        <p>The e-Pattagam wallet allows residents of Tamil Nadu to securely store and share their documents with service providers,
                            employers and authorities. The wallet leverages Nambikkai Inaiyam to securely store the documents and provide a secure
                            and fool proof verification methodology for digitized data, documents and certificates. Presently the wallet
                            supports more than 30 certificate types.</p>
                    </div> */}
                </div>
            </MaModalContact> 
        </div>
    }
}

const mapStateToProps = (state) =>{
    return {
            role_info:state.login.login_response,
            role_err:state.login.login_response_err,
            user_info: state.login.otp_verify,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        loginApi

    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HorizontalBarForIGR)