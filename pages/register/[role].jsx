import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useFormState } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Head from 'next/head';
// import faculty from '../dashboard/faculty';

export default function Register() {
    const router = useRouter()

    const {role} = router.query;
    const [startDate, setStartDate] = useState(new Date());
    const [deptname, setDeptname] = useState("");
    const [deptList, setDeptList] = useState();
    const [deptChoice, setDeptChoice] = useState();

    const handlesubmit = useCallback(async (e) => {
        e.preventDefault()
        let Course, semester;
        const fname = document.querySelector('#fName').value
        const lname = document.querySelector('#lName').value
        const password = document.querySelector('#password').value
        const regNo = document.querySelector('#regNo').value
        const emailId = document.querySelector('#emailId').value
        const dateOfBirth = document.querySelector('#dateOfBirth').value
        const address = document.querySelector('#address').value
        if (role !== "faculty") {
            Course = document.querySelector('#course').value
            semester = document.querySelector('#semester').value
        }

        let post = {
            "email": emailId,
            "password": password,
            "role": role,
            "reg_no": regNo,
            "first_name": fname,
            "last_name": lname,
            "street_address": address,
            "date_of_birth": dateOfBirth,
            "degree": Course,
            "sem": semester,
            "dept_id": deptChoice,
        }

        if (role === "faculty") {
            post.degree = "PhD";
            post.sem = 0;
        }

        console.log(post)

        let res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/admin/user/new`, 
            post, 
            {withCredentials: true}
        )
        console.log(res)

        if (res.status == 201) {router.push("/dashboard/admin/")}

    })

    async function handleDeptSubmit(e) {
        e.preventDefault();
        let res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/dept/search?name=${deptname}`, 
            {withCredentials: true}
        )
        setDeptList(res.data)
    }
    return (
        <div className='h-screen flex flex-col item-center justify-start'>
            <Head> 
                <title>Create new {role} user </title> 
            </Head>
            <div className="flex-col w-full mx-60 card mt-5">
                <div className="card-header my-2 ">
                    <h1 className='text-4xl'>Registration</h1>
                    <h4 className='text-xl mb-6'>Enter required information</h4>
                </div>
                <div className='card-body flex flex-col'>
                    <div>
                        <form onSubmit={handleDeptSubmit}>
                            <div className="flex items-center gap-4">
                                <label htmlFor="instr">Department Name</label>
                                <input type="text" name="dept" 
                                    className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                                    placeholder="Department name" 
                                    onChange={(e) => {setDeptname(e.target.value)}} 
                                    value={deptname}
                                />
                                <button className="bg-blue-600 rounded-full text-white py-2 px-4">Search</button>
                            </div>
                        </form>
                        <div className="pt-0">
                            <div className="text-lg font-medium font-['Poppins'] py-4 scroll-auto">Deptartment List</div>
                            {deptList && deptList.docs.map(doc => (
                                <div key={doc._id} onClick={() => setDeptChoice(doc._id)} 
                                    className={(deptChoice == doc._id ? `bg-blue-100 text-blue-900 p-2 rounded-xl cursor-pointer` : `p-2 cursor-pointer`)}
                                >
                                    <span>{doc.name || doc.dept_name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handlesubmit} >
                        <div className='formgroup flex flex-col'>
                            <div>
                                <input type="text" id="fName" className='form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 mr-6 border-2 rounded-md' placeholder="First Name" required />
                                <input type="text" id="lName" className='form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 my-3 rounded-md' placeholder="Last Name" required/>

                            </div>
                            <div>
                                <input type="text" id="regNo" className="form-input uppercase box-content h-1 w-1/5 p-3 mr-6 placeholder-gray-800 placeholder-opacity-75 border-2  rounded-md" placeholder='Registration No.' maxLength="9" required />
                                {
                                    role !== "faculty" && 
                                    <input type="text" id="course" className="form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 my-3 rounded-md" placeholder='Course' required />
                                }
                            </div>
                        </div>
                        <div className='formgroup flex flex-col'>
                            <input type="email" id="emailId" className='form-input box-content h-1 w-1/3 p-3 placeholder-gray-800 placeholder-opacity-75 border-2 rounded-md my-3' placeholder='Email Id' required />
                            <span className="block text-sm font-medium text-slate-700">Date of Birth</span>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} type="text" id="dateOfBirth" className="form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 rounded-md " required />

                            {
                                role !== "faculty" && 
                                <input type="text" id="semester" className='form-input box-content placeholder-gray-800 placeholder-opacity-75 h-1 w-1/5 p-3 border-2 my-3 rounded-md' placeholder="Semester" required/>
                            }
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
