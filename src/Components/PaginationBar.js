// import React, { useState, useEffect } from 'react'
// import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'


// export const PaginationBar =({elementsPerPage , onPaginationChange})=>{
//     console.log("showPerPage",elementsPerPage);
//       const [counter, setCounter] = useState(1);

//       useEffect(()=>{
//             const value = elementsPerPage * counter;
//             //  console.log("start value " , value-elementsPerPage)
//             //  console.log("end value " , value)
//             //  onPaginationChange(value-elementsPerPage , value)
//       }, [counter])
//   return (
//     <div className="col-md-12 mt-5 mb-4 navigationBarScss">
//       <div className="navigation-dataNumber">
//         <div className="navigation-page-data-count">5</div>
//         &nbsp; &nbsp;
//         <label>Items Per Page</label>
//       </div>
//       <div className="pagination-pagenumber">
//         <div className="pagination-paggination">
//           <AiFillStepBackward
//             className="btn-btn-primary"
//             onClick={() => setCounter(counter - 1)}
//             style={{
//               width: '3rem',
//               cursor: 'pointer',
//               backgroundColor: 'transparent',
//             }}
//           ></AiFillStepBackward>
//           <button className="active">1</button> &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             2
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             3
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             4
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             5
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             6
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             7
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             8
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             9
//           </button>
//           &nbsp;&nbsp;
//           <button style={{ backgroundColor: 'transparent', border: 'none' }}>
//             10
//           </button>
//           &nbsp;&nbsp;
//           <AiFillStepForward
//             className="btn-btn-primary"
//             onClick={() => setCounter(counter + 1)}
//             style={{ cursor: 'pointer' }}
//           ></AiFillStepForward>
//         </div>
//       </div>
//     </div>
//   )
// }
