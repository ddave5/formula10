import type { GroupDTO } from '../../dto/group.dto'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { IoMdCreate, IoMdSettings } from 'react-icons/io'
import { MdGroup } from 'react-icons/md'
import { TiPencil } from 'react-icons/ti'
import { AiOutlineTrophy } from 'react-icons/ai'
import { GrGroup } from 'react-icons/gr'
import { FaBoxArchive, FaFlagCheckered } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";


const Menu = (
    {
        containerStyle, group, groupList, leaveGroup, deleteGroup, authority
    } : {
        containerStyle: string, group?: GroupDTO | null, groupList?: GroupDTO[], leaveGroup?: () => void, deleteGroup?: () => void, authority?: string
    }) => {
    
    const { t } = useTranslation();

    const menuElementStyle= 'p-2 rounded-md bg-gray-200 hover:bg-gray-100 before:h-0 text-gray-600 dark:bg-gray-600 dark:hover:bg-gray-400 dark:text-gray-200';

    return (
        <div className={`${containerStyle} overflow-y-scroll`}>
            <div className='p-4 flex flex-col'>
                {group && (
                    <p className='text-2xl title-font w-full text-center whitespace-nowrap dark:text-white'>{group?.name}</p>
                )}
                { !group && (
                    <>
                        <Link to="/groups/create" className={`${menuElementStyle} mb-1`}>< IoMdCreate/> {t('groupMenu.createGroup')}</Link>
                        <Link to="/groups/join" className={`${menuElementStyle} `}>< MdGroup/> {t('groupMenu.joinGroup')}</Link>
                    </>
                )}
            </div>
            <div className='p-4 flex flex-col border-t-2 border-gray-300 dark:border-gray-600 border-solid max-h-[500px] '>
                {groupList && (
                    groupList.map(
                        (group) => ( 
                            <Link to={`/groups/${group.id}`} className={`${menuElementStyle} mb-1`} key={group.id}><FaFlagCheckered /> {group.name} </Link>
                        ))
                )}
                { !groupList && (
                    <>
                        <Link to={'/groups'} className={`${menuElementStyle} mb-1`} key='home'><IoArrowBackCircleOutline /> {t('groupDetailsMenu.backToGroup')} </Link>
                        <Link to={`/groups/${group?.id}`} className={`${menuElementStyle} mb-1`} key='back'><FaHome /> {t('groupDetailsMenu.home')} </Link>
                        <Link to={`/groups/${group?.id}/tip`} className={`${menuElementStyle} mb-1`} key='tip'><TiPencil /> {t('groupDetailsMenu.tip')} </Link>
                        <Link to={`/groups/${group?.id}/standing`} className={`${menuElementStyle} mb-1`} key='standing'><AiOutlineTrophy /> {t('groupDetailsMenu.standing')} </Link>
                        <Link to={`/groups/${group?.id}/members`} className={`${menuElementStyle} mb-1`} key='members'><GrGroup /> {t('groupDetailsMenu.members')} </Link>
                        {/* TODO: Update it when a season ends
                        <Link to={`/groups/${group?.id}/archive`} className={`${menuElementStyle} mb-1`} key='archive'><FaBoxArchive /> {t('groupDetailsMenu.archive')} </Link> 
                        */}
                        { authority && authority === 'ADMIN' && (
                            <Link to={`/groups/${group?.id}/manage`} className={`${menuElementStyle} mb-1`} key='manage'><IoMdSettings /> {t('groupDetailsMenu.manageGroup')} </Link>
                        )}
                        <div className='flex flex-col absolute bottom-4 justify-center w-[calc(50%-2rem)] sm:w-[calc(34%-2rem)] lg:w-[calc(100%-2rem)]'>
                            <Button variant="contained" onClick={leaveGroup} sx={{ mb: 1 , color: 'var(--color-font)', backgroundColor: 'var(--color-primary)', width: 'calc(100% - 1rem)'}}>{t('groupDetailsMenu.leaveGroup')}</Button>
                            { authority && authority === 'ADMIN' && (
                                <Button variant="contained" onClick={deleteGroup} sx={{color: 'var(--color-font)', backgroundColor: 'var(--color-primary)', width: 'calc(100% - 1rem)' }}>{t('groupDetailsMenu.deleteGroup')}</Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Menu