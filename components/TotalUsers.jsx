export default function TotalUsers() {
    const totalUsers = [
        {type: "Students", count: 610, color: "decoration-blue-500"},
        {type: "Faculty", count: 54, color: "decoration-green-500"},
        {type: "Staff", count: 23, color: "decoration-amber-500"},
        {type: "Admin", count: 4, color: "decoration-red-500"},
    ]

    return (
        <div className="flex flex-col items-end gap-8 px-12">
            {totalUsers.map(user => (
                <div className="flex flex-col items-end" key={user.type}> 
                    <div className="text-xs">{user.type}</div>
                    <h1 className={`text-4xl underline underline-offset-8 decoration-8 ${user.color} font-['Poppins'] font-semibold`}>{user.count}</h1>
                </div>
            ))}
        </div>
    );


}