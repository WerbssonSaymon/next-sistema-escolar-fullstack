import Link from "next/link";
import LateralMenuButton from "./LateralMenuButton";

export default function LateralMenu(){
    return (
        <nav className="w-[130px] flex flex-col items-start list-none">
            <LateralMenuButton nome="inicio" rota="/"/>
            <LateralMenuButton nome="usuarios" rota="/users"/>
        </nav>
    )
}