import { Suspense } from 'react';
import ThemeToggle from './Theme/ThemeToggle';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './Language/LanguageSelector';
import Login from './LoginButton/LoginButton';
import { useWindowWidth } from '@react-hook/window-size';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import './Navbar.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import Logout from './LogoutButton/LogoutButton';
import SignUpButton from './SignUpButton/SignUpButton';

const Navbar = () => {

    const { t } = useTranslation();
    const width = useWindowWidth();

    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Suspense fallback="loading">
            <nav className="bg-[--color-primary] text-[--color-font] border-gray-200 dark:bg-[--color-gray]">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl title-font whitespace-nowrap dark:text-white">Formula 10</span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <LanguageSelector />
                        <ThemeToggle />
                        {!user && <SignUpButton />}
                        {user ? <Logout /> : <Login /> }
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-100 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center ">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link to="/rules" className="text-[--color-primary] dark:text-white before:bg-[--color-primary] dark:before:bg-white"> { t('navbar.rules') }</Link>
                            </li>
                            <li>
                                <Link to="/groups" className="text-[--color-primary] dark:text-white before:bg-[--color-primary] dark:before:bg-white"> { t('navbar.groups') }</Link>
                            </li>
                        </ul>
                        {width < 768 && <div className="flex-grow">
                            <Link to="/menu" className="flex items-center justify-end text-[--color-font] dark:text-white">
                                <RxHamburgerMenu />
                            </Link>
                            </div>}
                    </div>
                </div>
            </nav>
        </Suspense>
    )
}

export default Navbar