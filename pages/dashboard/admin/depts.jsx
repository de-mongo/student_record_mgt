import Nav from "../../../components/Nav";
import Modal from "../../../components/Modal";
import Head from "next/head";
import SideNav from "../../../components/SideNav";
import TotalUsers from "../../../components/TotalUsers";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Users() {
    const name = "Stuart Richards";
    let active = "Dept"
    let links = [
        {name: "Users", icon: "assignment_ind", link: "/dashboard/admin"},
        {name: "Courses", icon: "book", link: "/dashboard/admin/courses"},
        {name: "Dept", icon: "corporate_fare", link: "/dashboard/admin/depts"},
    ]

    const [page, setPage] = useState(1);
    const [role, setRole] = useState("student");
    const [data, setData] = useState({});

    async function fetchUsers() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/dept/listall?page=${page}`, {withCredentials: true})

        setData(res.data)
        console.log(res.data)
    }

    function prev() {
        if (data.hasPrevPage) {
            setPage(page-1)
            console.log(data)
        }
    }

    function next() {
        if (data.hasNextPage) {
            setPage(page+1)
            console.log(data)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    const [display, setDisplay] = useState(false);
    const [displayDel, setDisplayDel] = useState(false);
    const [deptName, setDeptName] = useState("");
    const [delId, setDelId] = useState("");

    async function createDepartment() {
        let res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/dept/createDept`,
            {name: deptName},
            {withCredentials: true}
        )

        console.log(deptName)
        console.log(res)

        if (res.status == 201) {
            setDeptName("")
            setDisplay(false)
            fetchUsers()
        }
    }

    async function deleteDept() {
        let res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/dept/${delId._id}`,
            {withCredentials: true}
        )

        if (res.status == 201) {
            setDelId({})
            setDisplayDel(false)
            fetchUsers()
        }
    }

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="fixed"> <SideNav links={links} active={active} /> </div>
            <div className="fixed"> <Nav/> </div>
            <div className="fixed"> 
                <Modal display={display} setDisplay={setDisplay} >
                    <div className="flex flex-col items-center gap-3">
                            <label htmlFor="dept">Department Name</label>
                            <input type="text" name="dept" 
                                className="border-[1px] border-matty-300/80 rounded-full px-4 py-2" 
                                placeholder="Department name" 
                                onChange={(e) => {setDeptName(e.target.value)}} 
                                value={deptName}
                            />
                            <button onClick={createDepartment} className="bg-blue-600 rounded-full text-white py-2 px-4">
                                Create Department
                            </button>
                    </div>
                </Modal>
                <Modal display={displayDel} setDisplay={setDisplayDel} >
                    <div className="flex flex-col items-center gap-3">
                        <div>
                            Do you want to Delete {delId.name} Dept record
                        </div>
                        <div className="flex gap-4">
                            <button className="py-2 px-4">Cancel</button>
                            <button className="py-2 px-4 rounded-full bg-red-600 text-white" onClick={deleteDept}>
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Good morning, {name}</h1>
                <div className="grid grid-cols-3">
                    <button onClick={() => setDisplay(true)} className="gap-2 flex items-center justify-center px-4 py-2 col-span-2 rounded-full bg-blue-600 text-matty-50">
                        <span className="material-symbols-rounded">add</span>
                        Add New Department
                    </button>
                    <div className="col-span-2">
                        <div className="grid grid-cols-5 text-sm py-4 text-matty-600">
                            <div className="col-span-4">Name</div>
                        </div>
                    {data.docs && data.docs.map((doc, index) => (
                        <button key={doc._id} className="grid grid-cols-5 py-3 group w-full group">
                            <span className="flex col-span-4 gap-3 items-center">
                                {doc.name || doc.first_name + " " + doc.last_name}
                            </span>
                            <span className="material-symbols-rounded hidden group-hover:flex text-red-500 cursor-pointer" onClick={() => {setDelId(doc); setDisplayDel(true)}} >delete</span>
                        </button>
                    ))}
                    </div>

                    <div>
                        <TotalUsers />
                    </div>
                </div>
            </div>
        </>
    )
}