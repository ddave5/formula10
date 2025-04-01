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
          setError('Failed to load group');
          return;
        }
        setGroup(group);

      } catch (err) {
        eventBus.emit('error', {message: t('messages.errorFetching')});
        setError('Failed to load group');
      } finally {
        setLoading(false);
      }
    }

    loadGroupById();
  }, [location.pathname, t]);

  if (loading) {
    return <Loading isLoading={loading} />;
  } 

  return (
    <div>
      <h1 className='text-2xl font-bold'>{t('manageGroup.manageGroup')}</h1>
      <RenameComponent group={group}/>
    </div>
  )
}

export default ManageGroup

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
