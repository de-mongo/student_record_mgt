import Nav from "../../../../components/Nav";
import Head from "next/head";
import SideNav from "../../../../components/SideNav";
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from "../../../../components/Modal";
export default function UserId() {
    const router = useRouter()
    const { id } = router.query;

    let active = ""
    let links = [
        {name: "Users", icon: "assignment_ind", link: "/dashboard/admin"},
        {name: "Courses", icon: "book", link: "/dashboard/admin/courses"},
        {name: "Dept", icon: "corporate_fare", link: "/dashboard/admin/depts"},
    ]

    const [data, setData] = useState();
    async function fetchUsers(id) {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/admin/user/${id}`, {withCredentials: true})

        setData(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        if (id !== undefined) {
            fetchUsers(id)
        }
    }, [id]) 

    async function handleDelete(id) {
        let res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/admin/user/${id}`, {withCredentials: true})
        router.push("/dashboard/admin")
        // setData(res.data)
        // console.log(res.data)
    }

    const [displayDel, setDisplayDel] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);

    return (
        <>
            <Head>
                <title>Admin Dashboard - user:{data && (data.name || `${data.first_name} ${data.last_name}`)}</title>
            </Head>
            <Modal display={displayDel} setDisplay={setDisplayDel} >
                <div className="flex flex-col items-center gap-3">
                    <div>
                        Do you want to Delete this record
                    </div>
                    <div className="flex gap-4">
                        <button className="py-2 px-4">Cancel</button>
                        <button className="py-2 px-4 rounded-full bg-red-600 text-white" onClick={() => handleDelete(id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
            {/* <Modal display={displayEdit} setDisplay={setDisplayEdit} >
                <div className="relative bg-white p-12 rounded-lg shadow-lg">
                    <button className="absolute right-2 top-1" onClick={() => {setDisplay(!display)}}>
                        <span className="material-symbols-rounded">close</span>
                    </button>
                    <div>
                        Do you want to Delete this record
                    </div>
                </div>
            </Modal> */}
            <div className="fixed"> <SideNav links={links} active={active} /> </div>
            <div className="fixed"> <Nav/> </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <div className="flex items-center gap-4 ">
                    <button className="flex items-center"><span className="material-symbols-rounded">edit</span>edit</button>
                    <button className="flex items-center" onClick={() => setDisplayDel(true)}><span className="material-symbols-rounded">delete</span>delete</button>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-8">
                    {data && (
                        <>
                            <div className="mr-4">name</div>
                            <div>{data.name || `${data.first_name} ${data.last_name}`}</div>
                            <div>email</div>
                            <div>{data.email}</div>
                            <div>role</div>
                            <div>{data.role}</div>
                            <div>Address</div>
                            <div>{data.street_address}</div>
                            <div>Date Of Birth</div>
                            <div>{data.date_of_birth}</div>
                            {(data.role !== "faculty" && 
                            <>
                            <div>Registration No</div>
                            <div>{data.reg_no}</div>
                            <div>Degree</div>
                            <div>{data.degree}</div>
                            <div>Semester</div>
                            <div>{data.sem}</div>
                            </>)}
                        </>
                    )}
                </div>

            </div>
        </>
    )
}