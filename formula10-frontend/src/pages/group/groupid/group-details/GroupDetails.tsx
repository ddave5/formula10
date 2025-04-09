import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getGroupMembersTipExist } from '../../../../services/tip.service';
import eventBus from '../../../../services/eventBus';
import Loading from '../../../../components/Loading/Loading';
import TableComponent from '../../../../components/table/TableComponent';

const GroupDetails = () => {
  const [groupMemberTips, setGroupMembersTips] = React.useState<{style: string, value: string}[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  const tRef = useRef(t);

  useEffect(() => {
    const getGroupMembers = async (groupId: string) => {
      try {
        const groupTips = await getGroupMembersTipExist(+groupId);

        if (!groupTips) {
          setError('Failed to fetch race data');
          return;
        }
        
        const styles = ['font-medium dark:text-[--color-font]', 'dark:text-[--color-font]', 'text-right dark:text-[--color-font]'];
        const groupTipsStructuredData = Object.keys(groupTips).map((name) => [
          { style: styles[0], value: name },
          { style: styles[1], value: groupTips[name] },
        ]);
        
        setGroupMembersTips(groupTipsStructuredData || []);
        
      } catch (error) {
        eventBus.emit('error', {message: tRef.current('messages.errorFetching')})
        setError(
          error instanceof Error ? error.message : 'Failed to fetch data'
        );
      } finally {
        setLoading(false);
      }
    };

    getGroupMembers(location.pathname.split('/')[2]);
  }, []);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='w-3/4'>
        <TableComponent 
        title={'groupMember.members'}
        header={[
          {text: 'groupMember.username', style: 'w-[100px] dark:text-[--color-font]'}, 
          {text: '', style: ''}
        ]}
        body = {
          groupMemberTips
        }/>
      </div>
    </div>
  )
}

export default GroupDetails