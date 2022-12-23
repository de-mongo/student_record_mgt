import Link from "next/link"

export default function SideNav({active, links}) { 
    // let active = "Users"
    // let links = [
    //     {name: "Users", icon: "assignment_ind", link: "#"},
    //     {name: "Courses", icon: "book", link: "#"}
    // ]
    return (
        <div className="h-screen px-1 pt-4 border-r-2 border-matty-100">
            <button className="flex items-center py-2 px-6 rounded-full">
                <span class="material-symbols-rounded text-matty-900"> menu </span>
            </button>
            <div className="flex flex-col gap-6 pt-24">
                {links.map(link => (
                    <Link className="flex items-center flex-col" href={link.link} alt={link.name} key={link.name} >
                        <span class={`material-symbols-rounded ${active == link.name && "text-blue-900 bg-blue-50"} py-2 px-6 rounded-full`}>
                            {link.icon} 
                        </span>
                        {active == link.name && <div className="font-['Poppins'] font-semibold text-xs text-blue-900">{link.name}</div>}
                    </Link>

                ))}
            </div>
        </div>
    )
}