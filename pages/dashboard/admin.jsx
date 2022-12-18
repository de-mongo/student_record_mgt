import Nav from "../../components/Nav";
import Image from "next/image";
import Head from "next/head";
import SideNav from "../../components/SideNav";

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
        // {name: "Vivek Kumar", sem: 7, course: "I.M.Tech", 
        // {name: "K. P. S. S. S. Srinu", sem: 7, course: "I.M.Tech", 
        // {name: "Srikrishna Dantu", sem: 7, course: "I.M.Tech", 
    ]
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="fixed">
                <SideNav/>
            </div>
            <div className="ml-20">
                <div className="fixed">
                    <Nav/>
                </div>
                <div className="tracking-wide px-8 pt-36 text-matty-900">
                    <h1 className="font-['Poppins'] text-3xl font-medium mb-4">Good morning, {name}</h1>
                    <div className="grid grid-cols-3">
                        <div className="col-span-2">
                            <div className="flex text-sm py-4 text-matty-600">
                                <div className="flex-1">User Name</div>
                                <div className="flex-1">Semester</div>
                                <div className="flex-1">Course</div>
                            </div>
                        {studentList.map((list) => (
                            <div key={list.name} className="flex py-3">
                                <div className="flex flex-1 gap-3">
                                    <Image src={list.profile_url} width={24} height={24} alt={list.name}/>
                                    {list.name}
                                </div>
                                <div className="flex flex-1 gap-3">
                                    {list.sem}
                                </div>
                                <div className="flex flex-1 gap-3">
                                    {list.course}
                                </div>
                            </div>
                        ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}