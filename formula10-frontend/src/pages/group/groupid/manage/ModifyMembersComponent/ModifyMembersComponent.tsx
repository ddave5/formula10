import React, { type ReactNode, useEffect, useRef, useState } from 'react'
import TableComponent from '../../../../../components/table/TableComponent';
import Loading from '../../../../../components/Loading/Loading';
import eventBus from '../../../../../services/eventBus';
import { getGroupMemberListByGroupId, leaveGroup, promoteMember } from '../../../../../services/groupmember.service';
import { t } from 'i18next';
import { Button } from '@mui/material';
import type { GroupMemberDTO } from '../../../../../dto/groupMember.dto';

const ModifyMembersComponent = ({groupId} : {groupId: number}) => {

    const groupMembers = useRef<GroupMemberDTO[]>([]);
  
    const [groupMembersBody, setGroupMembersBody] = React.useState<{style: string, value: string | ReactNode}[][]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const promote = async (groupMemberId: number) => {
      try {
        if (groupId === 0 ) {
          throw new Error('Invalid group ID');
        }

        const response = await promoteMember(groupMemberId);
        if (response) {
          groupMembers.current = groupMembers.current.map(member =>
            member.id === groupMemberId ? { ...member, role: 'ADMIN' } : member
          );
          eventBus.emit('success', {message: t('manageGroup.promoteSuccess')});
          makeGroupMemberBody();
        }
      } catch (error) {
        console.error('Failed to leave group:', error);
      }
    }

    const kick = async (groupMemberId: number) => {
      try {
        if (groupId === 0 ) {
          throw new Error('Invalid group ID');
        }

        const response = await leaveGroup(groupId, groupMemberId);
        if (response) {
          groupMembers.current = groupMembers.current.filter(member => member.id !== groupMemberId);
          eventBus.emit('success', {message: t('manageGroup.kickSuccess')});
          makeGroupMemberBody();
        }
      } catch (error) {
        console.error('Failed to leave group:', error);
      }
    }

    const makeGroupMemberBody = () => {
      if (!groupMembers) {
        setError('Failed to fetch race data');
        return;
      }
      
      const styles = ['font-medium dark:text-[--color-font]', 'dark:text-[--color-font]', 'text-right dark:text-[--color-font]'];
      const groupMembersStructuredData = groupMembers.current.map(row => [
        { style: styles[0], value: row.username.toString() },
        { style: styles[1], value: row.joinDate, hideIfMobileMode: true },
        { style: styles[2], value: row.role.toString() },
        { style: 'max-w-[100px]', value: (
          <>
            {row.role === 'MEMBER' && (
              <div className='flex gap-2 flex-col'>
                <Button variant='contained' onClick={() => promote(row.id)}>{t('manageGroup.promote')}</Button>
                <Button variant='contained' color='error' onClick={() => kick(row.id)}>{t('manageGroup.kick')}</Button>
              </div>
            )}
          </>
        )},
      ]);
      
      setGroupMembersBody(groupMembersStructuredData || []);
    }

    useEffect(() => {
      const fetchGroupMembers = async () => {
        try {
          groupMembers.current = await getGroupMemberListByGroupId(groupId);
          makeGroupMemberBody();
        } catch (error) {
          console.error('Failed to fetch group member data:', error);
          setError('Failed to fetch group member data');
        } finally {
          setLoading(false);
        }
      };
    
      fetchGroupMembers();
    }, [groupId]);

  
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
            {text: 'groupMember.joinedAt', style: 'dark:text-[--color-font]', hideIfMobileMode: true}, 
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