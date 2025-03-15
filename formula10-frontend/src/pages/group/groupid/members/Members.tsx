import React, { useEffect, useState } from 'react'
import TableComponent from '../../../../components/table/TableComponent'
import { getGroupMemberListByGroupId } from '../../../../services/groupmember.service';
import { useLocation } from 'react-router-dom';
import Loading from '../../../../components/Loading/Loading';

const Members = () => {

  const [groupMembersBody, setGroupMembersBody] = React.useState<{style: string, value: string}[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        const groupId = location.pathname.split('/')[2];
        const groupMembers = await getGroupMemberListByGroupId(+groupId);

        if (!groupMembers) {
          setError('Failed to fetch race data');
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
        console.error('Error fetching data:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to fetch data'
        );
      } finally {
        setLoading(false);
      }
    };

    getGroupMembers();
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