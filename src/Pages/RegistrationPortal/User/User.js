import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import durationIcon from '../../../Assests/icon2/term (1).svg'
import chartIcon from '../../../Assests/icon/Component 91.svg'
import { BsCircleFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { MisPaginationBar } from '../../../Components/MisPagination'
import { getAllUsersDetails, updateStatus } from '../../../store/Admin/action'
import { Button } from 'semantic-ui-react'
import { Chart as ChartJS, Tooltip, Title, ArcElement, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { treemap } from 'd3'
import { data } from 'jquery'
import glass from '../../../Assests/icon/Group 1124.svg'
const MySwal = withReactContent(Swal)

ChartJS.register(Tooltip, Title, ArcElement, Legend)
// import { Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartSeriesLabels } from '@progress/kendo-react-charts';
// import 'hammerjs';
// import data from './power-distribution-data.json';

// const labelContent = e => e.category;
// import { Doughnut } from 'react-chartjs-2';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPerPage: 5,
      userDisplayed: [],
      switch_allDocs: true,
      switch_mismatched: false,
      switch_blockedUser: false,
      filteredValue: '',
      count:[],
      search: undefined,
      itemstate:false,
      start: 0,
      // end:5,

      pieData: {
        datasets: [
          {
          
            data:[this.props.getAllUsers_list.length , 0, this.props.getBlock_user.length],
            backgroundColor: [
              'rgba(191, 221, 166, .8)',
              'rgba(73, 114, 149,.8)',
              'rgba(246, 141, 136,.8)',
            ],
          },
        ],
      },
      dummydata: [],
      data: [
      ],

      blockData: [],
      digCount:'',
      igrCount:'',
      droCount:'',
      sroCount:'',
      totalUser:'',
      blockcount:'',
      item: undefined,
    }

  }

  componentDidMount() {
    if(this.props.history.location.state == undefined){
      this.props.history.push('/')
    }

    

    this.props.getAllUsersDetails()

    this.setState({
      totalUser:this.props.getAllUsers_list.length,
    })
    // console.log('mount', this.props.getAllUsers_list.length)
    if(this.props.getBlock_user.length !== 0){
      // console.log(this.props.getBlock_user);
       let count = 0;
       let count1 =0;
       let count2 = 0;
       let count3 = 0;
       for(var i=0;i<this.props.getBlock_user.length;i++){
       if(this.props.getBlock_user[i].role == "DIG"){
          count++;
  
        }
        if(this.props.getBlock_user[i].role == "IGR"){
          count1++;
  
        }
        if(this.props.getBlock_user[i].role == "DRO"){
          count2++;
  
        }
        if(this.props.getBlock_user[i].role == "SRO"){
          count3++;
  
        }
      }
      // console.log(count);
      // console.log(count1);
      // console.log(count2);
      // console.log(count3);
      this.setState({
        digCount:count,
        igrCount:count1,
        droCount:count2,
        sroCount:count3,
      })
  
      
      }
    
  }

  componentDidUpdate(prev) {

    


    if (prev.getAllUsers_list != this.props.getAllUsers_list) {
      if (this.props.getAllUsers_list.length != 0) {
        let temp = this.state
        const reverseData =this.props.getAllUsers_list.reverse();
        temp.data=[];
        for (var i = 0; i < reverseData.length; i++) {
          var data = {
            userId: reverseData[i]._id,
            email: reverseData[i].email,
            role: reverseData[i].role,
            status: reverseData[i].status,
          }

          temp.data.push(data)
        }
        temp.blockData = temp.data.filter((user) => user.status !== 'Active')
        temp.blockcount = temp.blockData.length
        temp.totalUser = temp.data.length
        temp.pieData.datasets[0].data[0] = temp.data.length
        temp.pieData.datasets[0].data[2] = temp.blockData.length

        temp.Allusercount = temp.data.length
        temp.blockUsercount = temp.blockData.length
        temp.dummydata = temp.data
        temp.userDisplayed = temp.data.slice(0, temp.userPerPage)
        // console.log('hbjhbbbbbbbbb--- ',temp,this.props.getAllUsers_list)
        this.setState(temp)
      }
    }

    if(prev.all_users_action_update!=this.props.all_users_action_update){
      if(this.props.all_users_action_update.message=="Profile updated successfully")
        {
          // console.log("test running...")
          this.props.getAllUsersDetails();
          this.setState({
            switch_allDocs: true,
            switch_blockedUser: false
          })
    }

   
    

    }
  }

  handleSwitchTabs = (name) => {
    if (name == 'switch_allDocs') {
      let data = []

      this.state.filteredValue === ''
        ? (data = this.state.dummydata)
        : (data = this.state.data.filter((user) => {
            return user.role === this.state.filteredValue
          }))

      this.setState({
        ...this.state,
        switch_allDocs: true,
        switch_mismatched: false,
        switch_blockedUser: false,
        data: data,
        userDisplayed: data.slice(0, this.state.userPerPage),
      })
    } else if (name == 'switch_blockedUser') {
      let data = []
      console.log(this.state.data)
      this.state.filteredValue === ''
        ? (data = this.state.data.filter((user) => user.status !== 'Active'))
        : (data = this.state.data.filter((user) => {
            return (
              user.status !== 'Active' && user.role === this.state.filteredValue
            )
          }))

          console.log(data)

      this.setState({
        ...this.state,
        switch_allDocs: false,
        switch_mismatched: false,
        switch_blockedUser: true,
        data: data,
        userDisplayed: data.slice(0, this.state.userPerPage),
      })
    }
  }

  handleRoute(user) {
    // this.props.history.push(`/batch-id/${id}`)
    this.props.history.push({
      pathname: `/admin/user/userdetails`,
      state: { user,
      },
    })
  }

  handleBlock = (id, status) => {
    //add alert
    let action = status === 'Active' ? 'Block' : 'Unblock'

    MySwal.fire({
      title: `Are you sure you want to ${action} the User?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        let update = this.props.updateStatus(id, status)
        if (update) {
          this.componentDidUpdate()
        }
      } else {
        MySwal.fire('Action Cancelled!')
      }
    })
  }
  handlePaginate = (currentPage) => {
    const indexOfLastData = currentPage * this.state.userPerPage
    const indexOfFirstData = indexOfLastData - this.state.userPerPage
    const displayData = this.state.data.slice(
      indexOfFirstData,
      indexOfLastData,
    )
    this.setState({
      ...this.state,
      userDisplayed: displayData,
    })

    console.log('curretn Page ', currentPage)
  }

  filterUser = () => {
    const index = document.getElementById('filterByRoles')
    const filterUserBy = index.options[index.selectedIndex].value

   
    if(filterUserBy != "USERS"){
      if (filterUserBy !== 'Select User Type') {
        const dummydata = this.state.data.filter((user) => {
          if (this.state.switch_blockedUser) {
            return user.role === filterUserBy && user.status === 'Inactive'
          } else {
            return user.role === filterUserBy
          }
        })
        if(filterUserBy === "DIG"){
          let count=0;
          let count1=0;
          let temp = this.state;
    
    
          for(var i=0;i<this.state.data.length;i++){
            if(this.state.data[i].role === "DIG"){
              count++;
            }
          }
          for(var i=0;i<this.state.blockData.length;i++){
            if(this.state.blockData[i].role === "DIG"){
              count1++;
            }
          }
          // console.log(count);
          // console.log(count1);
          temp.blockcount =count1
          temp.totalUser = count
          temp.pieData.datasets[0].data[0] = count
          temp.pieData.datasets[0].data[2] = count1
    
          this.setState(temp);
          // this.setState({
          //   blockcount: count1,
          //   totalUser: count,
          // })
        }
        if(filterUserBy === "DRO"){
          let count=0;
          let count1=0;
          let temp = this.state;
          for(var i=0;i<this.state.data.length;i++){
            if(this.state.data[i].role === "DRO"){
              count++;
            }
          }
          for(var i=0;i<this.state.blockData.length;i++){
            if(this.state.blockData[i].role === "DRO"){
              count1++;
            }
          }
          console.log(count);
          console.log(count1);
          temp.blockcount =count1
          temp.totalUser = count
          temp.pieData.datasets[0].data[0] = count
          temp.pieData.datasets[0].data[2] = count1
    
          this.setState(temp);
        }
        if(filterUserBy === "SRO"){
          let count=0;
          let count1=0;
          let temp = this.state
          for(var i=0;i<this.state.data.length;i++){
            if(this.state.data[i].role === "SRO"){
              count++;
            }
          }
          for(var i=0;i<this.state.blockData.length;i++){
            if(this.state.blockData[i].role === "SRO"){
              count1++;
            }
          }
          // console.log(count);
          // console.log(count1);
          temp.blockcount =count1
          temp.totalUser = count
          temp.pieData.datasets[0].data[0] = count
          temp.pieData.datasets[0].data[2] = count1
    
          this.setState(temp);
        }
        // console.log(filterUserBy);
        // console.log('filtered user', dummydata, '', filterUserBy)

        this.setState({
          ...this.state,
          dummydata: dummydata,
          userDisplayed: dummydata.splice(0, this.state.userPerPage),
          filteredValue: filterUserBy,
        })
      }
    }else{
      if (filterUserBy !== 'Select User Type') {

        let temp = this.state
        const dummydata = this.state.data
        // console.log(filterUserBy);
        // console.log('filtered user', dummydata, '', filterUserBy)

        temp.dummydata = dummydata
        temp.userDisplayed = temp.dummydata.splice(0, this.state.userPerPage)
        temp.filteredValue = filterUserBy
        temp.pieData.datasets[0].data[0] = this.state.Allusercount
        temp.pieData.datasets[0].data[2] = this.state.blockUsercount
        temp.blockcount = this.state.blockUsercount
        temp.totalUser = this.state.Allusercount

        this.setState(temp);

      }
    }

    
   
  }

  keyPress = (e) => {
    // console.log(e.target.value)
    // console.log(this.props.getAllUsers_list);
    if(e.key === "Enter"){
    this.setState({
      item: e.target.value, 
      itemstate:false,
      userDisplayed: this.state.dummydata.splice(0,e.target.value),
      userPerPage:e.target.value
    })
  }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      this.setState({
        item: 5, 
        itemstate:false,
        userDisplayed: this.props.dummydata.splice(0,5),
        userPerPage:5
      })
    }
  }

  handleSearch = (e) => {
    // console.log(e.target.value)
    let temp = this.state;
    const data= e.target.value
    const data1 =[]
    var data2 = undefined
    let count=0;
    if(e.key === "Enter"){
      // console.log(data)
      for(var i=0;i<this.state.dummydata.length;i++){
        if(data !== undefined){
            data2=this.state.dummydata[i].email.includes(data)
            // console.log('data1')
            if(data2 == true){
              data1.push(this.state.dummydata[i])
              
            }
        }
      }
      // console.log(data1)
      temp.data=data1
      temp.userDisplayed=this.state.data.slice(0, 5)
      this.setState(temp)
      // if(count == 0){
      //   MySwal.fire('No data found')
      // }
    }
    
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    if(this.state.itemstate == false && this.state.item !== undefined){
      this.setState({
        userPerPage: this.state.item,
        itemstate: true
      })
    }
    
    return (
      <div style={{overflowY:'scroll',height:'600px',width:'101%',overflowX:'hidden'}}>
      <div className="row">
        <div className="col-md-12">
          <div className="igr-batch-id-index">
            <div className="igr-batch-id-Index-layout">
              <div className="row">
                <div className="col-md-12 igr-batch-id-Idnex-header">
                  <img src={durationIcon} /> &nbsp; &nbsp;
                  <span style={{fontFamily:'muli'}}>Users: {this.props.match.params.id}</span>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="row" style={{display:'flex',marginTop:'8%'}}>
                        <div className="col-md-4" style={{ color: 'green',fontWeight: 'bold',fontFamily:'muli'}} >
                        All District Regional User’s
                        </div>
                        <div className="col-md-4">
                          <div style={{display:'flex',border:'2px solid #276315',borderRadius:'7px',height:'38px',backgroundColor:'#F4F5F5',width:'100%'}}>
                            {/* <img src={glass} style={{width:'36px',height:'24px',marginTop:'6px'}} /> */}
                            <input placeholder="Search" style={{marginLeft:'0px',height:'34px',border:'none',borderRadius:'7px',backgroundColor:'#F4F5F5',width:'100%',}}  onKeyPress={(e) => this.handleSearch(e)}/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <select
                            value={this.state.filteredValue}
                            id="filterByRoles"
                            className="dropdown  "
                            style={{
                              color: 'green',
                              border: '1px solid #377D22',
                              outline: 'none',
                              padding: '.5rem .7rem',
                              boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                              borderRadius: '7px'
                            }}
                            onChange={() => {
                              this.filterUser()
                            }}
                          >
                            <option style={{fontWeight: 'bold',fontFamily:'muli'}}>Select User Type</option>
                            <option value="DIG" style={{fontWeight: 'bold',fontFamily:'muli'}}>DIG</option>
                            <option value="DRO" style={{fontWeight: 'bold',fontFamily:'muli'}}>DRO</option>
                            <option value="SRO" style={{fontWeight: 'bold',fontFamily:'muli'}}>SRO</option>
                            <option value="USERS" style={{fontWeight: 'bold',fontFamily:'muli'}}>ALL USERS</option>
                          </select>
                        </div>
                      </div>
                      <div className="row" style={{marginTop:'5%'}}>
                        <div className="col-md-4 p-0">
                          <div className="batchId-info-row">
                            <div>
                              <label className="batch-id-row1-title" style={{fontFamily:'muli'}}>
                                Total Users
                              </label>
                            </div>
                            <div className="batch-id-row1-data">
                              <div>
                                <label>
                                  {this.state.totalUser}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 p-0">
                          <div className="batchId-info-row">
                            <div>
                              <label className="batch-id-row1-title" style={{fontFamily:'muli'}}>
                                Blocked Users
                              </label>
                            </div>
                            <div className="batch-id-row2-data">
                              <div>
                                <label style={{fontFamily:'muli'}}> {this.state.blockcount}</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 p-0">
                          <div className="batchId-info-row">
                            <div>
                              <label className="batch-id-row1-title" style={{fontFamily:'muli'}}>
                                Delete User
                              </label>
                            </div>
                            <div className="batch-id-row3-data">
                              <div>
                                <label>0</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="mt-3" id="Doughnut">
                        <div className="row">
                          {/* <div className="col-md-12 p-0 text-center">
                            <span style={{color: '#000000',fontSize: '.8rem',fontWeight: '600',}}>
                            </span>
                          </div> */}
                          <div className="col-md-1"></div>
                          <div className="col-md-5 p-0 pb-2" id="doght" style={{height: 'calc(100% - .7rem)',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                            <Doughnut
                              data={this.state.pieData}
                              options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                legend: {
                                  display: false,
                                },
                              }}
                            ></Doughnut>
                          </div>
                          <div className="col-md-6 batch-id-dataLabel" id="batch">
                            <div className="row">
                              <div className="col-md-12 batch-id-dataLabel-row1 mt-3">
                                <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                <div style={{fontFamily:'muli'}}>Total Users</div>
                              </div>
                              <div className="col-md-12 batch-id-dataLabel-row3 mt-3">
                                <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                <div style={{fontFamily:'muli'}}>Blocked Users</div>
                              </div>
                              <div className="col-md-12 batch-id-dataLabel-row2 mt-3">
                                <div></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                <div style={{fontFamily:'muli'}}>Delete User</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="igr-batch-id-index">
            <div className="igr-batch-id-Index-layout">
              <div className="row">
                <div className="col-md-12 igr-batch-tab-Index-header">
                  <div className="igr-batch-tab">
                    <div
                      onClick={() => this.handleSwitchTabs('switch_allDocs')}
                      className={
                        this.state.switch_allDocs
                          ? 'selected-tab'
                          : 'unselected-tab'
                      }
                      style={{ marginLeft: '1rem',fontFamily:'muli' }}
                    >
                      All Users
                    </div>
                    <div
                      onClick={() =>
                        this.handleSwitchTabs('switch_blockedUser')
                      }
                      className={
                        this.state.switch_blockedUser ? 'selected-tab' : '-tab'
                      }
                      style={{ marginLeft: '2rem',fontFamily:'muli' }}
                    >
                      Blocked Users
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4 mt-4">
                  <div className="row table-responsive">
                    <table className="igr-batch-id-all-documents-table">
                      <tbody>
                        <tr className="theader">
                          <td style={{fontFamily:'muli'}}>User ID</td>
                          <td style={{fontFamily:'muli'}}>Email</td>
                          <td style={{fontFamily:'muli'}}>Role</td>
                          <td style={{fontFamily:'muli'}}>Status</td>
                          <td style={{fontFamily:'muli'}}>Action</td>
                        </tr>

                        {this.state.data.length != 0 &&
                          this.state.userDisplayed.map((items, indx) => (
                            <tr
                              className={
                                indx % 2 == 0 ? 'all-users' : 'blocked-user'
                              }
                              style={{
                                height: '4rem',
                                background:
                                  indx % 2 ? 'rgba(55, 125, 34,0.03)' : '#fff',
                              }}
                            >
                              <td
                                onClick={() => this.handleRoute(items)}
                                className="idHighLighter"
                                style={{
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                  cursor: 'default',
                                }}
                              >
                                <span style={{fontFamily:'muli'}}>{items.userId.slice(0, 10)+'...'}</span>
                              </td>
                              <td style={{fontFamily:'muli',cursor:'default'}}>{items.email}</td>
                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'default',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',fontFamily:'muli'
                                }}
                              >
                                {items.role === "admin" ?
                                <a style={{fontFamily:'muli'}}>
                                  Operator
                                  </a>
                                :
                                <a style={{fontFamily:'muli'}}>
                                  {items.role}
                                </a>
                                }
                              </td>
                              {items.status === "Active" ?
                              <td
                                style={{
                                  color: 'rgba(55, 125, 34,0.8)',
                                  cursor: 'default',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <BsCircleFill
                                  color={'#377D22'}
                                  size={8}
                                ></BsCircleFill>{' '}
                                &nbsp;&nbsp;{items.status}
                              </td>
                              :
                              <td
                                style={{
                                  color: '#ff0000',
                                  cursor: 'pointer',
                                  fontSize: 'small',
                                  textAlign: 'center',
                                  verticalAlign: 'middle',
                                }}
                              >
                                <BsCircleFill
                                  color={'#ff0000'}
                                  size={8}
                                ></BsCircleFill>{' '}
                                &nbsp;&nbsp;{items.status}
                              </td>
                              }
                              <td>
                                <Button
                                  onClick={() =>
                                    this.handleBlock(items.userId, items.status)
                                  }
                                  style={{
                                    display: 'block',
                                    margin: 'auto',
                                    cursor: 'pointer',
                                    border: '1px solid #902A2C',
                                    backgroundColor: 'transparent',
                                    borderRadius: '12px',
                                    color: '#902A2B',
                                    fontSize: 'small',
                                    onMouseOver: "this.style.color='red'",
                                    onMouseOut: "this.style.color='green'",
                                  }}
                                >
                                  {items.status === 'Active'
                                    ? 'Block'
                                    : 'Unblock'}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        {/* <tr> */}
                        {/* {this.state.switch_blockedUser && this.state.data.map((items,indx)=><tr  className={"blocked-user"} style={{height:'4rem', background:indx%2?'rgba(55, 125, 34,0.03)':'#fff'}}>
                                                            <h1></>
                                                    </tr>)}

                                                </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <div style={{ width: '100%',marginBottom:'20px' }}>
                    <div className="row">
                        <div style={{display: 'flex',}}>
                          <div style={{display:'flex'}}>
                            <input  onKeyPress={(e) => this.keyPress(e)} style={{width:'40px',height:'20px'}}/><p style={{fontSize:'12px',fontWeight:'bold',marginLeft:'5px'}}>item per page</p>
                          </div>
                          <MisPaginationBar
                            elementsPerPage={this.state.userPerPage}
                            totalElelemt={this.state.data.length}
                            onPaginationChange={this.handlePaginate}
                          ></MisPaginationBar>
                      </div>
                    </div>
                  </div>
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
    getAllUsers_list: state.admin.getallUsers_details,
    all_users_action_update:state.admin.all_users_action_update,
    getBlock_user: state.admin.block_user,
  }
}

const mapDispatchToProps = (disptach) => {
  return bindActionCreators(
    {
      getAllUsersDetails,
      updateStatus,
    },
    disptach,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
