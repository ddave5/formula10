import React, { ReactNode, useEffect, useRef, useState } from 'react'
import TableComponent from '../../../../../components/table/TableComponent';
import Loading from '../../../../../components/Loading/Loading';
import eventBus from '../../../../../services/eventBus';
import { getGroupMemberListByGroupId, leaveGroup, promoteMember } from '../../../../../services/groupmember.service';
import { t } from 'i18next';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const ModifyMembersComponent = ({groupId} : {groupId: number}) => {
  
    const [groupMembersBody, setGroupMembersBody] = React.useState<{style: string, value: string | ReactNode}[][]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    const location = useLocation();

    const promote = async (userId: number) => {
      try {
        if (groupId === 0 ) {
          throw new Error('Invalid group ID');
        }

        const response = await promoteMember(groupId, userId);
        if (response) {
          eventBus.emit('success', {message: t('groupMember.promoteSuccess'), isDialog: false });
        }
      } catch (error) {
        console.error('Failed to leave group:', error);
      }
    }

    const kick = async (userId: number) => {
      try {
        if (groupId === 0 ) {
          throw new Error('Invalid group ID');
        }

        const response = await leaveGroup(groupId, userId);
        if (response) {
          eventBus.emit('success', {message: t('groupMember.kickSuccess'), isDialog: false });
        }
      } catch (error) {
        console.error('Failed to leave group:', error);
      }
    }
  
    const tRef = useRef(t);
    useEffect(() => {
      const getGroupMembers = async (groupId: string) => {
        try {
          const groupMembers = await getGroupMemberListByGroupId(+groupId);
  
          if (!groupMembers) {
            setError('Failed to fetch race data');
            return;
          }
          
          const styles = ['font-medium dark:text-[--color-font]', 'dark:text-[--color-font]', 'text-right dark:text-[--color-font]'];
          const groupMembersStructuredData = groupMembers.map(row => [
            { style: styles[0], value: row.username.toString() },
            { style: styles[1], value: row.joinDate },
            { style: styles[2], value: row.role.toString() },
            { style: 'max-w-[100px]', value: (
              <>
                {row.role === 'MEMBER' && (
                  <div className='flex gap-2'>
                    <Button variant='contained' onClick={() => promote(row.id)}>{t('manageGroup.promote')}</Button>
                    <Button variant='contained' color='error' onClick={() => kick(row.id)}>{t('manageGroup.kick')}</Button>
                  </div>
                )}
              </>
            )},
          ]);
          
          setGroupMembersBody(groupMembersStructuredData || []);
          
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
            {text: 'groupMember.joinedAt', style: 'dark:text-[--color-font]'}, 
            {text: 'groupMember.role', style: 'text-right dark:text-[--color-font]'},
            {style: 'max-w-[100px]'} 
          ]}
          body = {
            groupMembersBody
          }/>
        </div>
      </div>
    )
}

export default ModifyMembersComponent