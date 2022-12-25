import { useState } from "react";
import Modal from "./Modal";

export default function UserDetails({data, setData, updateData, setUpdateData, updateUser}) {

    const [displayEdit, setDisplayEdit] = useState(false);
    return (
        <>
            <div className="fixed"> 
                <Modal display={displayEdit} setDisplay={setDisplayEdit} >
                    {updateData && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" name="fname" 
                                className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                                placeholder="First name" 
                                onChange={(e) => {let first_name = e.target.value; setUpdateData({...updateData, first_name})}}
                                value={updateData.first_name} 
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" name="lname" 
                                className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                                placeholder="Last name" 
                                onChange={(e) => {let last_name = e.target.value; setUpdateData({...updateData, last_name})}}
                                value={updateData.last_name} 
                            />
                        </div>
                        <div className="flex flex-col gap-3 col-span-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" 
                                className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                                placeholder="Email" 
                                onChange={(e) => {let email = e.target.value; setUpdateData({...updateData, email})}}
                                value={updateData.email} 
                            />
                        </div>
                        <div className="flex flex-col gap-3 col-span-2">
                            <label htmlFor="sa">Street Address</label>
                            <textarea type="text" name="sa" 
                                className="border-[1px] border-matty-300/80 rounded-full px-6 py-2" 
                                placeholder="Street Address" 
                                onChange={(e) => {let street_address = e.target.value; setUpdateData({...updateData, street_address})}}
                                value={updateData.street_address} 
                            />
                        </div>
                        <button 
                            className="col-span-2 mt-4 py-2 w-full bg-blue-600 text-white rounded-full"
                            onClick={updateUser}
                        >
                            Update User
                        </button>
                    </div>)}
                </Modal>
            </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <div className="flex items-center gap-4 ">
                    <button className="flex items-center" onClick={() => setDisplayEdit(true)}><span className="material-symbols-rounded">edit</span>edit</button>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-8">
                    {data && (
                        <>
                            <div className="mr-4">name</div> <div>{data.name || `${data.first_name} ${data.last_name}`}</div>
                            <div>email</div> <div>{data.email}</div>
                            <div>role</div> <div>{data.role}</div>
                            <div>Address</div> <div>{data.street_address}</div>
                            <div>Date Of Birth</div> <div>{data.date_of_birth}</div>
                            <div>Department</div> <div>{data.dept_id.name}</div>
                            {(data.role !== "faculty" && 
                            <>
                            <div>Registration No</div> <div>{data.reg_no}</div>
                            <div>Degree</div> <div>{data.degree}</div>
                            <div>Semester</div> <div>{data.sem}</div>
                            </>)}
                        </>
                    )}
                </div>

            </div>
        </>

    )
}