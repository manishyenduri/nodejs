import React, { Component } from 'react';
import logo from '../../../Assests/icon2/Bimg.svg';
import Add_User from '../../../Assests/icon/AddUser.svg';
import dailyUploadReport from '../../../Assests/icon2/term (1).svg';
import dataIntegrityReport from '../../../Assests/icon2/Group 481.svg';
import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import Group_669 from '../../../Assests/icon/Group 669.svg'
//   import '../../../style/components/registration/Admin'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import addUser from '../../../Assests/icon2/addUser.png';
import { addUserApi } from '../../../store/Admin/action';
import { getZones, getDistrict , getSROList} from '../../../store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; import { Advertisement } from 'semantic-ui-react';
import { thresholdScott } from 'd3';
import { getAllUsersDetails, getUserData , updateStatus} from '../../../store/Admin/action'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MySwal = withReactContent(Swal);


class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
           booleanOTpPage: false,
           user:'',
           Status: undefined
          
        }
             
        
    }


    componentDidMount() {
        if(this.props.history.location.state == undefined){
            this.props.history.push('/')
        }else{

        this.props.getUserData(this.props.location.state.user.userId);     
        if(this.props.history.location.state.user !== undefined){
            this.setState({
                Status:this.props.history.location.state.user.status
            })
        } 
    }
        
    }

    componentDidUpdate = (prev) => {
     
        if(prev.UserData !== this.props.UserData){
            let temp = this.state
            console.log(this.props.UserData)
            temp.designation =this.props.UserData.designation
            temp.mobile =this.props.UserData.mobileno
            temp.user =this.props.UserData
            this.setState(temp);
        }
        if(prev.update_User !== this.props.update_User){
            if(this.props.update_User.status === true){
                this.props.history.push({pathname:'/superadmin/first',state:{data:"Login"}})
            }
        }
       
       
    }



    handleback = () => {
        console.log(this.props)
        this.props.history.push({pathname:'/superadmin/first',state:{data:"Login"}})
    }

   

    handleAddUser = () => {
        let action = this.props.history.location.state.user.status === 'Active' ? 'Block' : 'Unblock'

    MySwal.fire({
      title: `Are you sure you want to ${action} the User?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        let update = this.props.updateStatus(this.props.history.location.state.user.userId, this.props.history.location.state.user.status)
        if (update) {
          this.componentDidUpdate()
        }
        if(this.state.Status === "Active"){
            this.setState({
                Status: "Unblock"
            })
        }
        else{
            this.setState({
                Status:"Block"
            })
        }
      } else {
        MySwal.fire('Action Cancelled!')
      }
    })
    }

   
   

    render() {
        console.log(this.props);
        console.log(this.state);
        
     return (


            <div className='blockChainDoc-index'>

                <div className='blockchainDoc-index-layout'>

                    <div className='blockchainDoc-index-layout-row2'>
                        <div className='row'>
                            <div className='col-md-12 mt-2 blockchain-doc-form-title d-flex align-items-center'>

                                <img src={Group_669} /> &nbsp;&nbsp;<span style={{ color: 'green' ,fontFamily:'muli'}}>User Details</span>

                            </div>
                        </div>
                        <>
                            < div className='AddUser'   >
                                <div className='blockchain-doc-form-body'>
                                    <div className="row mt-4" >
                                        <div className='col-md-6 username'>
                                            <label style={{fontFamily:'muli'}}>Username</label>

                                        </div>
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px',fontFamily:'muli' }}>Designation</label>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}
                                            {/* <input type="text" name="name" style={{ width: '80%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black'  }} onChange={this.handleChange} value={this.state.name} placeholder='My Username' />
                                           */}
                                            <input type="text" name="username" style={{ padding:'5px 5px',width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black' }} disabled onChange={this.handleChange} value={this.state.user?this.state.user.username:''} placeholder='username'></input>
                                            {/* <select type="text" name="role" style={{ width: '80%', borderRadius: '5px',backgroundColor: '#F7FAFC',color:'Black' }}> 
                                                <option>{this.state.user?this.state.user.username:'' }</option>    
                                                   
                                               </select>  */}
                                                    {/* <div>
                                                       <ul>
                                                        {this.props.getAllUsers_list.map(({_id, index}) => (
                                                        <li key={index} >{_id}</li>
                                                        ))}
                                                        </ul>
                                                    </div> */}
                                            {/* </input> */}
                                        </div>
                                        <div className='col-md-6'>
                                            <input type="designation" name="designation" style={{ padding:'5px 5px',width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black' }} disabled onChange={this.handleChange} value={this.state.designation} placeholder='Designation'>
                                                {/* <option className="defaultSelect" disabled selected>Choose the Designation</option> */}
                                            </input>
                                        </div>


                                    </div>
                                    <div className="row mt-4">
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' ,fontFamily:'muli'}}>Mobile Number</label>

                                        </div>
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px',fontFamily:'muli' }}>
                                                Email ID
                                            </label>
                                            
                                        </div>
                                                  
                                                  
                                    </div>

                                    <div className="row ">
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}

                                            <input type="text" name="mobile" disabled style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black' }} onChange={this.handleChange} value={this.state.mobile} placeholder='Enter Your Mobile Number' />


                                        </div>
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}
                                            <input type="text" name="email" style={{ padding:'5px 5px',width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black' }} disabled onChange={this.handleChange} value={this.state.user?this.state.user.email:' '} placeholder='email'></input>

                                            {/* <select type="text" name="role" style={{ width: '80%', borderRadius: '5px',backgroundColor: '#F7FAFC',color:'Black' }}> 
                                                <option>{this.state.user?this.state.user.email:' ' }</option>    
                                                   
                                               </select>  */}
                                        </div>
                                        

                                    </div>
                                    <div className="row mt-4">
                                        {/* <div className='col-md-5'>
                                            <label style={{ marginBottom: '10px' }}>
                                               Department
                                            </label>
                                            
                                        </div> */}
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' ,fontFamily:'muli'}}>
                                           Role
                                            </label>
                                            
                                        </div>
                                    </div>

                                    <div className="row ">
                                        
                                        {/* <div className='col-md-5'>
                                             <label>Choose Book</label> 

                                             <input type="text" name="email" disabled style={{ width: '80%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black' }} onChange={this.handleChange} value={this.state.email} placeholder='Designation' />
                                        </div> */}
                                        
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}
                                            {/* <select type="text" name="role" style={{ width: '80%', borderRadius: '5px',backgroundColor: '#F7FAFC',color:'Black' }} onChange={this.handleChange} value={this.state.role} >
                                                <option className="defaultSelect" default selected>Choose the Role</option>
                                                <option className="defaultSelect" selected>IGR</option>
                                                <option className="defaultSelect" selected>DIG</option>
                                                <option className="defaultSelect" selected>DRO</option>
                                                <option className="defaultSelect" selected>SRO</option> */}
                                                {/* <option className="defaultSelect" selected>Retailer</option> */}
                                            {/* </select> */}

                                            <select type="text" name="role" style={{ padding:'5px 5px',width: '60%', borderRadius: '5px',backgroundColor: '#F7FAFC',color:'Black' }}> 
                                                <option>{this.state.user?this.state.user.role:'' }</option>    
                                                   
                                               </select> 
                                            {/* <select type="text" name="role" style={{ width: '80%', borderRadius: '5px',backgroundColor: '#F7FAFC',color:'Black' }}> 
                                                <option>{ }</option>    
                                                   
                                               </select>  */}
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                  
                                       
                                    </div>

                                    <div className="row ">
                                    
                                       
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <button className='blockchain-doc-form-button' style={{borderColor:"red" ,color:'red',marginRight:'15px'}} onClick={this.handleback}>Back</button>
                                            <button className='blockchain-doc-form-button' style={{borderColor:"red" ,color:'red',marginRight:'15px'}} onClick={this.handleAddUser}>{this.state.Status === "Active" ? "Block" : "Unblock"}</button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </>

                    </div>



                    <div className='blockchainDoc-index-layout-row3' style={{ position: 'relative' }}>


                        {/* <div className='pushRight' ><img src={pauseCurrentBatch} /> &nbsp;&nbsp;&nbsp; <span>Pause Current Batch</span></div> */}
                    </div>


                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("state",state)
    return {
        getAllUsers_list: state.admin.getallUsers_details,
        UserData: state.admin.User_Data,
        update_User: state.admin.all_users_action_update,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getAllUsersDetails,
            getUserData,
            updateStatus,
        }
        , dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

//   export default AddUser