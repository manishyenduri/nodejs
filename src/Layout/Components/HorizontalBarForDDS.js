import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BsBell,BsChat, BsFillMenuButtonFill} from 'react-icons/bs';
import {GiTireIronCross} from 'react-icons/gi';
import somaniIcon from'../../Assests/icon2/Somani group logo icon.svg';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {IoIosContact} from 'react-icons/io';
import {RiArrowDownSLine} from 'react-icons/ri';
import { loginApi , forgotApi } from '../../store/Login/action';

import blockChainIcon from'../../Assests/icon2/Bimg.svg';

class HorizontalBarForDDS extends Component{
    constructor(props){
        super(props);
        this.state={
            openDrawer:false,
            role:'',
            text: ""
            
        }
    }
    handleLogin=()=>{
        const data={
            role:this.state.role,
     }
        this.props.loginApi(data);
    }


    //  switchUser = (text ) => {

    //       this.setState({ text }); 
         
       
                    
    //         this.props.history.push('/superadmin/first');
            
    // }

    componentDidMount(){
        if(localStorage.getItem('auth_token') === null){
          this.props.history.push('/')
        }
      }

    
    render(){
        const { text } = this.state
        return  <div className="header">
            <div className="hamBurgerMenu">
                {!this.state.openDrawer?<BsFillMenuButtonFill color={'white'} onClick={this.props.switchDrawerOn} size={24}></BsFillMenuButtonFill>
                :<GiTireIronCross  color={'white'} onClick={this.props.switchDrawerOff}></GiTireIronCross>}
            </div>
            {/* <div className="bigIcon text-white">
                    <img src={blockChainIcon} style={{height:'70%'}}/> &nbsp;&nbsp;<span style={{fontFamily:'Muli'}}>Registration Portal</span>
            </div>  */}
            <div className="bigIcon text-white mt-2">
                    <a style={{display:'flex'}}><img src={blockChainIcon} id="img1"/> &nbsp;&nbsp;<span id="textSize1">Registration Portal</span></a>
            </div> 
            <div className="barTools">
                    <ul>
                    <li className="myCursor profileDetDisplay text-white" >
                            <span onClick={()=>this.props.history.push('/')} style={{fontFamily:' Muli '}}>Home</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                        
                        <li className="myCursor profileDetDisplay text-white" >
                            <span style={{fontFamily:' Muli '}} onClick={()=>this.props.history.push('/sro-blockchain-documents-of-regis')} >Help</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                        <li className="myCursor profileDetDisplay text-white " >
                            <span style={{fontFamily:' Muli '}} >About Us</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                     
                        <li className="myCursor profileDetDisplay text-white" >
                           
                            <button className='SignIn'  style={{fontFamily:' Muli'}} text-align="center">
{/* 
                            <select className='dropdown ' style={{color:'white'}}  >
                                  <option style={{color:'black'}}  >Sign In</option>
                                    <option style={{color:'black'}}>DIG</option>
                                    <option style={{color:'black'}}>DRO</option>
                                    <option style={{color:'black'}}>SRO</option>
                                    <option style={{color:'black'}}>{this.state.role}</option>
                            </select> */}
                            {/* <button onClick={ () => {{this.state.isbtnClkd=true } this.switchUser("SuperAdmin")}  } style={{color:'white' , fontFamily:' Muli ', fontWeight:'' , backgroundColor: 'Transparent', border:'none'}}>{text}</button> */}

                          </button>
                        </li> &nbsp; &nbsp; &nbsp;
                        <li style={{position:'relative'}}>
                            
                            <IoIosContact className="myCursor" color={'white'} size={30}></IoIosContact> &nbsp;
        
                        </li>
                    </ul>
            </div>   
        </div>
    }
}

const mapStateToProps = (state) =>{
    return {
            role_info:state.login.login_response,
            role_err:state.login.login_response_err
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        loginApi

    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HorizontalBarForDDS)