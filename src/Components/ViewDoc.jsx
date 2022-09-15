import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import axios from 'axios'
import fs from 'fs'


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewDoc (props) {    
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(null)

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages)
  //   setPageNumber(1)
  // }
  console.log(props.dataView)


  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
    
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  
  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  
  function previousPage() {
    changePage(-1);
  }
  
  function nextPage() {
    changePage(1);
  }
  

    return(
        <div>
          
          <Document
        file={props.dataView}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div style={{marginBottom:"20px"}}>
      <div className="mt-4" style={{marginBottom:'40px'}}>
        <div className="pagec">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </div>

        <div className="buttonc">
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          className="Pre"
          style={{backgroundColor: '#30711C',border:'none',borderRadius:'5px',color:'white'}}
            
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
           
          style={{backgroundColor: '#30711C',border:'none',borderRadius:'5px',color:'white',marginLeft:'20px'}}
        >
          Next
        </button>
        </div>
      </div>
      </div>
            {/* <Document
              file={props.dataView}
              onLoadSuccess={onDocumentLoadSuccess}
              
            >
              <Page pageNumber={pageNumber} />
            </Document> */}
        </div>
    )
}
export default ViewDoc