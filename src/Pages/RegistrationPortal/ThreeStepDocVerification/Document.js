import React, {Component, Suspense} from 'react';
import Carousel from 'react-multi-carousel';
import docIcon from '../../../Assests/icon/n1.svg';
import { ThreePageDocument } from '../../../Components/icons/ThreePageDocument';
import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { BsChevronLeft, BsXLg } from 'react-icons/bs';
import doc1 from '../../../Assests/icon/R_20275_BOOK_1_1576_2021_TNIGRSDCPRODKVMW02_04082021171059700_152-0.png';
import greenDocCheckIcon from '../../../Assests/icon2/verified.png';
import doc2 from '../../../Assests/icon/R_118_1_77_1994.png';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { viewDocument } from '../../../store/Admin/action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; import { Advertisement } from 'semantic-ui-react';
import axios from 'axios'
import Modal from '../../../Layout/ModalPopUp'
import ViewDocu from '../../../Components/ViewDoc'

const MySwal = withReactContent(Swal);

class Document extends Component {
    constructor(props){
        super(props);
        this.state={
            popUpObj:'',
            dataView: undefined,
            showDoc: false,
            buttonLoader: false,
            resposive:{
                superLargeDesktop: {
                    // the naming can be any, depends on you.
                    breakpoint: { max: 4000, min: 3000 },
                    items: 1,
                    partialVisibilityGutter: 30
                    },

                    desktop: {                    
                    breakpoint: { max: 3000, min: 1024 },
                    items: 1,
                    partialVisibilityGutter: 30
                    },
                    
                    tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 1,partialVisibilityGutter: 30
                    },
                    
                    mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,partialVisibilityGutter: 30
                    },
            }   
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    showModal(){
        const  myModal = new bootstrap.Modal(document.getElementById('simpleModal_2'), {
            keyboard: false
        })
        myModal.show();
       $('.modal-backdrop').removeClass('modal-backdrop')
        // setTimeout(()=>myModal.hide(),5000)

    }

    // showModalPopUp(){

	// 		// this.setState({...this.state,popUpObj:window.open("PopUp.htm","ModalPopUp","width=400," + "height=300")});

	// 		// this.state.popUpObj.focus();

	// 		// this.showModal();
    //         window.open("PopUp.htm","ModalPopUp","width=400," + "height=500")
	// 	}

        viewDoc = () => {
            this.setState({
                buttonLoader: true
            })
            const data= this.props.history.location.state.dataset;
            console.log(data)
            const body={
                registrationDocumentNo : data
                // registrationDocumentNo : "R/3/1/43/2018"
            }
            axios.post('http://3.110.180.81:3000/api/dashboard/gettiff', body, {
                responseType:'arraybuffer',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('auth_token')
                  },
            })
            .then((res) => {
                console.log(res.data)
                // console.log(res.data.Data.Doc)
                this.setState({
                    dataView:res.data,
                    buttonLoader: false,
                    showDoc: true
                })


            }).catch((err) => {
                console.log(err)
                this.setState({
                    buttonLoader:false
                })
                MySwal.fire("No found certificate")

            })
            // this.props.viewDocument(body)
            

