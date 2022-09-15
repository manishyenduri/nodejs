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
// const MySwal = withReactContent(Swal);


class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            role: '',
            designation: '',
            zone: '',
            zoneArr: [],
            district: '',
            districtArr: [],
            sub_reg_ofc: '',
            sub_reg_ofcArr: [],
           booleanOTpPage: false,
           errors:''
        }
             
        
    }


    componentDidMount() {
        this.props.getZones() 
        // this.props.getDistrict()
        console.log('district id', this.props.match.params.id);
        if(this.props.history.location.state == undefined){
            this.props.history.push('/')
        }

    }

    componentDidUpdate = (prev) => {
        if (prev.adduser_res != this.props.adduser_res) {
            console.log('Added User -->', this.props.adduser_res);
            if (this.props.adduser_res.message == "User added successfully") {
                Swal.fire(this.props.adduser_res.message)
                .then(() => this.props.history.push({pathname:'/superadmin/first',state:{data:"Login"}}))
                // if (this.props.adduser_res.user.role == "SRO") {
                //     localStorage.setItem('auth_token', this.props.adduser_res.user.token);
                //     MySwal.fire("Added User Successful", `Role: ${this.state.role}`, 'success')
                //         .then(() => this.props.history.push('/superadmin/first'))

                // } else {
                //     MySwal.fire("Login Successful", `Role: ${this.props.adduser_res.user.role}`, 'success')
                //         .then(() => this.props.history.push('/superadmin/first'))

                // }
                // admin/first
            }
        }
        if (prev.addUser_res_err != this.props.addUser_res_err) {
            if (this.props.addUser_res_err.message == "Can not add User") {
                console.log('err -- > ', this.props.addUser_res_err)
                // MySwal.fire("Added User ", `Failed`, 'info')
            } else
                if (this.props.addUser_res_err.status != 200) {
                    // MySwal.fire("Added User", `Failed`, 'info')
                }
        }

        //getallzones


        // console.log('Click',this.props.getdatamaster) 
        if (prev.getUrZone != this.props.getUrZone) {
            console.log('Click', this.props.getUrZone)
            if (this.props.getUrZone.length !=  0) {
                let temp = this.state;

                // for (var i = 0; i < this.props.getUrZone.length; i++) {}
                    
                        // zone:this.props.getUrZone.data[i].Zone,
                        //  district:this.props.getUrZone.data[i].District,
                        // d_Id:this.props.getUrZone.data[i].District_ID,
                        // sro_Id:this.props.getUrZone[i].data[i].SRO_ID,
                        // s_Name:this.props.getdatamaster[i].SRO Name ,
                        // zoneArr : this.props.getUrZone[i]
                
                    console.log("tempdata", temp.data);
                    // temp.data.push(data);
                    temp.zoneArr= this.props.getUrZone.data
                    this.setState(temp);

            }

            console.log("temp", this.state.zone)
        }


        //getallDistrict
        
        if (prev.getUrDistrict != this.props.getUrDistrict) {
            console.log('districtOne', this.props.getUrDistrict)
            if (this.props.getUrDistrict.data.length != 0) {

                let temp= this.state;

                // for (var i = 0; i < this.props.getUrDistrict.length; i++) {
                //     var data = {
                //         // zone:this.props.getUrZone.data[i].Zone,
                //         //  district:this.props.getUrZone.data[i].District,
                //         // d_Id:this.props.getUrZone.data[i].District_ID,
                //         // sro_Id:this.props.getUrZone[i].data[i].SRO_ID,
                //         // s_Name:this.props.getdatamaster[i].SRO Name ,
                //         zone: this.props.getUrDistrict[i]

                //     }

                    console.log("districtArr", temp.data);
                 
                temp.districtArr = this.props.getUrDistrict.data;
                this.setState(temp);
            }
        }


        //SRO Selection In accordance to District
     
        if(prev.sroList != this.props.sroList){
            if(this.props.sroList.data.length!=0)
            this.setState({...this.state, sub_reg_ofcArr:this.props.sroList.data})
        }

    }

    // handleChange = ({ target }) => {
    //     this.setState({

    
    //         selectedOption: target.value,
    //         selectedDistrict: target.value,
    //     });



    //     this.handleRoute(target.value)

    // }



    handleRoute(id) {
        // this.props.history.push(`/batch-id/${id}`)
        this.props.history.push(`/admin/adduser/${id}`)
        console.log("what's id", id);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        if(name == 'zone' & value!=''){
                this.props.getDistrict(value);
        }
        if(name == 'district' & value!=''){
            this.props.getSROList(value);
        }
        this.setState({ ...this.state.users, [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleAddUser();
    }


    handleValidation() {
        const errors = {};
        let formIsValid = true;
    
        //  FirstName
        if (this.state.name === undefined || this.state.name === '') {
          formIsValid = false;
          errors.name = 'This is a required field';
        }
    
        if (this.state.email === undefined || this.state.email === '') {
          formIsValid = false;
          errors.email = 'This is a required field';
        }
    
        if (this.state.role === undefined || this.state.role === '') {
          formIsValid = false;
          errors.role = 'This is a required field';
        }
        if (this.state.zone === undefined || this.state.zone === '') {
            formIsValid = false;
            errors.zone = 'This is a required field';
        }
        if (this.state.designation === undefined || this.state.designation === '') {
            formIsValid = false;
            errors.designation = 'This is a required field';
        }
        // if (this.state.mobile === undefined || this.state.mobile === '') {
        //   formIsValid = false;
        //   errors.mobile = 'This is a required field';
        // }
        if (this.state.mobile !== undefined) {
            if (this.state.mobile.length !== 10) {
              formIsValid = false;
              errors.mobile = 'Please enter valid mobile number';
              
            } else {
              const re = /^[0-9\b]+$/;
              if (re.test(this.state.mobile)) {
              } else {
                formIsValid = false;
                errors.mobile = 'please enter numeric value';
                }
            }
          }

        

          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/.test(this.state.email)) {
            formIsValid = true;
          } else {
            formIsValid = false;
            errors.email = 'please enter valid email id';
          } 
          
          
        this.setState({ errors });
        return formIsValid;
      }

    handleAddUser = (e) => {
        if(this.handleValidation()){
        const data = {
            username: this.state.name,
            email: this.state.email,
            designation: this.state.designation,
            role: this.state.role,
            mobile: this.state.mobile,
            zone: this.state.zone,
            district: this.state.district !== undefined ? this.state.district : null,
            sub_reg_ofc: this.state.sub_reg_ofc !== undefined ? this.state.sub_reg_ofc : null,
        }
        this.props.addUserApi({user:data});
        }

        // MySwal.fire("Added User Successful", `Role: ${this.props.adduser_res.role}`, 'success') //checkOnce ROLE 
        //     .then(() => this.props.history.push('/superadmin/first'))

    }

    render() {
        console.log(this.state);
     return (
        
        <div style={{overflowY:'scroll',height:'580px',width:'101%'}}>

            <div className='blockChainDoc-index'>

                <div className='blockchainDoc-index-layout' id="blockChain">

                    <div className='blockchainDoc-index-layout-row2'>
                        <div className='row'>
                            <div className='col-md-12 mt-2 blockchain-doc-form-title d-flex align-items-center'>

                                <img src={Group_669} /> &nbsp;&nbsp;<span style={{ color: 'green' }}>Add User</span>

                            </div>
                        </div>
                        <>
                            < div className='AddUser'   >
                                <div className='blockchain-doc-form-body'>
                                    <div className="row mt-4" >
                                        <div className='col-md-6 username'>
                                            <label >Username </label>

                                        </div>
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' }}>Select Zone </label>
                                            
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}
                                            <input type="text" name="name" style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black',border:this.state.errors.name === "This is a required field" ? '1px solid red' : ''   }} onChange={this.handleChange} value={this.state.name} placeholder='Enter Your Full Name' />
                                            {this.state.errors.name !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.name}</p>}
                                        </div>
                                        <div className='col-md-6'>
                                            <select type="text" name="zone" value={this.state.zone}
                                            style={{ width: '60%', borderRadius: '5px', borderBlockColor: 'gray',backgroundColor: '#F7FAFC',color:'black',border:this.state.errors.zone === "This is a required field" ? '1px solid red' : '' }} 
                                            onChange={this.handleChange} >
                                                {/* <option className="defaultSelect" selected>Choose Your Zone {this.state.zone}</option> */}
                                                {/* <option className="defaultSelect"  selected>Vidarbha</option>
                                                  <option className="defaultSelect"  selected>Marathwada</option> */}

                                                <option  value="">Please Select Zone</option>
                                                {this.state.zoneArr.length != 0 && this.state.zoneArr.map((id) => <option id style={{ color: 'black' }} > {id}</option>)}
                                             
                                            </select>
                                            {this.state.errors.zone !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.zone}</p>}
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' }}>Mobile Number </label>

                                        </div>
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' }}>Select District </label>
                                            {/* <input type="text"  style={{width:'80%',borderRadius:'5px'}}  placeholder='Choose Year'></input> */}

                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}

                                            <input type="text" name="mobile" maxLength='10' style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black',border:this.state.errors.mobile === "This is a required field" ? '1px solid red' : ''  }} onChange={this.handleChange} value={this.state.mobile} placeholder='Enter Your Mobile Number' />
                                            {this.state.errors.mobile !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.mobile}</p>}

                                        </div>
                                        <div className='col-md-6'>
                                            {this.state.role !== "DIG" ?
                                                <>
                                                <select type="text" name="district" 
                                                style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'black',border:this.state.errors.district === "This is a required field" ? '1px solid red' : ''  }} 
                                                value={this.state.district} 
                                                onChange={this.handleChange} >
                                                <option value="">Please Select </option>
                                                    {this.state.districtArr.length !=0 && this.state.districtArr.map((id) => <option id  style={{color:'Black'}}  >{id}</option>)}
                                                    {console.log("district", this.state.districtArr)}
                                                </select>
                                                {this.state.errors.district !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.district}</p>}
                                                </>
                                            :

                                                <select type="text" name="district" disabled
                                                style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'#D6DBDF' }} 
                                                value={this.state.district} 
                                                onChange={this.handleChange} >
                                                {/* <option value=""></option>
                                                    {this.state.districtArr.length !=0 && this.state.districtArr.map((id) => <option id  style={{color:'Black'}}  >{id}</option>)}
                                                    {console.log("district", this.state.districtArr)} */}
                                                </select>
                                                
                                            }
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' }} >Email </label>

                                        </div>
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' }}>Select Sub-Registrar Office </label>
                                            {/* <input type="text"  style={{width:'80%',borderRadius:'5px'}}  placeholder='Choose Year'></input> */}

                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}

                                            <input type="text" name="email" style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black',border:this.state.errors.email === "This is a required field" ? '1px solid red' : ''  }} onChange={this.handleChange} value={this.state.email} placeholder='Enter Your Email' />
                                            {this.state.errors.email !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.email}</p>}
                                        </div>
                                        <div className='col-md-6'>
                                            {this.state.role !== "DIG" && this.state.role !== "DRO" ?
                                            <>
                                                <select type="text" name="sub_reg_ofc" style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC', color:'black',border:this.state.errors.sub_reg_ofc === "This is a required field" ? '1px solid red' : ''  }} 
                                                value={this.state.sub_reg_ofc} 
                                                onChange={this.handleChange}  >
                                                    <option className="defaultSelect"  style={{color:'Black'}} default selected>Choose Your SRO {this.state.sub_reg_ofc} </option>
                                                    

                                                    {this.state.sub_reg_ofcArr!=0 && this.state.sub_reg_ofcArr.map((id) => <option id  style={{color:'Black'}} >{id}</option>)}
                                                </select>
                                                {this.state.errors.sub_reg_ofc !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.sub_reg_ofc}</p>}
                                                </>
                                            :
                                            <select type="text" name="sub_reg_ofc" disabled style={{width: '80%', borderRadius: '5px', backgroundColor: '#F7FAFC', color:'#D6DBDF' }} 
                                            value={this.state.sub_reg_ofc} 
                                            onChange={this.handleChange}  >
                                            </select>
                                            }
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' }}>
                                            Role 
                                            </label>
                                           
                                        </div>
                                        <div className='col-md-6'>
                                            <label style={{ marginBottom: '10px' }}>Designation</label>
                                            {/* <input type="text"  style={{width:'80%',borderRadius:'5px'}}  placeholder='Choose Year'></input> */}

                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className='col-md-6'>
                                            {/* <label>Choose Book</label> */}
                                            <select type="text" name="role" style={{ width: '60%', borderRadius: '5px',backgroundColor: '#F7FAFC',color:'Black',border:this.state.errors.role === "This is a required field" ? '1px solid red' : ''  }} onChange={this.handleChange} value={this.state.role} >
                                                <option className="defaultSelect" default selected>Choose the Role</option>
                                                <option className="defaultSelect" selected>IGR</option>
                                                <option className="defaultSelect" selected>DIG</option>
                                                <option className="defaultSelect" selected>DRO</option>
                                                <option className="defaultSelect" selected>SRO</option>
                                                {/* <option className="defaultSelect" selected>Retailer</option> */}
                                            </select>
                                            {this.state.errors.role !== undefined && <p style={{color:'red',fontSize:'12px'}}>{this.state.errors.role}</p>}
                                        </div>
                                        <div className='col-md-6'>
                                            <input type="designation" name="designation" style={{ width: '60%', borderRadius: '5px', backgroundColor: '#F7FAFC',color:'Black' ,border:this.state.errors.designation === "This is a required field" ? '1px solid red' : ''}} onChange={this.handleChange} value={this.state.designation} placeholder='Designation'>
                                            
                                            </input>
                                        </div>

                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col-md-12'>
                                            <button className='blockchain-doc-form-button' onClick={this.handleAddUser}>Add a New User</button>
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

        </div>


        )
    }
}


const mapStateToProps = (state) => {
    console.log("state",state)
    return {
        // batch_list_by_id:state.admin.batch_upload_list_by_id
        adduser_res: state.admin.adduser_response,
        addUser_res_err: state.admin.addUser_res_err,

        getUrZone: state.admin.getallZones,
        getUrDistrict: state.admin.getallDistrict,
        sroList:state.admin.getallSROList,
        

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            addUserApi,
            getZones,
            getDistrict,
            getSROList
        }
        , dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

//   export default AddUser