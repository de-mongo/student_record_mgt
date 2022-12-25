import SideNav from "../../../components/SideNav";
import Nav from "../../../components/Nav";
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';
import Modal from '../../../components/Modal';
import { useEffect, useState } from 'react';

export default function Courses() {
    // const router = useRouter()
    let active = "Courses"
    let links = [
        {name: "Users", icon: "assignment_ind", link: "/dashboard/admin"},
        {name: "Courses", icon: "book", link: "/dashboard/admin/courses"},
        {name: "Dept", icon: "corporate_fare", link: "/dashboard/admin/depts"},
    ]
    const [page, setPage] = useState(1)
    const [data, setData] = useState({})

    async function fetchMyCourses() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/courses`, {withCredentials: true})
        setData(res.data)
    }

    useEffect(() => {
        fetchMyCourses()
    }, [page])

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

    // const [display, setDisplay] = useState(true);


    return (
        <div>
            <Head>
                <title>Admin Dashboard - Courses</title>
            </Head>
            <div className="fixed">
                <SideNav active={active} links={links}/>
            </div>
            <div className="fixed">
                <Nav />
            </div>
            <div className="fixed">
                {/* <Modal display={display} setDisplay={setDisplay}>
                </Modal> */}
            </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <div>
                    <button onClick={prev}>Previous</button>
                    <button onClick={next}>Next</button>
                </div>
                <h1 className="font-['Poppins'] text-3xl font-medium mb-4">All Courses</h1>
                <div>
                    <div className="grid grid-cols-5 gap-4">

                    <Link href={"/dashboard/admin/course/new"} className="gap-2 flex items-center justify-center px-4 py-2 col-span-2 rounded-full bg-blue-600 text-matty-50" >
                        <span className="material-symbols-rounded">add</span>
                        Add New Course
                    </Link>
                    <div className='col-span-2'></div>
                        <div className="col-span-3">
                            <div className="grid grid-cols-5 text-sm text-matty-600">
                                <div className="col-span-2">Course Title</div>
                                <div className="col-span-2">Instructor</div>
                                <div>Department</div>
                            </div>
                            {data.docs && data.docs.map((doc) => (
                                <Link href={`/dashboard/admin/course/${doc._id}`} key={doc._id} className="grid grid-cols-5 py-3">
                                    <div className='col-span-2'>{doc.name}</div>
                                    <div className="col-span-2">{doc.instrid.name || doc.instrid.first_name + " " + doc.instrid.last_name}</div>
                                    <div>{doc.deptid.name}</div>
                                    {console.log(doc)}
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}