import Link from "next/link";

export interface LateralMenuButtonProps {
    nome: string,
    rota: string
}

export default function LateralMenuButton(props: LateralMenuButtonProps){
    return (
        <li>
            <Link href={props.rota}>
                <button className="p-2 text-md text-white font-light uppercase">
                     {props.nome}
                </button>
            </Link>
         </li>
    )
}