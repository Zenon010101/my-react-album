import picture from './assets/anastasia.png';
import { useRef } from 'react';
import hoverAnimation from './assets/foxidna.mp4';
function Card() {

    const videoRef = useRef(null);


    return (
        <div className="card"
        onMouseEnter={() => videoRef.current.play()}
        onMouseLeave={() => {
            videoRef.current.pause();
            if(videoRef.current) videoRef.current.currentTime = 0;
        }}
        style={{ position: 'relative', cursor: 'pointer' }}
        >

            <img className="card-image" src={picture} alt="Anastasia"/>
            <video ref={videoRef}
            src={hoverAnimation}
            className="hover-video"
            loop
            playsInline
            />

            <h3 className="card-title">I DON'T WANNA DIE</h3>
            <p className="card-text">feat. Subaru</p>
        </div>
    );
}
export default Card