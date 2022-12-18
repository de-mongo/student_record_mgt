import Nav from "../../components/Nav";
import Image from "next/image";
import Head from "next/head";
import SideNav from "../../components/SideNav";
import TotalUsers from "../../components/TotalUsers";

export default function() {
    const name = "Stuart Richards";

    const studentList = [
        {
            name: "N. Sri Meher Chaitanya", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/meherchaitanya.svg"
        },
        {
            name: "Vivek Kumar", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/vivek.svg"
        },
        {
            name: "K. P. S. S. S. Srinu", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/srinu.svg"
        },
        {
            name: "Srikrishna Dantu", 
            sem: 7, 
            course: "I.M.Tech", 
            profile_url: "https://api.multiavatar.com/srikrishna.svg"
        },
    ]
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
                    {studentList.map((list) => (
                        <div key={list.name} className="grid grid-cols-5 py-3">
                            <div className="flex col-span-3 gap-3">
                                <Image src={list.profile_url} width={24} height={24} alt={list.name}/>
                                {list.name}
                            </div>
                            <div className="flex gap-3">
                                {list.sem}
                            </div>
                            <div className="flex gap-3">
                                {list.course}
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