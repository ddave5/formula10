import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IoMdCreate } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { getGroupListByUserId } from '../../../services/groupService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { GroupDTO } from '../../../dto/group.dto';
import Loading from '../../../components/Loading/Loading';


const GroupMenu = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const [groups, setGroups] = useState<GroupDTO[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  const { t } = useTranslation();

  const menuElementStyle= 'p-2 rounded-md bg-gray-200 hover:bg-gray-100 before:h-0 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200';

  useEffect(() => {
    const fetchMyGroups = async () => {
        try {
            const data = await getGroupListByUserId(user?.id || 0);
            setGroups(data);
        } catch (err) {
            setError('Failed to fetch groups');
        } finally {
            setLoading(false);
        }
    };

    fetchMyGroups();
}, []);

if (loading) {
    return <Loading isLoading={loading} />;
}

if (error) {
    return <div>{error}</div>;
}

  return (
    <div className='grid grid-cols-[15%_85%]'>
        <div className='bg-gray-200 dark:bg-gray-700'>
          <div className='p-4 flex flex-col border-t-2 border-r-2 border-gray-300 dark:border-gray-800 border-solid'>
            <Link to="/groups/create" className={`${menuElementStyle} mb-1`}>< IoMdCreate/> {t('groupMenu.createGroup')}</Link>
            <Link to="/groups/join" className={`${menuElementStyle} `}>< MdGroup/> {t('groupMenu.joinGroup')}</Link>
          </div>
          <div className='p-4 flex flex-col border-y-2 border-r-2 border-gray-300 dark:border-gray-800 border-solid '>
            {groups.map((group) => (
              <Link to={`/groups/${group.id}`} className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> {group.name}
              </Link>)
            )}
          </div>
        </div>
        <Outlet />
    </div>
  )
}

export default GroupMenu