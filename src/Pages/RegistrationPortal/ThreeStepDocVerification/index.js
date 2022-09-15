import React, { Component } from 'react';
import greenDocCheckIcon from '../../../Assests/icon2/Group 1409.svg';
import logoTnega from '../../../Assests/icon2/tmp_055fd3aa-7e0f-4685-b728-1fec3c096877.jpg';
import DocumentIndex from './DocumentIndex';
import Document from './Document';
import { bindActionCreators } from 'redux'
import tabImg2 from '../../../Assests/icon/tabImg2.png';
import tabImg3 from '../../../Assests/icon/tabImg3.png';
import tabImg5 from '../../../Assests/icon/tabImg5.png';
import tabImg7 from '../../../Assests/icon/tabImg7.png';
import tabImg1 from '../../../Assests/icon/tabImg1.png';
import tabImg4 from '../../../Assests/icon/tabImg4.png';
import tabImg6 from '../../../Assests/icon/tabImg6.png';
import tabImg8 from '../../../Assests/icon/tabImg8.png';
import Rect from '../../../Assests/icon/Rect.png';
import nofound from '../../../Assests/icon2/Group 1410.svg'
import { connect } from 'react-redux';
import '../../../style/components/Igr.css'
import {
    documentIndex,
  } from '../../../store/action'
import EncumbranceData from './EncumbranceData';

class ThreeStepDocVerification extends Component{
    constructor(props){
        super(props);
        this.state={
            switchDocumentIndex:true,
            switchDocument:false,
            switchEncumbranceData:false,
            datas:'',
            column1_data:[
                {title:'Document Index ID', data:'',value:1},
                {title:'Execution Date/Time', data:''},
                {title:'Consideration Value', data: ''},
                {title:'DOP', data: ''},
                {title:'Document Registration No', data:'',value:1},
                {title:'Registration Date', data: '',value:1},
                {title:'Ward No', data: ''},
                {title:'Block No', data: '',value:1},
                // {title:'Document Type', data: '',value:1},
                // {title:'Nature Of Document', data: ''},
                {title:'IS Section 47 A1', data: ''},
                // {title:'Land Property ID', data: ''},
                {title:'Register Village ID', data: ''},
                {title:'Market Value', data: ''},
                {title:'Survey Nos', data: ''},
                {title:'Extent', data: ''},
                {title:'Door Number', data: ''},
                {title:'Old Door Number', data:''},
                {title:'Flat Number', data: ''},
                {title:'Floor Number', data: ''},
                {title:'Name of the Building', data: ''},
                {title:'Street Name', data: ''},
                {title:'Village Name', data:''},
                {title:'SRO', data: '',value:1},
                {title:'Property Type', data: '',value:1},
                {title:'DRO', data: ''},
                {title:'Zone', data: ''},
                {title:'Conveyance Metro', data: ''},
                {title:'Property Remarks', data: ''}
            ],
            column2_data:[
                {title:'Forty Seven Remarks', data: ''},
                {title:'Layout Name', data:''},
                // {title:'Land Property ID', data: ''},
                // {title:'Land Property Building ID', data: ''},
                {title:'Market Value', data: ''},
                {title:'Volume No', data:''},
                {title:'Page No', data:''},
                {title:'East Details', data:''},
                {title:'West Details', data: ''},
                {title:'North Details', data:''},
                {title:'South Details', data: ''},
                {title:'Plot No', data: ''},
                {title:'Claimant', data: ''},
                {title:'Executant', data:''},
                {title:'Lang ID', data:''},
                // {title:'UOM Type', data:''},
                {title:'Credit Date / Time', data:''},
                {title:'Crt Post', data:''},
                {title:'List Updated Date', data:''},
                {title:'List Updated Post', data:'-'},
                {title:'Executive Representative', data:''},
                {title:'CLA Representative', data:''},
                // {title:'Document SEQ NO', data:'',value:1},
                // {title:'Registered Year', data:'',value:1},
                // {title:'Schedule Code', data:''},
                // {title:'Value Unit Measurement', data:''},
                // {title:'Receipt Indentifier', data:''},
                // {title:'PR Document Type', data:''},
                // {title:'Survey Extent', data:''},
            ],
            switchEncumTable:false,
            zone:'',
            district:'',
            sro: '',
            book:'',
            documentId:'',
            year:'',
        }
    }

    handleSwitch=(name)=>{
        if(name=="Encumbrance"){
            this.setState({...this.state, switchEncumbranceData:true, switchDocument:false, switchDocumentIndex:false})
        }else
        if(name=="Document"){
            this.setState({...this.state, switchEncumbranceData:false, switchDocument:true, switchDocumentIndex:false})
        }else
        if(name=="DocumentIndex"){
            this.setState({...this.state, switchEncumbranceData:false, switchDocument:false, switchDocumentIndex:true})
        }
    }

