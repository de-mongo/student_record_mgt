import { useRouter } from 'next/router'
import SideNav from "../../../components/SideNav";
import ListCourses from "../../../components/ListCourses";
import Nav from "../../../components/Nav";
import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SAllCourses() {
    // const router = useRouter()
    let active = "Courses"
    let links = [
        {name: "Home", icon: "home", link: "/dashboard/student"},
        {name: "Courses", icon: "book", link: "/dashboard/student/courses"}
    ]
    const [page, setPage] = useState(1)
    const [data, setData] = useState({})
    const [enrolled, setEnrolled] = useState([])
    async function fetchCourses() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/courses?page=${page}`, {withCredentials: true})
        // console.log(res)
        setData(res.data)
    }

    async function fetchMyCourses() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/courses/me?nopopulate=true`, {withCredentials: true})
        // console.log(res)
        setEnrolled(res.data)
    }

    useEffect(() => {
        fetchCourses()
        fetchMyCourses()
    }, [page])

    async function enrollCourse(id) {
        let res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/courses/enroll`, {courseId: id}, {withCredentials: true})
        console.log(res)
        if (res.status == 200) {
            console.log(res.statusText)
            setPage(1)
            fetchCourses()
            fetchMyCourses()
        }
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
                <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Courses Enrolled</h1>
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3">
                            <div className="grid grid-cols-5 text-sm text-matty-600">
                                <div className="col-span-2">Course Title</div>
                                <div>Instructor</div>
                                <div>Department</div>
                            </div>
                            {data.docs && data.docs.filter(doc => (enrolled.includes(doc._id))).map((doc) => (
                                <div key={doc._id} className="grid grid-cols-5 py-3">
                                    <ListCourses doc={doc} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <h1 className="font-['Poppins'] pt-6 text-3xl font-medium mb-4">Courses Available</h1>
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3">
                            <div className="grid grid-cols-5 text-sm text-matty-600">
                                <div className="col-span-2">Course Title</div>
                                <div>Instructor</div>
                                <div>Department</div>
                            </div>
                            {data.docs && data.docs.filter(doc => (!enrolled.includes(doc._id))).map((doc) => (
                                <div key={doc._id} className="grid grid-cols-5 py-3 items-center">
                                    <ListCourses doc={doc} />
                                    <div className="flex">
                                        <button onClick={() => (enrollCourse(doc._id))} className="py-2 px-4 bg-blue-600 rounded-full text-matty-50">enroll</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}