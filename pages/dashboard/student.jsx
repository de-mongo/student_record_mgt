import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormState } from 'react-hook-form';
import SideNav from "../../components/SideNav";
import Nav from "../../components/Nav";
import Head from 'next/head';
import Image from 'next/image'


function student_dashboard() {
    const router = useRouter()
    const name = "vivek kumar";

    const course = [
        {
            name: "Data Engineering",
            instructor: "Mridula Verma",
            type: "Elective",
            semester: 7,
            course_url: "https://api.multiavatar.com/check.png"
        },
        {
            name: "Essentials of AI",
            instructor: "Salman abdul",
            type: "Core",
            semester: 7,
            course_url: "https://api.multiavatar.com/check.png"
        }
    ]

    const totalCourse = [
        { type: "Current Courses", count: 10, color: "decoration-blue-300" },
        { type: "Course completed", count: 2, color: "decoration-green-300" }
    ]

    return (
        <div>
            <Head>
                <title>Student Dashboard</title>
            </Head>
            <div className="fixed">
                <SideNav />
            </div>
            <div className="fixed">
                <Nav />
            </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Hello, {name}</h1>
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        {totalCourse.map((list) => (
                            <div className="grid grid-cols-2 text-sm py-4 text-matty-600">
                                <div className="col-span-2">{list.type}</div>
                                <h1 className={`text-4xl underline underline-offset-8 decoration-8 ${list.color} font-['Poppins'] font-semibold`}>{list.count}</h1>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3">
                            <div className="grid grid-cols-5 text-sm py-4 text-matty-600">
                                <div className="col-span-2">Course Title</div>
                                <div>Semester</div>
                                <div>Type</div>
                                <div>Instructor</div>
                            </div>
                            {course.map((list) => (
                                <div key={list.name} className="grid grid-cols-5 py-3">
                                    <div key={list.name} className="flex col-span-2 gap-3">
                                        {list.name}
                                    </div>
                                    <div key={list.semester} className="flex gap-4">
                                        {list.semester}
                                    </div>
                                    <div key={list.type} className="flex gap-3">
                                        {list.type}
                                    </div>
                                    <div key={list.instructor} className="flex gap-3">
                                        <Image src={list.course_url} width={24} height={24} alt={list.name} />
                                        {list.instructor}
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
export default student_dashboard
