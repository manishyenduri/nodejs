import React, { Component } from 'react'
import logo from './logo.svg'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RouteWithLayout from './Layout/RouteWithLayout'
import { HomeScreen } from './Home/index'
import { FullLayoutComponent } from './Layout/FullLayout/FullLayout'
import AdminLayout from './Layout/AdminLayout/AdminLayout'
import BlockchainDocOfRegistration from './Pages/RegistrationPortal/BlockchainDocOfRegistration'
import IGRBatchVerification from './Pages/RegistrationPortal/BlockchainDocOfRegistration/IGRBatchVerification'
import IGRBatchUpload from './Pages/RegistrationPortal/BlockchainDocOfRegistration/IGRBatchUpload'
import BlockChainDocumentsOfRegis from './Pages/SubRegistrarOfficer/BlockChainDocumentsOfRegis'
import ThreeStepDocVerification from './Pages/RegistrationPortal/ThreeStepDocVerification'
import BatchId from './Pages/RegistrationPortal/BatchId/BatchId'
import BatchDocumentUploaded from './Pages/RegistrationPortal/BlockchainDocOfRegistration/BatchDocumentUploaded'
import Login from './Pages/AuthPages/Login'
import AdminLayout2 from './Layout/AdminLayout2/AdminLayout2'
import AdminLayout3 from './Layout/AdminLayout3/AdminLayout3'
import RegistrarLayout from './Layout/RegistrarLayout/RegistrarLayout'
import LoginLayout from './Layout/RegistrarLayout/LoginLayout'
import AddUser from './Pages/RegistrationPortal/AddUser/AddUser'
import User from './Pages/RegistrationPortal/User/User'
import IGRUser from './Pages/RegistrationPortal/User/IGRUser'
import MsiReport from './Pages/RegistrationPortal/msiReport/MsiReport'
import SignIn_OTP from './Pages/AuthPages/Otp'
import Forget_OTP from './Pages/AuthPages/ForgetOTP'
import ChangePass from './Pages/AuthPages/ChangePass'
import screenforDRO from './Pages/RegistrationPortal/BlockchainDocOfRegistration/screenforDRO'
import screenforDIG from './Pages/RegistrationPortal/BlockchainDocOfRegistration/screenforDIG'
import screenforSRO from './Pages/RegistrationPortal/BlockchainDocOfRegistration/screenforSRO'
import { UserProvider } from './context/UserContext'
import UserDetail from './Pages/RegistrationPortal/UserDetails/UserDetail'
import BatchVerificationById from './Pages/RegistrationPortal/verificationById/BatchVerificationById'
import Lottie from './Components/Lottie'
import IGRLayout from './Layout/RegistrarLayout/IGRLayout'
import './style/components/Igr.css'
import SignInOtp from './Pages/AuthPages/Otp'

class App extends Component {
  componentDidMount() {
    this.props.hideLoader()
  }
  render() {
    return (
      <UserProvider>
        <Router>
          <Switch>
            <RouteWithLayout
              layout={LoginLayout}
              path="/"
              exact
              component={Login}
            />
            <RouteWithLayout
              layout={LoginLayout}
              path="/verifyOTP"
              exact
              component={SignInOtp}
            />
            <RouteWithLayout
              layout={LoginLayout}
              path="/otpAuth"
              component={Forget_OTP}
            />
            <RouteWithLayout
              layout={LoginLayout}
              path="/changePassword"
              component={ChangePass}
            />
            <RouteWithLayout
              layout={AdminLayout2}
              path="/admin/misreport/batchverification/:id"
              component={BatchVerificationById}
            />

            <RouteWithLayout
              layout={RegistrarLayout}
              path="/registration-dashboard2"
              component={screenforDRO}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/registration-dashboard3"
              component={screenforDIG}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/registration-dashboard4"
              component={screenforSRO}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/igr-batch-upload/document/:id"
              component={BatchDocumentUploaded}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/igr-batch-verification"
              component={MsiReport}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/igr-batch-upload"
              component={IGRBatchUpload}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/batch-id/:id"
              component={BatchId}
            />
            <RouteWithLayout
              layout={IGRLayout}
              path="/registration-dashboard"
              component={BlockchainDocOfRegistration}
            />

            <RouteWithLayout
              layout={AdminLayout2}
              path="/IGR/first"
              component={IGRUser}
            />
            <RouteWithLayout
              layout={AdminLayout3}
              path="/superadmin/first"
              component={User}
            />
            <RouteWithLayout
              layout={AdminLayout3}
              path="/lottie"
              component={Lottie}
            />
            <RouteWithLayout
              layout={AdminLayout2}
              path="/admin/Misreport"
              component={MsiReport}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/user/Misreport"
              component={MsiReport}
            />
            <RouteWithLayout
              layout={RegistrarLayout}
              path="/3-step-document-verification"
              component={ThreeStepDocVerification}
            />
            <RouteWithLayout
              layout={AdminLayout2}
              path="/admin/adduser"
              component={AddUser}
            />
            <RouteWithLayout
              layout={AdminLayout2}
              path="/admin/user/userdetails"
              component={UserDetail}
            />
          </Switch>
        </Router>
      </UserProvider>
    )
  }
}

export default App
