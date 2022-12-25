import Nav from "../../../../components/Nav";
import Head from "next/head";
import SideNav from "../../../../components/SideNav";
import axios from 'axios';
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function NewCourse() {
    let active = "Users"

    let links = [
        {name: "Users", icon: "assignment_ind", link: "/dashboard/admin"},
        {name: "Courses", icon: "book", link: "/dashboard/admin/courses"},
        {name: "Dept", icon: "corporate_fare", link: "/dashboard/admin/courses"},
    ]

    const router = useRouter();

    const [name, setName] = useState("");

    // const [deptname, setDeptname] = useState("");
    // const [deptList, ssetDeptList] = useState();
    const [instrChoice, setInstrChoice] = useState();
    const [deptChoice, setDeptChoice] = useState();

    const [itemList, setItemList] = useState([
        {course: "", sem: ""},
        // {course: "I.M.Tech", sem: 7},
        // {course: "M.Tech", sem: 3},
    ]);

    async function getUserDetails() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/users/me`, {withCredentials: true})
        if (res.status == 200) {
            setInstrChoice(res.data._id)
            setDeptChoice(res.data.dept_id._id)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, []) 

    // async function handleDeptSubmit(e) {
    //     e.preventDefault();
    //     let res = await axios.get(
    //         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/dept/search?name=${deptname}`, 
    //         {withCredentials: true}
    //     )
    //     setDeptList(res.data)
    // }

    function addNewTaken() {
        setItemList([{course: "", sem: ""}, ...itemList])
    }

    function deleteTakenItem(index) {
        let temp = [...itemList]
        temp.splice(index,1)
        setItemList(temp)
    }

    function changeTakenItem(e, index, type) {
        let temp = [...itemList]
        if (type == "sem") {
            temp[index][type] = parseInt(e.target.value)
        } else {
            temp[index][type] = e.target.value
        }
        setItemList(temp)
    }

    async function submitCourseDetails() {
        let body = {
            deptid: deptChoice,
            instrid: instrChoice,
            name: name,
            taken_by: itemList,
        }
        console.log(body)
        let res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/courses/new`, 
            body,
            {withCredentials: true}
        )

        if (res.status == 201) router.push("/dashboard/faculty")
    }

    return (
        <>
            <div className="fixed">
                <Nav />
            </div>
            <div className="fixed">
                <SideNav active={active} links={links}/>
            </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <div className="py-4">
                    <div>Course Name</div>
                    <input type="text" name="instr" 
                        className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                        placeholder="Course name" 
                        onChange={(e) => {setName(e.target.value)}} 
                        value={name}
                    />
                </div>
                {/* <hr className="py-2" />
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
                </div> */}
                <hr className="py-2" />
                <div>
                    <div className="text-lg font-medium font-['Poppins'] py-4 scroll-auto">TakenBy List</div>
                    <button className="bg-blue-600 rounded-full text-white py-2 px-4" onClick={addNewTaken}>Add</button>
                    <div>
                        {itemList.map((item, index) => (
                            <div key={index} className="py-2 flex gap-4 group items-center">
                                <input type="text" 
                                className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                                placeholder="Degree Name"
                                onChange={(e) => changeTakenItem(e, index, "course")}
                                value={item.course}
                                />

                                <input type="number" 
                                className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                                placeholder="Semester"
                                onChange={(e) => changeTakenItem(e, index, "sem")}
                                value={item.sem}
                                />

                                <button className="hidden group-hover:flex" onClick={() => deleteTakenItem(index)}><span className="material-symbols-rounded text-red-400">cancel</span></button>
                            </div>
                        ))} 
                    </div>
                </div>
                <button className="bg-blue-600 rounded-full text-white py-2 px-4 mt-4 w-full" onClick={submitCourseDetails}>Create course</button>
            </div>
        </>
    )
}