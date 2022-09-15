
import React from 'react';
import { BsXLg } from 'react-icons/bs';
export const SimpleModalPop =({propClass, iconSvg ,children,closeModalPop})=>{

    
        return(            
            <div className="modal fade" id="simpleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className= {"modal-dialog "+propClass} role="document">
                    <div className="modal-content" style={{position:'relative'}}>
                        
                        <div className='modal-header' style={{display:'flex', color:"#292828D8",fontSize:'0.8rem',fontWeight:'600'}}>
                            <div>
                            <img src={iconSvg} style={{width:'1.2rem'}}/> &nbsp; <span>Running Batchs</span>
                            </div>
                            <div style={{position:'absolute',right:'1rem'}}>
                            <a onClick={() => closeModalPop()}><BsXLg size={18} style={{cursor:'pointer'}}></BsXLg></a>
                            </div>
                        </div>
                        <div className="modal-body table-responsive" style={{zIndex:7}} >
                            {children}
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        );
}