    OkaySwitch=()=>{
        if(this.state.switchEncumbranceData===true){
            this.handleEncumbSwitchOkay();
            return;
        }
    }
    handleEncumbSwitchOkay=()=>{
        this.setState({...this.state,switchEncumTable:!this.state.switchEncumTable})
    }

    componentDidMount() {
        if(this.props.history.location.state == undefined){
            this.props.history.push('/')
        }
        if(this.props.history.location.state !== undefined){
        this.setState({
            zone: this.props.location.state.zone,
                district: this.props.location.state.district,
                sro: this.props.location.state.sro,
                book:this.props.location.state.book,
                documentId: this.props.location.state.documentId,
                year: this.props.location.state.year,
                
        });  
        }       

        const dataValue= 'R:';
        const col= ':';
        if(this.props.history.location.state !== undefined){
        this.props.documentIndex(dataValue, col, this.props.location.state.book, this.props.location.state.documentId, this.props.location.state.year, this.props.location.state.sro)

        if(this.props.location.state.datastatus == "Verified" || this.props.location.state.datastatus == undefined ){
            if(this.props.location.state.sro === "Adayar"){
                if(this.props.location.state.book === "BOOK 1"){
                    if(this.props.location.state.documentId === "2211" ){
                        if(this.props.location.state.year === "2021"){
                            this.setState({datas:"mismatched"})
                        }
                        else{
                            this.setState({datas:"Verified"})
                        }
                    }
                    else{
                        this.setState({datas:"Verified"})
                    }
                }
                else{
                    this.setState({datas:"Verified"})
                }
            }
            else{
                this.setState({datas:"Verified"})
            }
        }else{
            this.setState({datas:"Mismatched"})
        }
        }
    }
    componentDidUpdate = (prev) => {
        if(prev.UserData != this.props.UserData)
        {
            console.log("hello")
            console.log(this.props.UserData)
            if(this.props.UserData != undefined){
                let temp = this.state;

                console.log(this.props.UserData)
                temp.column1_data[0].data= this.props.UserData.doc_index_id;
                temp.column1_data[1].data= this.props.UserData.Execution_date;
                temp.column1_data[2].data= this.props.UserData.Consideration_Value;
                temp.column1_data[3].data= this.props.UserData.DOP;
                temp.column1_data[4].data= this.props.UserData.Doc_reg_no.replace(/:/g, '/');                
                temp.column1_data[5].data= this.props.UserData.Reg_date;
                temp.column1_data[6].data= this.props.UserData.Ward_no;
                temp.column1_data[7].data= this.props.UserData.Block_no;
                // temp.column1_data[8].data= '-';
                // temp.column1_data[9].data= '-';
                temp.column1_data[8].data= this.props.UserData.is_sec_47a1;
                // temp.column1_data[11].data= '-';
                temp.column1_data[9].data= this.props.UserData.reg_village_id;
                temp.column1_data[10].data= this.props.UserData.market_value;
                temp.column1_data[11].data= this.props.UserData.survey_nos;
                temp.column1_data[12].data= this.props.UserData.Extent;
                temp.column1_data[13].data= this.props.UserData.Door_no;
                temp.column1_data[14].data= this.props.UserData.Old_Door_no;
                temp.column1_data[15].data= this.props.UserData.Flat_no;
                temp.column1_data[16].data= this.props.UserData.Floor_no;
                temp.column1_data[17].data= this.props.UserData.Building_Name;
                temp.column1_data[18].data= this.props.UserData.Street;
                temp.column1_data[19].data= this.props.UserData.Village;
                temp.column1_data[20].data= this.props.UserData.Sro;
                temp.column1_data[21].data= this.props.UserData.Prop_type;
                temp.column1_data[22].data= this.props.UserData.Dro;
                temp.column1_data[23].data= this.props.UserData.Zone;
                temp.column1_data[24].data= this.props.UserData.Conveyance_metro;
                temp.column1_data[25].data= this.props.UserData.Prop_remarks;

                temp.column2_data[0].data= this.props.UserData.Forty_seven_remarks;
                temp.column2_data[1].data= this.props.UserData.Layout_name;
                // temp.column2_data[2].data= '-';
                // temp.column2_data[3].data= '-';
                temp.column2_data[2].data= this.props.UserData.market_value;
                temp.column2_data[3].data= this.props.UserData.vol_no;
                temp.column2_data[4].data= this.props.UserData.page_no;
                temp.column2_data[5].data= this.props.UserData.east_dtls;
                temp.column2_data[6].data= this.props.UserData.west_dtls;
                temp.column2_data[7].data= this.props.UserData.north_dtls;
                temp.column2_data[8].data= this.props.UserData.south_dtls;
                temp.column2_data[9].data= this.props.UserData.plot_no;
                temp.column2_data[10].data= this.props.UserData.claimant;
                temp.column2_data[11].data= this.props.UserData.Executant;
                temp.column2_data[12].data= this.props.UserData.lang_id;
                // temp.column2_data[15].data= '-';
                temp.column2_data[13].data= this.props.UserData.crt_dt;
                temp.column2_data[14].data= this.props.UserData.crt_post;
                temp.column2_data[15].data= this.props.UserData.lst_updt_dt;
                temp.column2_data[16].data= this.props.UserData.lst_updt_post;
                temp.column2_data[17].data= this.props.UserData.exe_representative;
                temp.column2_data[18].data= this.props.UserData.cla_epresentative;
                // temp.column2_data[22].data= '-';
                // temp.column2_data[23].data= '-';
                // temp.column2_data[24].data= '-';
                // temp.column2_data[25].data= '-';
                // temp.column2_data[26].data= '-';
                // temp.column2_data[27].data= '-';
                // temp.column2_data[28].data= '-';


                this.setState(temp)
                // temp.column1_data[3].data= this.props.UserData.doc_index_id;
                // temp.column1_data[4].data= this.props.UserData.doc_index_id;

            }
        }
    }



