import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useFormState } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";

function register() {
    const router = useRouter()

    const handlesubmit = useCallback((e) => {
        e.preventDefault()
        const fname = document.querySelector('#fName').value
        const lname = document.querySelector('#lName').value
        const password = document.querySelector('#password').value
        const regNo = document.querySelector('#regNo').value
        const Course = document.querySelector('#course').value
        const emailId = document.querySelector('#emailId').value
        const dateOfBirth = document.querySelector('#dateOfBirth').value
        const semester = document.querySelector('#semester').value
        const address = document.querySelector('#address').value


        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                "fname": fname,
                "lname": lname,
                "password": password,
                "regNo": regNo,
                "Course": Course,
                "emailId": emailId,
                "dateOfBirth": dateOfBirth,
                "semester": semester,
                "address": address
            }),
        }).then((res) => {
            if (res.ok) console.log("Register done")
        })
    })
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className='h-screen flex flex-col item-center justify-start'>
            <div className="flex-col w-full mx-60 card mt-5">
                <div className="card-header my-2 ">
                    <h1 className='text-4xl'>Registration</h1>
                    <h4 className='text-xl mb-6'>Enter required information</h4>
                </div>
                <div className='card-body flex flex-col'>
                    <form onSubmit={handlesubmit} >
                        <div className='formgroup flex flex-col'>
                            <div>
                                <input type="text" id="fName" className='form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 mr-6 border-2 rounded-md' placeholder="First Name" required />
                                <input type="text" id="lName" className='form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 my-3 rounded-md' placeholder="Last Name" required/>

                            </div>
                            <div>
                                <input type="text" id="regNo" className="form-input uppercase box-content h-1 w-1/5 p-3 mr-6 placeholder-gray-800 placeholder-opacity-75 border-2  rounded-md" placeholder='Registration No.' maxLength="9" required />
                                <input type="text" id="course" className="form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 my-3 rounded-md" placeholder='Course' required />
                            </div>
                        </div>
                        <div className='formgroup flex flex-col'>
                            <input type="email" id="emailId" className='form-input box-content h-1 w-1/3 p-3 placeholder-gray-800 placeholder-opacity-75 border-2 rounded-md my-3' placeholder='Email Id' required />
                            <span className="block text-sm font-medium text-slate-700">Date of Birth</span>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} type="text" id="dateOfBirth" className="form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 rounded-md " required />
                            <input type="text" id="semester" className='form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 my-3 rounded-md' placeholder="Semester" required/>


                        </div>
                        <div className='formgroup my-3 flex flex-col'>
                            <input type="password" id="password" className="form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/3 p-3 border-2 my-3  rounded-md" minLength="6" maxLength="20" placeholder='Password' required />
                            <textarea id="address" rows="3" className="form-input box-content placeholder-gray-800 placeholder-opacity-75 w-1/3 p-3 border-2 my-3 rounded-md" placeholder='Address' required />

                            {/* <input type="password" id="password" className="form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 my-3 rounded-md" minLength="6" maxLength="20" placeholder='CGPA' required /> */}

                        </div>




                        <button type="Submit" disabled={useFormState.isSubmitting} className='rounded-md bg-grey-600 w-1/3 border-solid border-b p-1 my-3 mx-20'>
                            {useFormState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default register
