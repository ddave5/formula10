import React, { useEffect, useState } from 'react'
import TableComponent from '../../../../components/table/TableComponent'
import { getGroupMemberListByGroupId } from '../../../../services/groupmember.service';
import { useLocation } from 'react-router-dom';
import Loading from '../../../../components/Loading/Loading';
import eventBus from '../../../../services/eventBus';
import { t } from 'i18next';

const Members = () => {

  const [groupMembersBody, setGroupMembersBody] = React.useState<{style: string, value: string}[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    const getGroupMembers = async (groupId: string) => {
      try {
        const groupMembers = await getGroupMemberListByGroupId(+groupId);

        if (!groupMembers) {
          eventBus.emit('error', {message: t('messages.errorMembersFetching'), isDialog: true});
          return;
        }
        
        const styles = ['font-medium dark:text-[--color-font]', 'dark:text-[--color-font]', 'text-right dark:text-[--color-font]'];
        const groupMembersStructuredData = groupMembers.map(row => [
          { style: styles[0], value: row.username.toString() },
          { style: styles[1], value: row.joinDate },
          { style: styles[2], value: row.role.toString() }
        ]);
        
        setGroupMembersBody(groupMembersStructuredData || []);
        
      } catch (error) {
        eventBus.emit('error', {message: t('messages.errorFetching'), isDialog: true});
      } finally {
        setLoading(false);
      }
    };

    getGroupMembers(location.pathname.split('/')[2]);
  }, [location.pathname]);

  if (loading) {
    return <Loading isLoading={loading} />;
  }


  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='w-3/4'>
        <TableComponent 
        title={'groupMember.members'}
        header={[
          {text: 'groupMember.username', style: 'w-[100px] dark:text-[--color-font]'}, 
          {text: 'groupMember.joinedAt', style: 'dark:text-[--color-font]'}, 
          {text: 'groupMember.role', style: 'text-right dark:text-[--color-font]'}
        ]}
        body = {
          groupMembersBody
        }/>
      </div>
    </div>
  )
}

export default Members