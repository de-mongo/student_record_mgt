import { useRouter } from 'next/router'
import SideNav from "../../../components/SideNav";
import ListCourses from "../../../components/ListCourses";
import Nav from "../../../components/Nav";
import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FMyCourses() {
    // const router = useRouter()

    let active = "My Courses"
    let links = [
        {name: "My Courses", icon: "book", link: "/dashboard/faculty"}
    ]
    const [page, setPage] = useState(1)
    const [data, setData] = useState({})
    // const [enrolled, setEnrolled] = useState([])
    async function fetchMyCourses() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/courses/me`, {withCredentials: true})
        // console.log(res)
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

    return (
        <div>
            <Head>
                <title>Student Dashboard</title>
            </Head>
            <div className="fixed">
                <SideNav active={active} links={links}/>
            </div>
            <div className="fixed">
                <Nav />
            </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <div>
                    <button onClick={prev}>Previous</button>
                    <button onClick={next}>Next</button>
                </div>
                <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Your Courses</h1>
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3">
                            <div className="grid grid-cols-5 text-sm text-matty-600">
                                <div className="col-span-2">Course Title</div>
                                <div>Department</div>
                            </div>
                            {data.docs && data.docs.map((doc) => (
                                <Link href={`/dashboard/faculty/course/${doc._id}`} key={doc._id} className="grid grid-cols-5 py-3">
                                    <div className='col-span-2'>{doc.name}</div>
                                    <div className='col-span-1'>{doc.deptid.name}</div>
                                    {console.log(doc)}
                                    {/* <ListCourses doc={doc} /> */}
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}