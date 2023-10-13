// TODO : ADD BG
import './LandingPageCSS.css';

import BasicButton from "../components/BasicButton"
import landingLogo from "../assets/appLogo.png"


function LandingPage() {        

    return (
      <>
        <div className='mainContainerLandingPage'>
          <div className='paddingUpLanding'></div>
        <div>
        <img src={landingLogo} alt="Description of the image" className='LandingLogo'/>  
        </div>        
        <h1>LANDING PAGE TITLE HERE</h1>
        <div className="landingPageButtonContainer">
            <BasicButton  buttonText = 'LOG IN' onClick = {() => {}} routePath = "/login" />
            <BasicButton  buttonText = 'REGISTER' onClick = {() => {}} routePath = "/signup" />    
        </div>
        </div>        
      </>
    )
  }

  export default LandingPage