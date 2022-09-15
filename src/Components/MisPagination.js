import React, { useState, useEffect } from 'react'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'

export const MisPaginationBar = ({
  elementsPerPage,
  totalElelemt,
  onPaginationChange,
}) => {
  const [counter, setCounter] = useState(1)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalElelemt / elementsPerPage); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => {
    const value = elementsPerPage * counter

    //  console.log("start value " , value-elementsPerPage)
    //  console.log("end value " , value)
    //onPaginationChange(value-elementsPerPage , value)
  }, [counter])

  // console.log(totalElelemt)
  return (
    <div className="col-md-8 mt-5 mb-4 navigationBarScss" style={{marginLeft:'20%'}}>
      {/* <div className="navigation-dataNumber">
        <div className="navigation-page-data-count">{elementsPerPage}</div>
        &nbsp; &nbsp;
        <label style={{width:'80%'}}>Items Per Page</label>
      </div> */}
      {/* {console.log(counter)} */}
      {totalElelemt !== 0 &&
        <div className="pagination-pagenumber">
          <div className="pagination-paggination">
            <AiFillStepBackward
              className="btn-btn-primary"
              onClick={() => {
                if (counter > 1) {
                  setCounter(counter - 1)
                  onPaginationChange(counter - 1)
                }
              }}
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            ></AiFillStepBackward>
            <div style={{display:"flex", alignItems:'space-between'}}> 
            {counter !== 1  && counter !== 2 && counter !== 3 && counter !== pageNumbers.length  && counter !== (pageNumbers.length-1) && counter !== (pageNumbers.length-2) ?
                <>
                <button    
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}        
                  className={`${counter === 1 ? 'active' : 'inactive'}`}
                  id={1}
                  onClick={() => {
                    setCounter(1)
                    onPaginationChange(1)
                  }}>1</button>
                  {pageNumbers.map((index) => (
                    <>              
                    {index == counter &&
                    <>
                    ....<button
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                      key={counter-1}
                      className={`${(counter-1) === index ? 'active' : 'inactive'}`}
                      id={counter-1}
                      onClick={() => {
                        setCounter(counter-1)
                        onPaginationChange(counter-1)
                      }}
                    >
                        {counter-1}
                    </button>
                    <button
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                      key={counter}
                      className={`${counter === index ? 'active' : 'inactive'}`}
                      id={counter}
                      onClick={() => {
                        setCounter(counter)
                        onPaginationChange(counter)
                      }}
                    >
                        {counter}
                    </button>
                    <button
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                      key={counter+1}
                      className={`${(counter+1) === index ? 'active' : 'inactive'}`}
                      id={counter+1}
                      onClick={() => {
                        setCounter(counter+1)
                        onPaginationChange(counter+1)
                      }}
                    >
                        {counter+1}
                    </button>.....
                    </>
                    }
                    </>
                  ))}
                  {console.log(pageNumbers)}
                  <button      
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}      
                  className={`${counter === pageNumbers.length ? 'active' : 'inactive'}`}
                  id={pageNumbers.length}
                  onClick={() => {
                    setCounter(pageNumbers.length)
                    onPaginationChange(pageNumbers.length)
                  }}>{pageNumbers.length}</button>
                  </>
            :
                  <>
                  {counter == 1  || counter == 2 || counter == 3 ?
                  <>
                    <button
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    className={`${counter === 1 ? 'active' : 'inactive'}`}
                    id={1}
                    onClick={() => {
                      setCounter(1)
                      onPaginationChange(1)
                    }}>1</button>
                    <button
                    
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    className={`${counter === 2 ? 'active' : 'inactive'}`}
                    id={2}
                    onClick={() => {
                      setCounter(2)
                      onPaginationChange(2)
                    }}>2</button>
                    <button
                    
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    className={`${counter === 3 ? 'active' : 'inactive'}`}
                    id={3}
                    onClick={() => {
                      setCounter(3)
                      onPaginationChange(3)
                    }}>3</button>
                    {counter == 3 &&
                      <button
                      style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                      className={`${counter === 4 ? 'active' : 'inactive'}`}
                      id={4}
                      onClick={() => {
                        setCounter(4)
                        onPaginationChange(4)
                      }}>4</button>
                    }...........
                    <button
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    className={`${counter === pageNumbers.length ? 'active' : 'inactive'}`}
                    id={pageNumbers.length}
                    onClick={() => {
                      setCounter(pageNumbers.length)
                      onPaginationChange(pageNumbers.length)
                    }}>{pageNumbers.length}</button>
                    </>
                  :
                  <>
                  {console.log('dgcadcgau')}
                  <button
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    className={`${counter === 1 ? 'active' : 'inactive'}`}
                    id={1}
                    onClick={() => {
                      setCounter(1)
                      onPaginationChange(1)
                    }}>1</button>
                  .......
                  {/* {counter == (pageNumbers.length - 2) &&
                    <button
                    style={{padding:'0px 2px'}}
                    className={`${counter === (pageNumbers.length-3) ? 'active' : 'inactive'}`}
                    id={pageNumbers.length-3}
                    onClick={() => {
                      setCounter(pageNumbers.length-3)
                      onPaginationChange(pageNumbers.length-3)
                    }}>{pageNumbers.length-3}</button>
                  } */}
                    <button
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    key={pageNumbers.length-2}
                    className={`${counter === (pageNumbers.length-2) ? 'active' : 'inactive'}`}
                    id={pageNumbers.length-2}
                    onClick={() => {
                      setCounter(pageNumbers.length-2)
                      onPaginationChange(pageNumbers.length-2)
                    }}>{pageNumbers.length-2}</button>
                    <button
                    key={pageNumbers.length-1}
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    className={`${counter === (pageNumbers.length-1) ? 'active' : 'inactive'}`}
                    id={pageNumbers.length-1}
                    onClick={() => {
                      setCounter(pageNumbers.length-1)
                      onPaginationChange(pageNumbers.length-1)
                    }}>{pageNumbers.length-1}</button>
                    <button
                    key={pageNumbers.length}
                    style={{padding:'0px 2px',marginLeft:'5px',marginRight:'5px'}}
                    className={`${counter === (pageNumbers.length) ? 'active' : 'inactive'}`}
                    id={pageNumbers.length}
                    onClick={() => {
                      setCounter(pageNumbers.length)
                      onPaginationChange(pageNumbers.length)
                    }}>{pageNumbers.length}</button>
                    
                  </>
                  }

              
                  </>
            }
          
            </div>

            <AiFillStepForward
              className="btn-btn-primary"
              onClick={() => {
                if (counter < pageNumbers.length) {
                  setCounter(counter + 1)
                  onPaginationChange(counter + 1)
                }
              }}
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                bordern:'none'
              }}
            ></AiFillStepForward>
          </div>
        </div>
      }
    </div>
  )
}
