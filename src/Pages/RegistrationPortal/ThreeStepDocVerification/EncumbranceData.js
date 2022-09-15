import React, {Component} from 'react';
import { BsCircleFill } from 'react-icons/bs';



class EncumbranceData extends Component {
    constructor(props){
        super(props);           
        this.state={
            switchEncumTable:false,//this.state.switchEncumTableData,
            data:[
                {batchID:"1)", docNoYear:"1556/2020", doe:['12/06/2020','12/06/2020','12/06/2020'], nature:"Deed", nameOfExecutant:'Sangeetha K', nameOfClaimant:"Kumar B", VolNo:""},
                {batchID:"2)", docNoYear:"1353/2020", doe:['12/06/2020','12/06/2020','12/06/2020'],  nature:"Deed", nameOfExecutant:'Kavitha P', nameOfClaimant:"Kumar B", VolNo:""},
                {batchID:"3)", docNoYear:"1636/2020", doe:['12/06/2020','12/06/2020','12/06/2020'], nature:"Deed", nameOfExecutant:'Kumari V', nameOfClaimant:"Kumar B", VolNo:""}
            ]
        }
    }

    componentDidUpdate=(prev)=>{
        if(prev.switchEncumTableData !=this.props.switchEncumTableData){
            this.setState({...this.state, switchEncumTable:this.props.switchEncumTableData})
        }
    }

