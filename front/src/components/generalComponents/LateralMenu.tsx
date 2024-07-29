import Link from "next/link";

export default function LateralMenu(){
    return (
        <nav className="w-[130px] flex flex-col items-start list-none">
            <li>
                <Link href={"/"}>
                    <button className="p-2 text-md text-white font-medium">
                        inicio
                    </button>
                </Link>
            </li>
            <li>
                <Link href={"/users"}>
                    <button className="p-2 text-md text-white font-medium">
                        usuarios
                    </button>
                </Link>
            </li>
            <li>
                <Link href={"/users"}>
                    <button className="p-2 text-md text-white font-medium">
                        alunos
                    </button>
                </Link>
            </li>
        </nav>
    )
}