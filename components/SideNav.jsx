export default function() { 
    return (
        <div className="h-screen px-1 pt-4 border-r-2 border-matty-100">
            <button className="flex items-center py-2 px-6 rounded-full">
                <span class="material-symbols-rounded text-matty-900"> menu </span>
            </button>
            <div className="flex flex-col gap-6 pt-24">
                <button className="flex items-center flex-col">
                    <span class="material-symbols-rounded text-blue-900 bg-blue-50 py-2 px-6 rounded-full">
                        assignment_ind 
                    </span>
                    <div className="font-['Poppins'] font-semibold text-xs text-blue-900">Users</div>
                </button>
                <button className="flex items-center flex-col">
                    <span class="material-symbols-rounded py-2 px-6 rounded-full">
                        book 
                    </span>
                </button>
            </div>
        </div>
    )
}