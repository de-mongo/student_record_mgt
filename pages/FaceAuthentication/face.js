import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormState } from 'react-hook-form';
import { useRef, useState, useEffect } from "react";

function face(){
    const router = useRouter()
    
    const handlesubmit = useCallback((e) =>{

    })

    const videoRef = useRef(null)

    useEffect(() => {
        getVideo()
    }, [videoRef])

    const getVideo = () => {
        
        navigator.mediaDevices.getUserMedia({video: {width: 300}})
        .then(stream => {
            let video = videoRef.current
            video.srcObject = stream
            video.play()
        })
        .catch(err => {
            console.error("error: ", err)
        })
    }

    const paintToCanvas = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");
    
        const width = 320;
        const height = 240;
        photo.width = width;
        photo.height = height;
    
        return setInterval(() => {
          ctx.drawImage(video, 0, 0, width, height);
        }, 200);
      };

      const stop = (e) => {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
      
        for (let i = 0; i < tracks.length; i++) {
          let track = tracks[i];
          track.stop();
        }
      
        video.srcObject = null;
      }

      const takePhoto = () => {
        let photo = photoRef.current;
        let strip = stripRef.current;
        const data = photo.toDataURL("image/jpeg");
        const link = document.createElement("div");
        link.href = data;
        console.log("check-1: ", data)
        link.setAttribute("download", "myWebcam");
        link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
        strip.insertBefore(link, strip.firstChild);
      };
    return (
        <div className='grid grid-cols-2 divide-x'>
            <div className="card w-full h-screen">
                <h2 className="card-header my-2 ">Login</h2>
                <div className='card-body'>
                    <form  onSubmit={handlesubmit} >
                    <div className='formgroup my-2'>
                        <span className="block text-sm font-medium text-slate-700">Capture Face</span>
                        <input type="text" id="userid" className='form-input box-content h-1 w-25 p-3 border-2 rounded-md' />
                        <button onClick={() => takePhoto()}>Take Photo</button>
                        <video ref={videoRef} />
                        <canvas />
                    </div>
                    <button onClick={() => router.back()} className='bg-butCol rounded-md w-25'>
                     Back
                    </button>
                    <button type="Submit" disabled={useFormState.isSubmitting} className='bg-butCol rounded-md w-25'>
                    {useFormState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                     Login
                    </button>
                    </form>
                </div>
            </div>
            <div className="bg-comp2 w-full h-screen">
            Design
            </div>
        </div>
    )
}

export default face