    render(){
        console.log(this.state);
        console.log(this.props);
        return (
            <div style={{width:'100%'}}>
            <div className='igr-3stepDoc-verification' style={{backgroundColor:'white',width: '100%',justifyContent: 'center',fontFamily: 'Muli',marginTop: '2rem'}}>
                <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light" >
                    <div class="container-fluid">
                        <a class="navbar-brand"></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" onClick={()=>this.handleSwitch("DocumentIndex")} style={{padding:'12px 37px',fontWeight:'bolder',cursor:'pointer',color:this.state.switchDocumentIndex == true ? '#20570F' : 'grey',fontSize:'19px',fontFamily:'muli'}}>Document Index</a>
                            <a class="nav-link" onClick={()=>this.handleSwitch("Document")} style={{padding:'12px 37px',fontWeight:'bolder',cursor:'pointer',color:this.state.switchDocumentIndex == false ? '#20570F' : 'grey',fontSize:'19px',fontFamily:'muli'}}>Document</a>
                        </div>
                        </div>
                    </div>
                </nav>
                </div>
                
                
                <div  className='igr-3stepDoc-Index-layout' style={{width:'100%'}}>
                    {/* <div className='row'>
                        
                        <div className='col-md-12 directed-arrow p-0'>
                            {this.state.switchDocumentIndex === true &&
                            <ul class="breadcrumb" style={{backgroundColor: 'white',height:'50px',marginLeft:'0px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                <li onClick={()=>this.handleSwitch("DocumentIndex")} style={{padding:'12px 45px',fontWeight:'bold',border:'2px solid #20570F'}}>Document Index</li>
                                
                                <li onClick={()=>this.handleSwitch("Document")} style={{padding:'12px 45px',backgroundColor:'#20570F',color:'white',fontWeight:'bold'}}>Document</li>
                            </ul>
                            }
                            {this.state.switchEncumbranceData === true &&
                            <ul class="breadcrumb" style={{backgroundColor: 'white',height:'50px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                 <li onClick={()=>this.handleSwitch("DocumentIndex")}><img src={tabImg1} style={{width:'226px',height:'40px'}} /></li>
                                <li onClick={()=>this.handleSwitch("Encumbrance")} ><img src={tabImg6} style={{width:'226px',height:'50px',marginLeft:'-11%'}}/></li>
                                <li onClick={()=>this.handleSwitch("Document")} ><img src={tabImg2} style={{width:'226px',height:'50px',marginLeft:'-22%'}} /></li>
                                
                            </ul>
                            }
                            {this.state.switchDocument === true &&
                            <ul class="breadcrumb" style={{backgroundColor: 'white',height:'50px',marginLeft:'0px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                
                                <li onClick={()=>this.handleSwitch("DocumentIndex")} style={{padding:'12px 45px',fontWeight:'bold',backgroundColor:'#20570F',color:'white'}}>Document Index</li>
                                <li onClick={()=>this.handleSwitch("Document")} style={{padding:'12px 45px',fontWeight:'bold',border:'2px solid #20570F'}}>Document</li>
                                
                            </ul>
                            }
                        </div>
                        
                    </div> */}
                    <div className='inner-3stepDoc-Index-layout' style={{marginTop:'5%'}}>
                        <div className='row mt-3'>
                            <div className='col-md-10'>
                                {this.state.datas === "Verified" ?
                                    <div className='d-flex'>
                                        <div>
                                            <img src={greenDocCheckIcon} style={{width:'60px'}} className="verifiedIcon" />
                                        </div> 
                                        &nbsp;&nbsp;
                                        {this.state.sro !== undefined ?
                                            <div style={{marginTop:'1%'}}>
                                                <span className='dark-text' style={{fontWeight:'bold',color:'#494949',fontSize:'19px',fontFamily:'muli'}}>This Document Belongs to Document Number</span><span className='green-text' style={{color:'#377D22',fontWeight:'bold',fontSize:'18px'}}> R/{this.state.sro}/{this.state.book}/{this.state.documentId}/{this.state.year}</span><span className='dark-text'style={{fontWeight:'bold',color:'#494949',fontSize:'16px'}}> is Verified and Added to Blockchain.</span>
                                            </div>
                                        :
                                        <div style={{marginTop:'1%'}}>
                                            <span className='dark-text' style={{fontWeight:'bold',color:'#494949',fontSize:'19px',fontFamily:'muli'}}>This Document Belongs to Document Number</span><span className='green-text' style={{color:'#377D22',fontWeight:'bold',fontSize:'18px'}}> {this.props.history.location.state.dataValue}</span><span className='dark-text'style={{fontWeight:'bold',color:'#494949',fontSize:'16px'}}> is Verified and Added to Blockchain.</span>
                                        </div>
                                        }
                                    
                                </div>
                                :
                                <div className='d-flex'>
                                    <div>
                                        <img src={nofound} style={{width:'60px'}} className="verifiedIcon" />
                                    </div> 
                                    &nbsp;&nbsp;
                                    {this.state.sro === undefined ?
                                        <div style={{marginTop:'13px'}}>
                                            <span className='dark-text' style={{fontWeight:'bold',color:'#494949',fontSize:'19px',fontFamily:'muli'}}>This Document Number</span><span className='green-text' style={{color:'#C15050',fontWeight:'bold',fontSize:'18px'}}> {this.props.location.state.dataValue}</span><span className='dark-text'style={{fontWeight:'bold',color:'#494949',fontSize:'16px'}}> has a Mismatch </span>
                                        </div>
                                    :
                                        <div style={{marginTop:'23px'}}>
                                            <span className='dark-text' style={{fontWeight:'bold',color:'#494949',fontSize:'19px',fontFamily:'muli'}}>This Document Number</span><span className='green-text' style={{color:'#C15050',fontWeight:'bold',fontSize:'18px'}}> R/{this.state.sro}/{this.state.book}/{this.state.documentId}/{this.state.year}</span><span className='dark-text'style={{fontWeight:'bold',color:'#494949',fontSize:'16px'}}> has a Mismatch</span>
                                        </div>
                                    }
                                </div>
                                }
                            </div>
                            <div className='col-md-2 igr-3stepDoc-Index-tnega-logo'>
                                <img src={logoTnega} style={{width:'87x',height:'86px',marginTop:'-30px'}}  />
                            </div>
                            <div style={{marginLeft:'100px'}}>
                                {this.state.datas == "Verified" ?
                                    <p><span style={{fontWeight:'bold',fontSize:'19px',fontFamily:'muli'}}>Note:</span> Verified Fields Are Highlighted.
                                    </p>
                                :<p><span style={{fontWeight:'bold',fontSize:'19px',fontFamily:'muli'}}>Note: </span>Mismatched Fields Are Highlighted.
                                </p>
                                }
                            </div>
                            
                            {this.state.switchDocumentIndex && <DocumentIndex {...this.props} {...this.state} column1_data={this.state.column1_data} column2_data={this.state.column2_data}></DocumentIndex>}
                            {this.state.switchDocument && <Document {...this.props}  {...this.props} {...this.state} column1_data={this.state.column1_data} column2_data={this.state.column2_data}></Document>}
                            <div className='col-md-12' style={{marginTop:'5%',marginBottom:'3%'}}>
                                <div className='footer-btn'>
                                    {this.state.switchEncumbranceData === true &&
                                    <>
                                        <button className='backBtn' style={{width:'150px',borderRadius:'8px',boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',border:' 2px solid grey', backgroundColor:'#377D22',color:'white'}}>Back</button> &nbsp;&nbsp;&nbsp;
                                        <button className='okayBtn' style={{width:'150px',borderRadius:'8px',boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',border:' 2px solid grey' , backgroundColor:'#377D22',color:'white'}} onClick={this.OkaySwitch}>OK</button>
                                    </>
                                    }
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
      UserData:state.admin.getDocumentIndex.docdata,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        documentIndex,
      },
      dispatch,
    )
  }
  

// export default ThreeStepDocVerification;
export default connect(mapStateToProps, mapDispatchToProps)(ThreeStepDocVerification)