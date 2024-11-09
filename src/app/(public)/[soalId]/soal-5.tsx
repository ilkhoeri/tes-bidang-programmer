import Link from "next/link";


export function Field5(){
    return (
        <div className="rounded-lg p-4 bg-muted font-mono text-wrap [white-space:pre-line]">
            - Authentication dan Authorization saya menggunakan pihak ke-3
            - penerapan middleware terdapat pada file middleware (root)
            <Link className="text-blue-500 text-underline underline" href={"/auth/sign-in"}>login route</Link>
        </div>
    )
}

