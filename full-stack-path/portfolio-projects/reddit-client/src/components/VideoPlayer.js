import React, {useEffect, useRef} from 'react'
import * as dashjs from 'dashjs';

const VideoPlayer = ({mpdUrl}) => {
    const videoRef = useRef(null)
    useEffect(() => {
        if(videoRef.current) {
            const player = dashjs.MediaPlayer().create(); 
            player.initialize(videoRef.current, mpdUrl, true)

            return () => {
                player.reset();
            }
        }
       
    }, [mpdUrl])

    return (
        <video ref={videoRef} muted loop style={{height: '435px', width: '715px', backgroundColor: '#4f4f4f', borderRadius: '20px', objectFit: 'contain'}}></video>
        // <figure style={{width: '715px', backgroundColor: '#4f4f4f'}}>
        //     <video ref={videoRef} muted autoPlay style={{height: '435px'}}></video>
        // </figure>
    )
}

export default VideoPlayer