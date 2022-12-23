export default function({display = false, setDisplay, children}) {
    return (
        <>
        {display && (
        <div className="z-[1000] flex justify-center items-center bg-matty-500/50 w-screen h-full fixed">
            <div className="relative p-12 rounded-lg shadow-lg bg-white">
            <button className="absolute right-2 top-1" onClick={() => {setDisplay(!display)}}>
                <span className="material-symbols-rounded">close</span>
            </button>
            {children}
            </div>
        </div>
        )}
        </>
    )
}