    // handleSwitch=()=>{
    //     this.setState({...this.state,switchEncumTable:!this.state.switchEncumTable})
    // }
    render(){
        return(
            <div className='col-md-12 igr-3step-doc-index mt-4' style={{marginTop:'5%'}}>
               <div className='igr-3step-doc-index-table'>
                    {this.state.switchEncumTable && <div className='encumbHiddenRowTop'>
                        <div className='row'>
                            <div className='col-md-12 igr-3step-didden-title'>
                                <label>EC of Search Period</label> &nbsp;&nbsp;
                                <label>09/08/2019 - 20/02/2020</label>
                            </div>
                        </div>
                    </div>}
                    <div className='encumbrance-row1' style={{marginTop:'3%'}}>
                        <div className='row'>
                            <div className='col-md-7 encumbrance-row1-data'>
                                <div className="row">
                                    <div className="col-md-4"><label style={{fontWeight: 'bold'}}>Property Type</label></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-7">Plot With Building</div>
                                </div>
                            </div>
                            <div className='col-md-5 encumbrance-row2-data'>
                                <div className="row">
                                    <div className="col-md-4"><label style={{fontWeight: 'bold'}}>Property Extent</label></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-7">421.29 SQUARE FEET</div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-7 encumbrance-row1-data'>
                                <div className="row">
                                    <div className="col-md-4"><label style={{fontWeight: 'bold'}}>Village Name</label></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-7">Amnjikarai, Thiruveethi Amma Kevin Street 1st Lane</div>
                                </div>
                            </div>
                            <div className='col-md-5 encumbrance-row2-data'>
                                <div className="row">
                                    <div className="col-md-4"><label style={{fontWeight: 'bold'}}>Survey No</label></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-7">16, 53/1 Part 1 , 53/2 part , 70/8 part</div>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
               {this.state.switchEncumTable!=true && <div className='igr-3step-doc-index-table mt-3 mb-4'>
                    <label className='encumbrance-label' style={{fontWeight: 'bold',marginLeft:'2%',fontSize:'20px',marginTop:'3%'}}>Search EC:</label>
               </div>}
               {this.state.switchEncumTable!=true && <div className='igr-3step-doc-index-table'>
                    <div className='encumbrance-row1'  style={{marginTop:'3%'}}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className=' myrow3'>
                                <label style={{fontWeight: 'bold',marginLeft:'1%'}}>EC Start Date</label>
                                <input type="date" placeholder='Start Date' className='form-control mt-3' style={{width:'55%',background: 'whitesmoke'}}/>
                                </div>
                                
                            </div>
                            <div className='col-md-6'>
                            <div className=' myrow3'>
                                <label style={{fontWeight: 'bold',marginLeft:'1%'}}>EC End Date</label>
                                <input type="date" placeholder='End Date' className='form-control mt-3' style={{width:'55%',background: 'whitesmoke'}}/>
                            </div>
                            </div>
                        </div>
                        
                    </div>

               </div>}
               
                {
                    this.state.switchEncumTable && 
                    <div className='col-md-12 mt-4 table-responsive igr-encumbranceTable-body'>
                            {/* <table style={{marginLeft:'2.5%'}}>
                               <tbody>
                                   <tr className='batch-table-header' style={{backgroundColor:'#377D222B'}}>
                                        <td className='text-center' style={{width:'200px'}}>SI.NO</td>
                                        <td style={{width:'200px'}}>Doc NO & Year</td>
                                        <td style={{width:'200px'}}>Date of Execution, Registration and Presentation.</td>
                                        <td style={{width:'200px'}}>Nature</td>
                                        <td style={{width:'200px'}}>Name of Executant</td>
                                        <td style={{width:'200px'}}>Name of Claimant</td>
                                        <td style={{width:'200px'}}>Vol No & Page NO</td>
                                   </tr>
                                  {this.state.data.map((items,indx)=><tr  className={indx%2==0?"batch-table-body1":"batch-table-body2"} style={{
                                background:
                                  indx % 2 ? 'rgba(55, 125, 34,0.03)' : '#fff',
                              }} >
                                        <td className="myCursor" style={{textAlign:'center', paddingLeft:'1.5rem'}}>{items.batchID}</td>
                                        <td>{items.docNoYear}</td>
                                        <td className='pt-3 pb-3'>{items.doe.map((val,idx)=><div>{val}</div>)}</td>
                                        <td>{items.nature}</td>
                                        <td>{items.nameOfExecutant}</td>
                                        <td>{items.nameOfClaimant}</td>
                                        <td>{items.VolNo}</td>
                                        
                                   </tr>)}
                    
                               </tbody>
                            </table> */}
                            <div ClassName="row"  style={{display:'flex',backgroundColor:'#377D222B',marginTop:'3%'}}>
                                <div className="col-md-1" style={{fontWeight:'bold'}}><a>SI.NO</a></div>
                                <div className="col-md-2" style={{fontWeight:'bold'}}> <a>Doc NO & Year</a></div>
                                <div className="col-md-2" style={{padding:'10px 0px',fontWeight:'bold'}}><a>Date of Execution, Registration and Presentation.</a></div>
                                <div className="col-md-2" style={{textAlign:'center',fontWeight:'bold'}}><a>Nature</a></div>
                                <div className="col-md-2" style={{fontWeight:'bold'}}><a>Name of Executant</a></div>
                                <div className="col-md-2" style={{fontWeight:'bold'}}><a>Name of Claimant</a></div>
                                <div className="col-md-1" style={{fontWeight:'bold'}}><a>Vol No & Page NO</a></div>
                            </div>
                            
                            <div class="row" style={{display:'flex', backgroundColor:'#377D2205'}}>
                                <div className="col-md-1"><a> 1)</a></div>
                                <div className="col-md-2"> <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">1556/2020</a></div>
                                <div className="col-md-2" style={{height:'100px'}}><a>12/06/2020 <br/>15/06/2020 <br/>17/06/2020</a></div>
                                <div className="col-md-2" style={{textAlign:'center'}}><a>Deed</a></div>
                                <div className="col-md-2"><a>Sangeetha K</a></div>
                                <div className="col-md-2"><a>Kumar B</a></div>
                                <div className="col-md-1"><a></a></div>
                            </div>
                            <div class="collapse" id="collapseExample">
                                <div class="row">
                                    <div className="col-md-4">
                                        <center>
                                            <p style={{fontWeight: 'bold'}}>Consideration Value</p>
                                            <p>&#8377; 56,00,000</p>
                                        </center>
                                    </div>
                                    <div className="col-md-4">
                                        <center>
                                            <p style={{fontWeight: 'bold'}}>Market Value</p>
                                            <p>&#8377; 56,00,000</p>
                                        </center>
                                    </div>
                                    <div className="col-md-4">
                                    <center>
                                            <p style={{fontWeight: 'bold'}}>PR Number</p>
                                            <p>2997/2007</p>
                                        </center>
                                    </div>
                                </div>
                                <div class="row">
                                    <div className="col-md-4">
                                        <center>
                                            <p style={{fontWeight: 'bold'}}>Property Extent Deatils</p>
                                        </center>
                                    </div>
                                    <div className="col-md-4">
                                        <center>
                                            <p style={{fontWeight: 'bold'}}>Schedule Remarks</p>
                                        </center>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="row" style={{display:'flex', backgroundColor:'#377D2205'}}>
                                <div className="col-md-1"><a> 2)</a></div>
                                <div className="col-md-2"> <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">1556/2020</a></div>
                                <div className="col-md-2" style={{height:'100px'}}><a>12/06/2020 <br/>15/06/2020 <br/>17/06/2020</a></div>
                                <div className="col-md-2" style={{textAlign:'center'}}><a>Deed</a></div>
                                <div className="col-md-2"><a>Kavitha P</a></div>
                                <div className="col-md-2"><a>Selvam P</a></div>
                                <div className="col-md-1"><a></a></div>
                            </div>
                            <div class="row" style={{display:'flex', backgroundColor:'#377D2205'}}>
                                <div className="col-md-1"><a> 1)</a></div>
                                <div className="col-md-2"> <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">1636/2020</a></div>
                                <div className="col-md-2" style={{height:'100px'}}><a>12/06/2020 <br/>15/06/2020 <br/>17/06/2020</a></div>
                                <div className="col-md-2" style={{textAlign:'center'}}><a>Deed</a></div>
                                <div className="col-md-2"><a>Kumari V</a></div>
                                <div className="col-md-2"><a>Kumar B</a></div>
                                <div className="col-md-1"><a></a></div>
                            </div>
                            
                        </div>
                }
            </div>)
    }
}

export default EncumbranceData;