import { useWindowWidth } from '@react-hook/window-size'
import React from 'react'
import NavbarPC from './navbarPC/NavbarPC';
import NavbarTablet from './navbarTablet/NavbarTablet';
import NavbarMobile from './navbarMobile/NavbarMobile';
import RedLogo from '../../assets/logo/f10_red.png'

const Navbar = () => {

    const initialWidth = useWindowWidth();

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={RedLogo} className="h-8" alt="F10 Logo" />
                        <span className="self-center text-2xl title-font whitespace-nowrap dark:text-white">Formula 10</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                    </div>
                </div>
            </nav>
            { initialWidth > 1280 ? (
                <NavbarPC />
            ) : ( initialWidth > 768 ? (
                <NavbarTablet />
            ) : (
                <NavbarMobile />
            ))}
        </>
    )
}

export default Navbar