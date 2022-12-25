import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios';
// import { useFormState } from 'react-hook-form';
import SideNav from "../../components/SideNav";
import Nav from "../../components/Nav";
import Head from 'next/head';
import Image from 'next/image'
import ListCourses from '../../components/ListCourses';

export default function StudentDashboard() {
    // const router = useRouter()
    const name = "vivek kumar";
    const [data, setData] = useState([])
    async function fetchMyCourses() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/courses/me`, {withCredentials: true})
        // console.log(res)
        setData(res.data)
    }

    useEffect(() => {
        fetchMyCourses()
    }, [])
    let active = "Home"
    let links = [
        {name: "Home", icon: "home", link: "/dashboard/student"},
        {name: "Courses", icon: "book", link: "/dashboard/student/courses"}
    ]

    const totalCourse = [
        { type: "Current Courses", count: 10, color: "decoration-blue-300" },
        { type: "Course completed", count: 2, color: "decoration-green-300" }
    ]

    return (
        <div>
            <Head>
                <title>Student Dashboard - Home</title>
            </Head>
            <div className="fixed">
                <SideNav links={links} active={active} />
            </div>
            <div className="fixed">
                <Nav />
            </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                {/* <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Hello, {name}</h1> */}
                <div>
                    {/* <div className="grid grid-cols-2 gap-2">
                        {totalCourse.map((list) => (
                            <div key={list.type} className="grid grid-cols-2 text-sm py-4 text-matty-600">
                                <div className="col-span-2">{list.type}</div>
                                <h1 className={`text-4xl underline underline-offset-8 decoration-8 ${list.color} font-['Poppins'] font-semibold`}>{list.count}</h1>
                            </div>
                        ))}
                    </div> */}
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3">
                            <div className="grid grid-cols-5 text-sm py-4 text-matty-600">
                                <div className="col-span-2">Course Title</div>
                                <div className="col-span-2">Instructor</div>
                                <div>Department</div>
                            </div>
                            <div className="grid grid-cols-5 gap-2  py-4 text-matty-600">
                            {data != [] && data.map((doc) => (
                                <ListCourses doc={doc} key={doc._id}/>
                            ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

