import React, { Component } from 'react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import titleIcon from '../../../Assests/icon2/term (1).svg';


class IGRBatchUploadedDocument extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[
                {batchID:243435, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                {batchID:222226, totalDoc:"30/01/2021 - 08.00 AM", verifiedDocs:"12476hkjDkasndu2763dhac9381jnoih", missmatchedDocs:"Added to Bloockchain"},
                {batchID:233337, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                {batchID:243434, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                {batchID:243135, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                {batchID:123435, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
                {batchID:553435, totalDoc:"21/02/2021 - 06.00 PM", verifiedDocs:"15443mdocjsi49020p83sxcmoa34097", missmatchedDocs:"Added to Bloockchain"},
            ]
        }
    }

    render(){
        return <div className='batchVerification-Index'>
            <div  className='batchVerification-Index-layout'>
                kkkkk
                {/* <div className='inner-batchVerification-Index-layout'>
                    <div className='row'>
                        <div className='col-md-12 title-row'>
                            <img src={titleIcon} /> &nbsp;&nbsp; <span>Uploaded Document</span>
                        </div>
                        <div className='col-md-12 mt-3 table-responsive body-row'>
                            <table>
                               <tbody>
                                   <tr className='batch-table-header'>
                                        <td>Batch ID</td>
                                        <td>Time Stamp</td>
                                        <td>Checksum Signature</td>
                                        <td>status</td>
                                   </tr>
                                  {this.state.data.map((items,indx)=><tr className={indx%2==0?"batch-table-body1":"batch-table-body2"}>
                                        <td className="myCursor">{items.batchID}</td>
                                        <td>{items.totalDoc}</td>
                                        <td style={{color:'rgba(55, 125, 34,0.8)',cursor:'pointer'}}>{items.verifiedDocs}</td>
                                        <td><BsCircleFill color={'#377D22'} size={8}></BsCircleFill> &nbsp;&nbsp;{items.missmatchedDocs}</td>
                                   </tr>)}
                               </tbody>
                            </table>
                        </div>
                        <div className='col-md-12 mt-5 mb-4 batch-verification-end-row'>
                            <div className='batch-dataNumber'>
                                <div className='batch-page-data-count'>7</div>
                                &nbsp; &nbsp;
                                <label>Items Per Page</label>
                            </div>
                            <div className='batch-pagenumber'>
                                <div className='batch-paggination'>
                                    <AiFillStepBackward style={{width:'3rem',cursor:'pointer'}}></AiFillStepBackward>
                                    <label className='active'>1</label> &nbsp;&nbsp;
                                    <label>2</label>
                                    <label>3</label>
                                    <label>4</label>
                                    <label>5</label>
                                    <label>6</label>
                                    <label>7</label>
                                    <label>8</label>
                                    <label>9</label>
                                    <AiFillStepForward style={{cursor:'pointer'}}></AiFillStepForward>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div> */}
            </div>
        </div>
    }
}

export default IGRBatchUploadedDocument;