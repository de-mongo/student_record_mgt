import Image from 'next/image'

export default function ListCourses({doc}) {
    return (
        <>
            <div className="flex col-span-2 gap-3">
                {doc.name}
            </div>
            <div className="flex col-span-2 gap-4">
                <Image src={`https://api.multiavatar.com/${doc.instrid.name || (doc.instrid.first_name + " " + doc.instrid.last_name)}.png`} width={24} height={24} alt={doc.instrid.name} />
                {doc.instrid.name || (doc.instrid.first_name + " " + doc.instrid.last_name)}
            </div>
            <div className="flex gap-3">
                {doc.deptid.name}
            </div>
        </>
    )

}