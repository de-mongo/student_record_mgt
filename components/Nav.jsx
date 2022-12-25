import axios from "axios";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from 'react-cookie';

export default function Nav() {
    const [options, setOptions] = useState(false);
    const [cookie] = useCookies(['user'])
    console.log(cookie.user)

    const router = useRouter();

    const [user, setUser] = useState()

    useEffect(() => {
        if (cookie.user != undefined) {
            let splitCookie = cookie.user.split("-")
            setUser({
                name: splitCookie[0],
                profile_url: `https://api.multiavatar.com/${splitCookie[0]}.svg`,
                role: splitCookie[1] 
            })
        }
    }, [cookie])

    async function logout() {
        let res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/logout`, 
            {withCredentials: true}
        )

        if (res.status == 200) {
            router.push("/")
        }
    }

    return (
        <nav className="flex p-4 px-6 pl-28 text-matty-900 w-screen items-center">
            <div className="flex flex-1 items-center">
                <svg className="mr-2" width="38" height="38" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.33504 19.0932L6.42497 20.8085C6.14918 21.7331 6.99225 22.4628 7.89926 22.7994L9.33504 19.0932Z" fill="#003B76"/>
                    <path d="M11.2112 11.6963C11.276 11.4791 11.4317 11.3008 11.6381 11.2073L20.7624 7.07452C21.3734 6.79776 22.0265 7.36796 21.8348 8.01075L18.4231 19.4484C18.3466 19.7051 18.144 19.9048 17.8862 19.9776L7.89931 22.7994L11.2112 11.6963Z" fill="url(#paint0_linear_232_1032)"/>
                    <path d="M9.74268 9.68572C9.79963 9.4948 9.92728 9.33281 10.0996 9.23278L18.5192 4.34479C19.132 3.98906 19.8642 4.56601 19.6617 5.24496L16.4411 16.0418C16.3761 16.26 16.2192 16.4389 16.0115 16.5321L6.4175 20.8334L9.74268 9.68572Z" fill="url(#paint1_linear_232_1032)"/>
                    <path d="M10.5 11L17 7.5" stroke="url(#paint2_linear_232_1032)" strokeLinecap="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_232_1032" x1="22" y1="8.00012" x2="8" y2="24.0001" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0079EE"/>
                    <stop offset="1" stopColor="#004E99"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_232_1032" x1="19" y1="4" x2="6" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#73BAFF"/>
                    <stop offset="1" stopColor="#0082FF"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_232_1032" x1="17" y1="7.5" x2="10" y2="11" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                    </linearGradient>
                    </defs>
                </svg>
                <div className="font-['Poppins'] text-lg font-medium ">EduList</div>
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center">
                    <span className="material-symbols-rounded"> notifications </span>
                </button>
                {user && (
                    <Image src={user.profile_url} width={24} height={24} alt={user.name}/>
                )}
                <div className="relative flex items-center font-['Poppins'] font-medium">
                    <button className="flex items-center" onClick={() => setOptions(!options)}>
                        {user && (
                                user.name
                        )}
                        <span className="material-symbols-rounded"> arrow_drop_down </span>
                    </button>
                    {options && (
                        <div className="flex flex-col gap-4 absolute top-8 px-6 p-4 w-52 right-0 bg-white rounded-lg border-2 border-matty-100" onMouseLeave={() => setOptions(false)}>
                            <Link href={`/dashboard/${user.role}/me`} className="flex items-center gap-2 font-['Poppins'] text-sm font-normal">
                                <span className="material-symbols-rounded">
                                    face_5
                                </span>
                                Profile
                            </Link>
                            <Link href="#" className="flex items-center gap-2 font-['Poppins'] text-sm font-normal">
                                <span className="material-symbols-rounded">
                                    settings
                                </span>
                                Settings
                            </Link>
                            <hr className="bg-matty-100"/>
                            <button onClick={logout} className="flex items-center gap-2 font-['Poppins'] text-sm font-normal text-red-500">
                                <span className="material-symbols-rounded">
                                    logout
                                </span>
                                Sign out
                            </button>
                        </div>
                    )}
                    
                </div>
            </div>
        </nav>
    )
}