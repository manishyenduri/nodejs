import React, { Component } from "react";
import ClientCaptcha from "react-client-captcha"
// import "bootstrap/dist/css/bootstrap.min.css";

// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha
// } from "react-simple-captcha";

class CaptchaTest extends Component {
  state = {
    captchaCode: ''
  }

  setCode = captchaCode => {
    this.setState({ captchaCode });
    this.props.getCaptchaValue(captchaCode);
  }

  render(){
    //const { captchaCode } = this.state;
    return (
      <div className="App">
        <ClientCaptcha captchaCode={this.setCode} charsCount={5} width={200} height={38}/>
        {/* <div className="text">Current Captcha Code: <strong>{captchaCode}</strong></div> */}
      </div>
    );
  }
}

export default CaptchaTest;
