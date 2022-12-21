import Router, { useRouter } from 'next/router'
import { useState } from 'react'

function Start() {
    const router = useRouter()

    const userType = [
        {name: "Admin", code:1},
        {name: "Faculty", code:2},
        {name: "Student", code:3},
        {name: "Office Staff", code:4}
    ]
    const login = () =>{
        router.push('./register/register')
    }
    return(
        <div className='flex'>
            <div className='flex-auto w-2/4 h-screen mx-10'>
                <div className='my-10'>
                    <h1 className='text-4xl'>Log In</h1>
                    <h4 className='text-xl mb-6'>Choose your role type</h4>
                </div>
                <div className='my-0 text-xl'>
                {userType.map((users) => (
                    <button onClick={login} className='bg-silver mx-10 my-5 py-20 w-1/3 h-20 border-2 border-black'>{users.name}</button>
                ))}
                </div>
            </div>    

            <div className="flex-auto bg-comp2 w-2/4 h-screen">
                <div className='bg-purple'>
                    {/* <div className='border-black'>
                        <img src="../styles/circle_FILL0_wght400_GRAD0_opsz48.svg"></img>
                    </div> */}
                    {/* <div >
                        <img className='bg-purple' src="../styles/circle_white_24dp.svg"></img>
                    </div>
                    <div className="triangle border-r-black"></div>
                    <div className="triangle border-l-black"></div> */}
                </div>
            </div>
        </div>
        
        
        
    )   
}

export default Start
