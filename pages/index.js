import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormState } from 'react-hook-form';


function Login() {
    const router = useRouter()

    const handlesubmit = useCallback((e) => {
        e.preventDefault()
        const userid = document.querySelector('#userid').value
        const password = document.querySelector('#password').value
        fetch('/api/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "userId": userid,
                "password": password
            }),
        }).then((res)=> {
            if (res.ok) router.push('./FaceAuthentication/face')
        })
    })
    
    return(
        <div className='grid grid-cols-2 divide-x'>
            <div className="card w-full h-screen">
                <h2 className="card-header my-2 ">Login</h2>
                <div className='card-body'>
                    <form  onSubmit={handlesubmit} >
                    <div className='formgroup my-2'>
                        <span className="block text-sm font-medium text-slate-700">UserId</span>
                        <input type="text" id="userid" className='form-input box-content h-1 w-25 p-3 border-2 rounded-md' required/>
                    </div>
                    <div className='formgroup my-2'>
                        <span className="block text-sm font-medium text-slate-700">Password</span>
                        <input type="password" id="password" className="form-input box-content h-1 w-25 p-3 border-2 rounded-md" minLength="6" maxLength="20" required/>
                    </div>
                    <button type="Submit" disabled={useFormState.isSubmitting} className='bg-butCol rounded-md w-25'>
                    {useFormState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Authenticate Face
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

export default Login
