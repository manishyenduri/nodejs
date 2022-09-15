import React from 'react';
import {useHistory} from 'react-router'

export const FullLayoutComponent =({children})=>{
    return (
        <div className="row">
            <div className="col-md-12 bg-success">
            Header
            </div>
            <div className="col-md-12">
                {children}
            </div>
            <div className="col-md-12 bg-info">
                Footer
            </div>
        </div>
    )
}