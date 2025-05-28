 import './css/Landing.css'
 import OutlineButton from './OutlineButton';
 import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div className='landing-container'>
                <section className="landing-circle-section">
            <div className="circle circle-left"></div>

            <div className="circle-wrapper">
                <div className="dotted-outline"></div>
                <div className="circle circle-center"></div>
            </div>

            <div className="circle circle-right"></div>
            </section>

            <div className="circle-overlay-content">
                <div className='landing-welcome'>
                        <h1>Welcome to </h1>
                        <h2>Hit Me Up</h2>
                 </div>

                 <div className='landingPair landing-1'>
                    <h1>Anonymous,<br/> Always.</h1>
                    <p>We ghost people.. professionally</p>
                 </div>

                   <div className='landingPair landing-2'>
                    <h1>No Witness.<br/>No Worries.</h1>
                    <p>We bring closure</p>
                 </div>

                   <div className='landingPair landing-3'>
                    <h1>Percision <br/> Targeting.</h1>
                    <p>We don't miss. Ever.</p>
                 </div>

                 
                <div className='landing-button-container'>
                  <Link to="/shop" className="landing-button-component btn-primary">
  Meet the man
</Link>
                </div>
               
                       
             </div>
             
        </div>
    );
}

export default Landing;