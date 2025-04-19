import { Suspense } from 'react';
import ThemeToggle from './Theme/ThemeToggle';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './Language/LanguageSelector';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/Store';
import UserMenu from './Menu/UserMenu';

const Navbar = () => {

    const { t } = useTranslation();

    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Suspense fallback="loading">
            <nav className="bg-[--color-primary] text-[--color-font] border-gray-200 dark:bg-[--color-gray]">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl title-font whitespace-nowrap dark:text-white">Formula 10</span>
                    </Link>
                    <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse">
                        <LanguageSelector />
                        <ThemeToggle />
                        <UserMenu />
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
                                <Link to="/points" className="text-[--color-primary] dark:text-white before:bg-[--color-primary] dark:before:bg-white"> { t('navbar.points') }</Link>
                            </li>
                            {
                                user && (
                                    <li>
                                        <Link to="/groups" className="text-[--color-primary] dark:text-white before:bg-[--color-primary] dark:before:bg-white"> { t('navbar.groups') }</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </Suspense>
    )
}

export default Navbar