import { useTranslation } from 'react-i18next';
import RenameComponent from './RenameComponent/RenameComponent';
import { GroupDTO } from '../../../../dto/group.dto';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGroupById } from '../../../../services/group.service';
import eventBus from '../../../../services/eventBus';
import Loading from '../../../../components/Loading/Loading';

const ManageGroup = () => {

  const { t } = useTranslation();
  const location = useLocation();
  const [group, setGroup] = useState<GroupDTO>({ id: 0, name: '', members: [], availability: 'PUBLIC' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGroupById = async () => {
      try {
        const groupId = location.pathname.split('/')[2];
        const group = await getGroupById(+groupId);
        if (!group) {
          eventBus.emit('error', {message: t('messages.errorFetching')});
          return;
        }
        setGroup(group);

      } catch (err) {
        eventBus.emit('error', {message: t('messages.errorFetching')});
      } finally {
        setLoading(false);
      }
    }

    loadGroupById();
  }, []);

  if (loading) {
    return <Loading isLoading={loading} />;
  } 

  return (
    <div className='flex flex-col gap-4 p-4 align-center'>
      <h1 className='text-2xl font-bold text-center'>{t('manageGroup.manageGroup')}</h1>
      <RenameComponent group={group}/>
    </div>
  )
}

export default ManageGroup