            // window.location.href = this.props.UserData.doc_url;
            // console.log(this.props.UserData);
            // if(this.props.UserData !== undefined){
            // window.open( 
            //     this.props.UserData.doc_url, "_blank","width=400" ,"height=300" );
            // }else{
            //     MySwal.fire("No found certificate");
            // }
        }

    CustomLeftArrow = ({ onClick, handlePrevImage,...rest }) => {

        return (
        
        <div
        
        style={{
        
        textAlign: "center",
        
        position: "absolute",
        
        left:'40px', display:'flex',justifyContent:'center',alignItems:'center',
        
        width:'35px',height:'35px',background:'#fff',color:'#9D1D27',borderRadius:'100%',border:'1px solid #9D1D27'
        
        }}
        
        onClick={() => {onClick();handlePrevImage();}} >
        
        <BsChevronLeft size={18}></BsChevronLeft>
        
        </div>
        
        )
        
        };

        showModal = () => this.setState(prevState => ({
            showDoc: !prevState.showDoc,
          }));
    render(){
        console.log(this.props);
        console.log(this.state)
        return(
            <div className='col-md-12 igr-3step-doc-index mt-4'>
               <div className='igr-3step-doc-index-table'>
                    <div className='igr-3step-doc-page'>
                        <div className='row'>
                            {/* <div className='col-md-12'>
                                <label className='dark-text' style={{fontWeight: 'bold',marginLeft:'12%',fontSize:'18px'}}>Note :</label>
                            </div>  */}
                            {/* <div className='col-md-12 text-center'>
                                <span> </span> 
                                <span className='dark-text' style={{fontWeight: 'bold',fontSize:'18px'}}>The Document ID</span><span className='green-text' style={{color:'#377D22',fontWeight:'bold',fontSize:'18px'}}> R/{this.props.location.state.sro}/{this.props.location.state.book}/{this.props.location.state.documentId}/{this.props.location.state.year}</span><span className='dark-text' style={{fontWeight: 'bold',fontSize:'18px'}}> has been Updated By Amendment on Page NO :<span className='dark-text' style={{color:'#377D22',fontWeight:'bold',fontSize:'18px'}}> 5,6</span></span>
                            </div>  */}
                            <div className='col-md-12 text-center mt-5 mb-1'>
                                <ThreePageDocument />
                            </div>  
                            
                            <div className='col-md-12 text-center mb-2 mt-2' style={{color:'#377D22',fontSize:'0.7rem',fontWeight:600}}>
                               {/* <label>Drag & Drop your Certificate Here.</label> */}
                            </div> 
                            <div className='col-md-12 text-center'>
                                {this.state.buttonLoader == false ?
                                    <button onClick={() => this.viewDoc()} style={{backgroundColor:'#377D22',border:'2px solid #377D22',color:'white',borderRadius: '5px',fontFamily:'muli'}}>View Document</button>
                                :
                                    <div class="spinner-border"></div>
                                }
                            
                            </div>   
                            
                        </div>
                    </div>
               </div>
               <div className="modal fade" id="simpleModal_2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className= {"modal-dialog modal-lg"} role="document">
                        <div className="modal-content" style={{position:'relative'}}>
                            
                            <div className='modal-header' style={{display:'flex', color:"#292828D8",fontSize:'0.8rem',fontWeight:'600'}}>
                                <div>
                                    <div >
                                        <img src={greenDocCheckIcon} style={{width:'2rem'}}/> &nbsp;   
                                        <span className='dark-text' style={{fontFamily:'muli'}}>This Document Belongs to Document Number</span><span className='green-text'> R/Adayar/Book1/1067/2019</span><span className='dark-text'> is Verified and Added to Blockchain.</span>
                                    </div>
                                    <div>
                                        <span className='dark-text' style={{marginLeft:'2.5rem',fontFamily:'muli'}}>Transaction ID:</span> &nbsp;&nbsp;
                                        <span className='small-green-text' style={{fontFamily:'muli'}}>15443mdocjsi49020p83sxcmoa34097</span>
                                    </div>
                                </div>
                                <div style={{position:'absolute',right:'1rem'}}>
                                    <BsXLg size={18} style={{cursor:'pointer'}}></BsXLg>
                                </div>
                            </div>
                            <div className="modal-body table-responsive" style={{zIndex:7}} >
                                {/* <div className='row'>
                                    <div className='col-md-12'>
                                        <label className='dark-text'>Note :</label>
                                    </div> 
                                    <div className='col-md-12 text-center'>
                                        <span className='dark-text'>The Document ID</span><span className='green-text'> R/Adayar/1067/2019</span><span className='dark-text'> has been Updated By Amendment on Page NO : 5,6</span>
                                    </div>
                                </div>*/}
                                <div className='row mt-3'>
                                    <div className='col-md-12 text-center'>
                                        <div style={{width:'95%', height:'44rem',marginLeft:'2%'}} className="table-responsive">
                                            <img  src={doc1} style={{width:'85%',height:'100%'}}/>
                                        </div>
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <div className='footer-btn'>
                                            <button className='backBtn'>Back</button> &nbsp;&nbsp;&nbsp;
                                            <button className='okayBtn'>OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.showDoc} handleCloseModal={this.showModal}>
                <div>
                    <div class="row">
                        <a style={{marginLeft:'93%', fontWeight:'bold', fontSize:'25px',cursor:'pointer'}} onClick={this.showModal}>X</a>
                        <div style={{height:'400px',width:'80%',marginLeft:'9%',marginBottom:'20px'}}>
                            <ViewDocu {...this.state}/>
                        </div>
                    </div>
                </div>
                </Modal>
            </div>)
    }
}

const mapStateToProps = (state) => {
    console.log("state",state)
    return {
       get_view: state.admin.get_viewDoc
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            viewDocument
        }
        , dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Document);

