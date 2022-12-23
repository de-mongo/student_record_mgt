import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormState } from 'react-hook-form';
import { useState, useRef, useEffect } from "react";

export default function Face(){
    const router = useRouter()
      // let navigate = useNavigate();

    const {role} = router.query;

    const handlesubmit = useCallback((e) => {
        // e.preventDefault()
        // let data = document.querySelector('#img-data').value
        fetch('http://localhost:3000/api/hello/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-type': 'application/img'},
            body: {
                "Image": data,
            },
        }).then((res)=> {
            if (res.ok){
              console.log("image-done");
             router.push(`../dashboard/${role}`) // navigate("../dashboard/student"); 
            }
        })
    })

  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const colorRef = useRef(null);
  // const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    const setMediaStream = useState(null);
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        if(videoRef.current){
          videoRef.current.srcObject = stream;
          videoRef.current.play()
        }
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
    }, 20990);
  };
  var data;
  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;

    data = photo.toDataURL("/image/jpeg");
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
                        <span className="block text-sm font-medium text-slate-700">Capture Face</span>
                        <div className='webcam-video'>
                        <button onClick={() => takePhoto()}>Take a photo</button>
                            <video
                            onCanPlay={() => paintToCanvas()}
                            ref={videoRef} 
                            controls={false} className="player" autoPlay muted
                            />
                             <canvas id='img-data' ref={photoRef} className="photo h-0 w-0" />
                            {/* <div className="photo-booth">
                            <div ref={stripRef} className="strip" />
                            </div> */}
                        </div>
                    <button className='bg-butCol rounded-md w-25'>
                     Back
                    </button>
                    <button onClick={handlesubmit()} className='bg-butCol rounded-md w-25'>
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