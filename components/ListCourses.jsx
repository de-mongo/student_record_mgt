import Image from 'next/image'

export default function({doc}) {
    return (
        <>
            <div className="flex col-span-2 gap-3">
                {doc.name}
            </div>
            <div className="flex gap-4">
                <Image src={`https://api.multiavatar.com/${doc.instrid.name}.png`} width={24} height={24} alt={doc.instrid.name} />
                {doc.instrid.name}
            </div>
            <div className="flex gap-3">
                {doc.course}
            </div>
        </>
    )

}