import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormState } from 'react-hook-form';
import { useCookies } from "react-cookie"

import axios from 'axios';


function login() {
    const router = useRouter()
    const [cookie, setCookie] = useCookies(["jwt"])
    // function handleChechbox(e) {}
    const handlesubmit = useCallback(async (e) => {
        e.preventDefault()
        const userid = document.querySelector('#userid').value
        const password = document.querySelector('#password').value
        console.log(process.env.PORT)

        let res = await axios.post(`http://localhost:4000/api/v1/auth/login`, {
            email: userid,
            password: password,
        }, {withCredentials: true})

        console.log(res)
        if (res.statusText === "OK") router.push('./FaceAuthentication/face')
        // setCookie("jwt", res.data.jwt, )

        // fetch(`http://localhost:4000/api/v1/auth/login`, {
        //     method: 'POST',
        //     headers: {'Content-type': 'application/json'},
        //     credentials: true,
        //     body: JSON.stringify({
        //         "email": userid,
        //         "password": password
        //     }, ),
        // }).then((res)=> {
        //     // setCookie("jwt", JSON.stringify)
        //     console.log(res)
        //     // if (res.ok) router.push('./FaceAuthentication/face')
        // })
    })
    
    return(
        <div className='flex'>
            <div className='flex-auto w-2/4 h-screen mx-10'>
                <div className="card w-full h-screen mt-20 mx-17">
                    <div className="card-header my-6 ">
                        <h1 className='text-4xl my-4'>Log In</h1>
                        <h4 className='text-xl mb-6'>Enter your credentials to access your information</h4>
                    </div>
                    <div className='card-body'>
                        <form  onSubmit={handlesubmit} >
                        <div className='formgroup my-3'>
                            <span className="block text-base text-slate-700 my-2">UserId</span>
                            <input type="text" id="userid" className='form-input box-content h-1 w-25 p-3 border-2 rounded-md' required/>
                        </div>
                        <div className='formgroup my-3'>
                            <span className="block text-base text-slate-700">Password</span>
                            <input type="password" id="password" className="form-input box-content h-1 w-25 p-3 border-2 rounded-md" minLength="6" maxLength="20" required/>
                        </div>
                        <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                      id="rememberPassword" name="checkbox" checked={null}
                      onChange={(event) => handleChechbox(event)} />
                    <label className="form-check-label" htmlFor="rememberPassword">
                      Remember me
                    </label>
                  </div>
                        <button type="Submit" disabled={useFormState.isSubmitting} className='bg-butCol rounded-md w-25 border-solid border-b p-2 my-3'>
                        {useFormState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Authenticate Face
                        </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='flex-auto bg-comp2 w-2/4 h-screen '>
                Design
            </div>
        </div>
        
        
        
    )   
}

export default login
