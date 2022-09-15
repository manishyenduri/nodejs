import React, { Component } from 'react';
import logo from '../../Assests/icon2/Bimg.svg';
import rupeeLogo from '../../Assests/icon2/rupeeimg.svg';
import dailyUploadReport from '../../Assests/icon2/term (1).svg';
import dataIntegrityReport from '../../Assests/icon2/Group 481.svg';
import pauseCurrentBatch from '../../Assests/icon2/Group 482.svg';
import { SimpleModalPop } from '../../Components/SimpleModalPop';
import $ from 'jquery';
import * as bootstrap from 'bootstrap';

class BlockChainDocumentsOfRegis extends Component{

    constructor(props){
        super(props)
        this.state={
            ModalShow:null,
            
        }
 }Frow
    componentDidMount(){}


    render(){
        return (
            <div className='blockChainDoc-index'>

                <div className='blockchainDoc-index-layout'>
                    <div className='row'>
                        <div className="col-md-12 blockchainDoc-index-layout-row1">
                            <img src={logo} /> &nbsp;&nbsp; <span>Blockchained Documents Of Registration</span>
                        </div>
                    </div>
                    <div className='blockchainDoc-index-layout-row2'>
                        <div className='row'>
                            <div className='col-md-12 mt-2 blockchain-doc-form-title d-flex align-items-center'>
                                <img src={rupeeLogo} /> &nbsp;&nbsp; <span>View a Registration Document</span>
                         </div>
                        </div>
                        <div className='blockchain-doc-form-body'>
                            <div className="row">
                                <div className='col-md-6'>
                                    <label>Sub - Registrar’s Office</label>
                                    <input type="text" disabled style={{background:'#E6E6E6',width:'80%',borderRadius:'5px'}} placeholder='Adayar'></input>
                                </div>
                                <div className='col-md-6'>
                                    <label>Enter Document ID</label>
                                    <input type="text"style={{width:'80%',borderRadius:'5px'}}  placeholder='Enter Document ID'></input>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className='col-md-6'>
                                    <label>Choose Book</label>
                                    {/* <select style={{width:'80%',borderRadius:'5px'}} >
                                        <option className="defaultSelect" disabled selected>Choose Book</option>
                                    </select> */}
                                </div>
                                <div className='col-md-6'>
                                    <label>Choose Year</label>
                                    {/* <input type="text"  style={{width:'80%',borderRadius:'5px'}}  placeholder='Choose Year'></input> */}
                                </div>
                            </div>
                            <div className="row ">
                                <div className='col-md-6'>
                                    {/* <label>Choose Book</label> */}
                                    <select style={{width:'80%',borderRadius:'5px'}} >
                                        <option className="defaultSelect" disabled selected>Choose Book</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    {/* <label>Choose Year</label> */}
                                    <input type="text"  style={{width:'80%',borderRadius:'5px'}}  placeholder='Choose Year'></input>
                                </div>
                            </div>
                            <div className='row mb-4'>
                                <div className='col-md-12'>
                                    <button className='blockchain-doc-form-button'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blockchainDoc-index-layout-row3' style={{position:'relative'}}>
                        <div onClick={()=>this.props.history.push({pathname:'/igr-batch-verification',state:{data:"Login"}})}><img src={dataIntegrityReport} /> &nbsp;&nbsp;&nbsp; <span>Document Integrity </span></div>
                        <div style={{right:'1rem',position:'absolute'}} onClick={()=>this.props.history.push({pathname:'/igr-batch-upload',state:{data:'Login'}})} className='pushRight'> <img src={dailyUploadReport} /> &nbsp;&nbsp;&nbsp; <span>Daily Upload Report</span></div>
                        {/* <div className='pushRight' ><img src={pauseCurrentBatch} /> &nbsp;&nbsp;&nbsp; <span>Pause Current Batch</span></div> */}
                    </div>

                    
                </div>
            </div>
        )
    }
}

export default BlockChainDocumentsOfRegis;