// TODO : ADD BG
import './LoginPageCSS.css';

import BasicButton from "../components/BasicButton"
import landingLogo from "../assets/appLogo.png"
import InputTextField from '../components/InputTextField';
import PasswordField from '../components/PasswordField';


function SignUpPage() {        

    return (
      <>
        <div className='loginPageRoot'>
            <div className='loginLeft'>
                <div className='loginLogoWrapper'><img src={landingLogo} alt="Description of the image"/></div>
            </div>
            <div className='loginRight'>
                <div></div> <div></div> <div></div>                    
                <h1>ENTER YOUR INFORMATION</h1>
                <div></div>
                <div className='signupForm'>                    
                    <div className='signupLabel'>
                        <h3>USERNAME : &nbsp;&nbsp;&nbsp; </h3>
                        <InputTextField inputLabel = 'Enter your username' fieldName = 'username'/>
                    </div>
                    <div className='signupLabel'>
                        <h3>CONTACT : &nbsp;&nbsp;&nbsp; </h3>
                        <InputTextField inputLabel = 'Enter your phone number' fieldName = 'username'/>
                    </div>
                    <div className='signupLabel'>
                        <h3>EMAIL : &nbsp;&nbsp;&nbsp; </h3>
                        <InputTextField inputLabel = 'Enter your email' fieldName = 'username'/>
                    </div>
                    <div className='signupLabel'>
                        <h3>PASSWORD : &nbsp;&nbsp;&nbsp; </h3>
                        <PasswordField inputLabel = 'Enter your password' fieldName = 'username'/>
                    </div>
                    <div className='signupLabel'>
                        <h3>CONFIRM PASSWORD : &nbsp;&nbsp;&nbsp; </h3>
                        <PasswordField inputLabel = 'Confirm your password' fieldName = 'username'/>
                    </div>
                </div>      
                <div></div>          
                <BasicButton  buttonText = 'REGISTER' onClick = {() => {}} routePath = "/home" /> 
                <div></div>
            </div>
        </div>        
      </>
    )
  }

  export default SignUpPage