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
import HorizontalBar from './HorizontalBar';
import blockChainIcon from'../../Assests/icon2/Bimg.svg';
// import HorizontalBarForSuperAdmin from './HorizontalBarForSuperAdmin';

class HorizontalBarForAdmin extends Component{
    constructor(props){
        super(props);
        this.state={
            openDrawer:false,
            text: "",
            isbtnClkd:false,
            profileStatus:false
            
        }
    }

    switchUser = (text ) => {
          this.setState({ text }); 
          console.log(text)
            
            let select=document.getElementById("roles")
          let value=select.options[select.selectedIndex].value
          this.setState({ value }); 
          console.log("text", value)

            // this.state.text="Super Admin"
            if(value=='Logout' ){
                this.props.history.push('/');
            } 
            else 
            if(value== 'IGR') {
                this.props.history.push({pathname: '/registration-dashboard',
                state: { data:"Login" },});
            } 
            else{
                this.props.history.push({pathname:'/superadmin/first',state:{data:"Login"}});
                 }
                 
                 
               
               
    }


    componentDidMount(){
        if(localStorage.getItem('auth_token') === null){
          this.props.history.push('/')
        }
      }

      handleProfile=()=>{
        this.setState({
            profileStatus:!this.state.profileStatus
        })
      }

      handleLogout=()=>{
        this.props.history.push('/');
      }
    
    render(){
        const { text } = this.state
        console.log(this.props.user_info)
        let data = this.props.user_info.user
        console.log(data)
        return  <div className="header">
            {/* <div className="hamBurgerMenu">
                {!this.state.openDrawer?<BsFillMenuButtonFill color={'white'} onClick={this.props.switchDrawerOn} size={24}></BsFillMenuButtonFill>
                :<GiTireIronCross  color={'white'} onClick={this.props.switchDrawerOff}></GiTireIronCross>}
            </div> */}
            <div className="bigIcon text-white" id="logoIcon">
            <a onClick={()=>this.props.history.push('/registration-dashboard')} style={{cursor: 'pointer',display:'flex'}}><img src={blockChainIcon} id="img3"/> &nbsp;&nbsp;<span id="textSize2">Registration Portal</span></a>
            </div> 
            <div className="barTools">
                    <ul>
                    <li className="myCursor profileDetDisplay text-white" >
                            <span  style={{fontFamily:' Muli '}} onClick={()=>this.props.history.push({pathname:'/superadmin/first',state:{data:"Login"}})}>Users</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                        
                        <li className="myCursor profileDetDisplay text-white" >
                            <span style={{fontFamily:' Muli '}} onClick={()=>this.props.history.push({pathname:'/admin/misreport',state:{data:"Login"}})} >MIS Report</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                        <li className="myCursor profileDetDisplay text-white " >
                            <span style={{fontFamily:' Muli '} } onClick={()=>this.props.history.push({pathname:'/admin/adduser',state:{data1:"Login"}})}  >Add User</span><br/>
                           
                        </li> &nbsp; &nbsp; &nbsp;
                        <li className="myCursor profileDetDisplay text-white" >
                            {/* <span style={{fontFamily:' Muli'}}>Super Admin</span><br/> */}
                                
                            
                        </li> &nbsp; &nbsp; &nbsp;
                        {/* <li style={{position:'relative'}}> */}
                        {/* <button className='SignIn'  style={{fontFamily:' Muli'}} text-align="center"> */}

                                {/* <select className='dropdown ' style={{color:'white'}}  >
                                    <option style={{color:'black'}}  >Sign In</option>
                                        <option style={{color:'black'}}>DIG</option>
                                        <option style={{color:'black'}}>DRO</option>
                                        <option style={{color:'black'}}>SRO</option>
                                </select> */}
                                {/* </button>    */}

                                
                     <li className="myCursor profileDetDisplay text-white" >
                           
                           <button className='SignIn'  style={{fontFamily:' Muli'}} text-align="center">
{/* 
                           <select className='dropdown ' style={{color:'white'}}  >
                                 <option style={{color:'black'}}  >Sign In</option>
                                   <option style={{color:'black'}}>DIG</option>
                                   <option style={{color:'black'}}>DRO</option>
                                   <option style={{color:'black'}}>SRO</option>
                                //    <option style={{color:'black'}}>{this.state.role}</option>
                           </select> */}
{/*                         
                           <button onClick={ () => {{this.state.isbtnClkd=true } this.switchUser("Super Admin")}  } style={{color:'white' , fontFamily:' Muli ', fontWeight:'' , backgroundColor: 'Transparent', border:'none'}}>{text}</button> */}

                                    <select className='dropdown ' style={{color:'white'}}  id="roles" onChange={()=> {this.switchUser({})}} >
                                                                <option value="Super Admin"  style={{color:'black'}} >Operator</option>
                                                                <option value="IGR" style={{color:'black'}} >IGR</option>
                                                                <option value="Logout" style={{color:'black'}}>Logout</option> 
                                                                </select> 



                         </button>
                       </li> &nbsp; &nbsp; &nbsp;
                       {/* </li> */}

                       <li style={{position:'relative'}}>

                            <a onClick={this.handleProfile}><IoIosContact className="myCursor"  color={'white'} size={30}></IoIosContact></a> &nbsp;

                            {this.state.profileStatus === true &&
                                <ul style={{backgroundColor:'white',display:'initial',marginTop:'33px',width:'272px', height:'140px',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'}}>
                                    <li style={{color:'#377D22',marginLeft:'-19px',marginTop:'15px',cursor:'default'}}><IoIosContact className="myCursor"  color={'#377D22'} size={25}></IoIosContact> &nbsp;{data.username} </li>
                                    <li style={{color:'#377D22',marginLeft:'-15px',cursor:'default'}}><BsFillEnvelopeFill className="myCursor"  color={'#377D22'} size={18}></BsFillEnvelopeFill> &nbsp;{data.email} </li>
                                    <li style={{color:'#377D22',marginLeft:'-15px',cursor:'default'}}><BsBookmarkFill className="myCursor"  color={'#377D22'} size={18}></BsBookmarkFill> &nbsp;{data.role}  </li>
                                    <li style={{marginLeft:'-15px',cursor:'pointer'}} onClick={this.handleLogout}><BsArrowLeftCircleFill className="myCursor"  color={'#377D22'} size={18}></BsArrowLeftCircleFill> &nbsp; <a style={{color:'black',fontWeight:'bold'}}>Logout</a> </li>
                                </ul>
                            }
                            {/* <RiArrowDownSLine className="myCursor" color={'white'} size={18}></RiArrowDownSLine> */}
                            {/* <div className='profileDropDown'>
                                <div>Deputy Inspector General</div>
                                <div>District Registrar Officer</div>
                                <div>Sub - Registrar Officer</div>
                            </div> */}
                            {/* <select className='dropdown ' style={{color:'white'}}  > */}
                             {/*
                              <option  style={{color:'black'}}>Super Admin</option> */}
                         
                        </li>
        
                      
                    </ul>
            </div>   
        </div>
    }
}

const mapStateToProps = (state) =>{
    console.log(state);
    return {
        user_info: state.login.otp_verify,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({

    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HorizontalBarForAdmin)