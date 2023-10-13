// TODO : ADD BG
import './LoginPageCSS.css';

import BasicButton from "../components/BasicButton"
import landingLogo from "../assets/appLogo.png"
import InputTextField from '../components/InputTextField';
import PasswordField from '../components/PasswordField';


function LoginPage() {        

    return (
      <>
        <div className='loginPageRoot'>
            <div className='loginLeft'>
                <div className='loginLogoWrapper'><img src={landingLogo} alt="Description of the image"/></div>
            </div>
            <div className='loginRight'>
                <div></div>                
                <h1>LOG IN TO YOUR ACCOUNT</h1>
                <div className='loginForm'>
                    <h2>Emain or Username</h2>
                    <InputTextField inputLabel = 'Enter your email or username' fieldName = 'emailusername'/>
                    <div></div>
                    <h2 className='passwordTitle'>পাসওয়ার্ড</h2>
                    <PasswordField inputLabel = 'Enter your password' fieldName = 'password'/>                    
                </div>                
                <BasicButton  buttonText = 'LOG IN' onClick = {() => {}} routePath = "/home" /> 
                <div>Forgot password? <b>Click here</b></div>
            </div>
        </div>        
      </>
    )
  }

  export default LoginPage