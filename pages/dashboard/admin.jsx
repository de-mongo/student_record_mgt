import Nav from "../../components/Nav";
import Image from "next/image";
import Head from "next/head";
import SideNav from "../../components/SideNav";
import TotalUsers from "../../components/TotalUsers";
import Link from "next/link";
import { useState } from "react";

export default function() {
    const name = "Stuart Richards";

    const [studentList, setStudentList] = useState([
        {
            name: "N. Sri Meher Chaitanya", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/meherchaitanya.svg",
            options: false,
        },
        {
            name: "Vivek Kumar", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/vivek.svg",
            options: false,
        },
        {
            name: "K. P. S. S. S. Srinu", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/srinu.svg",
            options: false,
        },
        {
            name: "Srikrishna Dantu", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/srikrishna.svg",
            options: false,
        },
    ]);

    const len = studentList.length;

    function handleHover(index) {
        const newList = [...studentList]; 
        newList[index].options = !newList[index].options; 
        setStudentList(newList)
    }

    function handleHoverClose(index) {
        const newList = [...studentList]; 
        newList[index].options = false;
        setStudentList(newList)
    }
    // const userOptions

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="fixed"> <SideNav/> </div>
            <div className="fixed"> <Nav/> </div>
            <div className="pl-28 tracking-wide px-8 pt-36 text-matty-900">
                <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Good morning, {name}</h1>
                <div className="grid grid-cols-3">
                    <div className="col-span-2">
                        <div className="grid grid-cols-5 text-sm py-4 text-matty-600">
                            <div className="col-span-3">User Name</div>
                            <div className="">Semester</div>
                            <div className="">Course</div>
                        </div>
                    {studentList.map((list, index) => (
                        <div key={list.name} className="grid grid-cols-5 py-3 group">
                            <div className="flex col-span-3 gap-3 items-center">
                                <Image src={list.profile_url} width={24} height={24} alt={list.name}/>
                                {list.name}
                            </div>
                            <div className="flex gap-3 items-center">
                                {list.sem}
                            </div>
                            <div className="flex gap-3 items-center">
                                {list.course}
                                <button className="relative flex items-center" onClick={() => (handleHover(index))}>
                                    <span class="hidden group-hover:flex material-symbols-rounded px-6 rounded-full" onMouseLeave={() => (handleHoverClose(index))}>
                                        more_vert
                                    </span>
                                    {list.options && (
                                        <div className="flex flex-col gap-4 absolute top-7 px-6 p-4 w-44 left-0 bg-white rounded-lg border-2 border-matty-100">
                                            <Link href={`#${index}`} className="flex items-center gap-2 font-['Poppins'] text-sm font-normal">
                                                <span class="material-symbols-rounded">edit</span> Edit User
                                            </Link>
                                            <Link href={`#${index}`} className="flex items-center gap-2 font-['Poppins'] text-sm font-normal text-red-600">
                                                <span class="material-symbols-rounded">delete</span> Delete User
                                            </Link>
                                            {/* <hr className="bg-matty-100"/>
                                            <Link href="/" className="flex items-center gap-2 font-['Poppins'] text-sm font-normal text-red-500">
                                                <span class="material-symbols-rounded"> logout </span> Sign out
                                            </Link> */}
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
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