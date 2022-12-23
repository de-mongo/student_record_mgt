import Nav from "../../../components/Nav";
import Image from "next/image";
import Head from "next/head";
import SideNav from "../../../components/SideNav";
import TotalUsers from "../../../components/TotalUsers";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Users() {
    const name = "Stuart Richards";
    let active = "Users"
    let links = [
        {name: "Users", icon: "assignment_ind", link: "/dashboard/admin"},
        {name: "Courses", icon: "book", link: "/dashboard/admin/courses"}
    ]

    const [page, setPage] = useState(1);
    const [role, setRole] = useState("student");
    const [data, setData] = useState({});

    async function fetchUsers() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/admin/users?page=${page}&role=${role}`, {withCredentials: true})

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
    }, [page, role])

    async function handleRadio(e) {
        setRole(e.target.value)
        // await fetchUsers()
    }
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="fixed"> <SideNav links={links} active={active} /> </div>
            <div className="fixed"> <Nav/> </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Good morning, {name}</h1>
                <div className="flex gap-4 py-4">
                    <label htmlFor="student" className="flex gap-1 items-center">
                        <input onChange={handleRadio} checked={role == "student"} type="radio" name="role" value="student" id="student" /> 
                        <span> Student </span>
                    </label>
                    <label htmlFor="faculty" className="flex gap-1 items-center">
                        <input onChange={handleRadio} checked={role == "faculty"} type="radio" name="role" value="faculty" id="faculty" />
                        <span> Faculty </span>
                    </label>
                </div>
                <div className="grid grid-cols-3">
                    <Link href={`/register/${role}`} className="gap-2 flex items-center justify-center px-4 py-2 col-span-2 rounded-full bg-blue-600 text-matty-50">
                        <span className="material-symbols-rounded">add</span>
                        Add New User
                    </Link>
                    {
                        role === "student" ?
                        (
                            <div className="col-span-2">
                                <div className="grid grid-cols-5 text-sm py-4 text-matty-600">
                                    <div className="col-span-3">Name</div>
                                    <div className="">Semester</div>
                                    <div className="">Course</div>
                                </div>
                            {data.docs && data.docs.map((doc, index) => (
                                <Link href={`/dashboard/admin/user/${doc._id}`} key={doc._id} className="grid grid-cols-5 py-3 group">
                                    <div className="flex col-span-3 gap-3 items-center">
                                        {/* <Image src={list.profile_url} width={24} height={24} alt={list.name}/> */}
                                        {doc.name || doc.first_name + " " + doc.last_name}
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        {doc.sem}
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        {doc.degree}
                                        {/* <div className="hidden group-hover:flex items-center">
                                            <button className="flex items-center" onClick={() => (handleHover(index))}>
                                                <span class="material-symbols-rounded px-2 rounded-full" >
                                                    edit
                                                </span>
                                            </button>
                                            <button className="flex items-center" onClick={() => (handleDelete(doc._id))}>
                                                <span class="material-symbols-rounded px-2 rounded-full" >
                                                    delete
                                                </span>
                                            </button>
                                        </div> */}
                                    </div>
                                </Link>
                            ))}
                            </div>

                        ) :
                        (
                            <div className="col-span-2">
                                <div className="grid grid-cols-5 text-sm py-4 text-matty-600">
                                    <div className="col-span-2">Name</div>
                                    <div className="col-span-2">Email</div>
                                </div>
                            {data.docs && data.docs.map((doc, index) => (
                                <Link href={`/dashboard/admin/user/${doc._id}`} key={doc._id} className="grid grid-cols-5 py-3 group">
                                    <div className="flex col-span-2 gap-3 items-center">
                                        {/* <Image src={list.profile_url} width={24} height={24} alt={list.name}/> */}
                                        {doc.name || doc.first_name + " " + doc.last_name}
                                    </div>
                                    <div className="flex col-span-2 gap-3 items-center">
                                        {doc.email}
                                    </div>
                                </Link>
                            ))}
                            </div>
                        )
                    }
                    <div>
                        <TotalUsers />
                    </div>
                </div>
            </div>
        </>
    )
}