import React, {Component} from 'react';
import lottie from "lottie-web"


const Lottie = (props) => {
    let animationContainer = React.createRef();

    React.useEffect(() => {
        
        lottie.loadAnimation({
            container: animationContainer.current , // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets9.lottiefiles.com/datafiles/gUENLc1262ccKIO/data.json' // the path to the animation json
          });

    },[]);
 
        return (
            <div>
                <div className="animation-container" ref={animationContainer} style={{width:'300px',height:'300px',backgroundColor:'grey'}} />
            </div>
        )
}

export default Lottie;