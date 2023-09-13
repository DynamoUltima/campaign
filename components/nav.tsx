import Image from "next/image";
import Logo from "@/public/uuk.png"
import logo from "@/public/svg/logo.svg"
import { BiCategory } from 'react-icons/bi'
import { AiOutlineHome } from 'react-icons/ai'
import { BsCalendar4Week, BsPeople } from 'react-icons/bs'
import Dropdown from "./dropdown";

const Nav = () => {
    return (
        <div className="flex  items-center justify-center bg-white">
            <div className="flex flex-row items-center justify-center space-x-4 p-4 max-w-screen-lg">
                <Image alt="logo" width={100} src={logo} objectFit="cover" layout="contain" />

                <div className="flex flex-row items-center space-x-2 ">

                    <AiOutlineHome color="#9ca3af" />

                    <div className="text-gray-400 text-sm">Dashboard</div>

                </div>

                <div className="flex flex-row items-center space-x-2 ">
                    <BsCalendar4Week color="#9ca3af" />

                    <div className="text-gray-400 text-sm">Bookings </div>

                </div>

                <div className="flex flex-row items-center space-x-2 ">
                    <BsPeople color="#9ca3af" />

                    <div className="text-gray-400 text-sm">Customers </div>

                </div>

                <div className="flex flex-row items-center space-x-2 ">
                    <BiCategory color="#9ca3af" />

                    <div className="text-gray-400 text-sm">Services </div>

                </div>

                <div>
                    <Dropdown />
                </div>



            </div>
        </div>

    );
}

export default Nav;