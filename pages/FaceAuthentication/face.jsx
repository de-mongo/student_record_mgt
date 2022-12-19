import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormState } from 'react-hook-form';
import { useRef, useEffect } from "react";

function face(){
    const router = useRouter()
    
    const handlesubmit = useCallback((e) => {
        // e.preventDefault()
        // let data = document.querySelector('#img-data').value
        fetch('/api/hello', {
            method: 'POST',
            headers: {'Content-type': 'application/img'},
            body: {
                // "Image": data,
            },
        }).then((res)=> {
            if (res.ok) router.push('../dashboard/student')
        })
    })

const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    const getUserMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({video: true});
          videoRef.current.srcObject = stream;
          videoRef.current.play()
        } catch (err) {
          console.log(err);
        }
      };
      getUserMedia();
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      let color = colorRef.current;
        
        ctx.drawImage(video, 0, 0, width, height);
    //   let pixels = ctx.getImageData(0, 0, width, height);
    
    //   color.style.backgroundColor = `rgb(${pixels.data[0]},${pixels.data[1]},${pixels.data[2]}
    //     )`;
    //   color.style.borderColor = `rgb(${pixels.data[0]},${pixels.data[1]},${
    //     pixels.data[2]
    //   })`;
    }, 200);
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;

    const data = photo.toDataURL("image/jpeg");
    console.log("Image Data: \n", data)
    // const link = document.createElement("a");
    // link.href = data;
    // link.setAttribute("download", "myWebcam");
    // link.innerHTML = `<img id="img-data" src='${data}' alt='thumbnail'/>`;
    // strip.insertBefore(link, strip.firstChild);
  }
    return (
        <div className='grid grid-cols-2 divide-x'>
            <div className="card w-full h-screen">
                <h2 className="card-header my-2 ">Login</h2>
                <div className='card-body'>
                    <div className='formgroup my-2'>
                        <span className="block text-sm font-medium text-slate-700">Capture Face</span>
                        <div className='webcam-video'>
                        <button onClick={() => takePhoto()}>Take a photo</button>
                            <video
                            onCanPlay={() => paintToCanvas()}
                            ref={videoRef} 
                            controls={false} className="player" autoPlay muted loop
                            />
                             <canvas ref={photoRef} className="photo h-0 w-0" />
                            <div className="photo-booth">
                            <div ref={stripRef} className="strip" />
                            </div>
                        </div>
                    </div>
                    <button onClick={() => router.back()} className='bg-butCol rounded-md w-25'>
                     Back
                    </button>
                    <button type="Submit" disabled={useFormState.isSubmitting} onClick={handlesubmit()} className='bg-butCol rounded-md w-25'>
                    {useFormState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                     Login
                    </button>
                </div>
            </div>
            <div className="bg-comp2 w-full h-screen">
            Design
            </div>
        </div>
    )
} 

export default face