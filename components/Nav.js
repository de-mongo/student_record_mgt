import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";

export default function () {
    const [options, setOptions] = useState(false);
    const user = {
        name: "Stuart",
        profile_url: `https://api.multiavatar.com/stuartrichard.svg`,
    }
    return (
        <nav className="flex p-4 px-6 pl-28 text-matty-900 w-screen items-center">
                <Image src={user.profile_url} width={24} height={24} alt={user.name}/>
                <div className="relative flex items-center font-['Poppins'] font-medium">
                    <button className="flex items-center" onClick={() => setOptions(!options)}>
                        {user.name}
                        <span class="material-symbols-rounded"> arrow_drop_down </span>
                    </button>
                    {options && (
                        <div className="flex flex-col gap-4 absolute top-10 px-6 p-4 w-52 right-0 bg-white rounded-lg border-2 border-matty-100">
                            <Link href="#" className="flex items-center gap-2 font-['Poppins'] text-sm font-normal">
                                <span class="material-symbols-rounded">
                                    face_5
                                </span>
                                Profile
                            </Link>
                            <Link href="#" className="flex items-center gap-2 font-['Poppins'] text-sm font-normal">
                                <span class="material-symbols-rounded">
                                    settings
                                </span>
                                Settings
                            </Link>
                            <hr className="bg-matty-100"/>
                            <Link href="/" className="flex items-center gap-2 font-['Poppins'] text-sm font-normal text-red-500">
                                <span class="material-symbols-rounded">
                                    logout
                                </span>
                                Sign out
                            </Link>
                        </div>
                    )}
                    
                </div>
        </nav>
    )
}