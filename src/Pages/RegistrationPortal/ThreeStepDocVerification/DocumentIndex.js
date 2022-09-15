import React, {Component} from 'react';
import '../../../style/components/Igr.css'

class DocumentIndex extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props)
        return(
            <div className='col-md-12 igr-3step-doc-index mt-4' style={{marginLeft:'3%'}}>
                <div className='igr-3step-doc-index-table'>
                    {this.props.datas !== "Mismatched" ?
                    <div className='row '>
                        <div className='col-md-6 p-0'>
                            {this.props.column1_data.map((val,indx)=>
                            <div key={'column1'+indx} className='row  mt-3' style={{borderRadius:'7px',padding:'10px',width:'90%',height:'45px',border:val.value == 1 ?'1px solid #377D22' : '',boxShadow: val.value == 1 ? '0px 3px 6px #00000029' : ''}}>
                                <div className='col-md-6 doc-index-table-title'>
                                    <label style={{fontWeight:'bolder',marginLeft:'15%',fontSize:'16px',fontFamily:'muli'}}>{val.title}</label>
                                    
                                </div>
                                <div className='col-md-6 doc-index-table-data'>
                                    <span style={{fontSize:'16px',fontFamily:'muli'}}> : {val.data}</span>
                                </div>
                            </div>)}
                        </div>
                        <div className='col-md-6 p-0'>
                            {this.props.column2_data.map((val,indx)=>
                            <div key={'column1'+indx} className='row  mt-3' style={{borderRadius:'7px',padding:'10px',width:'90%',border:val.value == 1 ?'1px solid #377D22' : '',boxShadow: val.value == 1 ? '0px 3px 6px #00000029' : ''}}s>
                                <div className='col-md-6 doc-index-table-title'>
                                    <label style={{fontWeight:'bolder',fontSize:'16px',fontFamily:'muli'}}>{val.title}</label>
                                </div>
                                <div className='col-md-6 doc-index-table-data' >
                                    <span style={{fontSize:'16px',fontFamily:'muli'}}>: {val.data}</span>
                                </div>
                            </div>)}
                        </div>
                    </div>
                   :
                   <div className='row '>
                        <div className='col-md-6 p-0'>
                            {this.props.column1_data.map((val,indx)=>
                            <div key={'column1'+indx} className='row  mt-3' style={{borderRadius:'7px',padding:'10px',width:'90%',border:val.value == 1 ?'1px solid #C15050' : '',boxShadow: val.value == 1 ? '0px 3px 6px #00000029' : ''}}>
                                <div className='col-md-6 doc-index-table-title'>
                                    <label style={{fontWeight:'bolder',marginLeft:'15%',fontSize:'16px',fontFamily:'muli'}}>{val.title}</label>
                                    
                                </div>
                                <div className='col-md-6 doc-index-table-data'>
                                    <span style={{fontSize:'16px',fontFamily:'muli'}}> : {val.data}</span>
                                </div>
                            </div>)}
                        </div>
                        <div className='col-md-6 p-0'>
                            {this.props.column2_data.map((val,indx)=>
                            <div key={'column1'+indx} className='row  mt-3' style={{borderRadius:'7px',padding:'10px',width:'90%',height:'45px',border:val.value == 1 ?'1px solid #377D22' : '',boxShadow: val.value == 1 ? '0px 3px 6px #00000029' : ''}}s>
                                <div className='col-md-6 doc-index-table-title'>
                                    <label style={{fontWeight:'bolder',fontSize:'16px',fontFamily:'muli'}}>{val.title}</label>
                                </div>
                                <div className='col-md-6 doc-index-table-data' >
                                    <span style={{fontSize:'16px',fontFamily:'muli'}}>: {val.data}</span>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    }
                </div>
            </div>)
    }
}

export default DocumentIndex;