import React, { useEffect, useState } from 'react'
import TableComponent from '../../../../components/table/TableComponent';
import Loading from '../../../../components/Loading/Loading';
import eventBus from '../../../../services/eventBus';
import { useLocation } from 'react-router-dom';
import { getGroupAndSeasonStanding } from '../../../../services/standing.service';
import { t } from 'i18next';

const Standing = () => {
  const [standingBody, setStandingBody] = React.useState<{style: string, value: string}[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    const getGroupMembers = async (groupId: string) => {
      try {
        const standings = await getGroupAndSeasonStanding(+groupId);

        if (!standings) {
          eventBus.emit('error', {message: t('messages.errorMembersFetching'), isDialog: true});
          return;
        }
        
        const styles = ['font-medium dark:text-[--color-font]', 'dark:text-[--color-font]', 'text-right dark:text-[--color-font]'];
        const standingStructuredData = standings.map((row,index) => [
          { style: styles[0], value: (index + 1).toString() },
          { style: styles[1], value: row.username.toString() },
          { style: styles[2], value: row.totalPoints.toString() },
        ]);
        
        setStandingBody(standingStructuredData || []);
        
      } catch (error) {
        eventBus.emit('error', {message: t('messages.errorFetching'), isDialog: true});
        setError(
          error instanceof Error ? error.message : 'Failed to fetch data'
        );
      } finally {
        setLoading(false);
      }
    };

    getGroupMembers(location.pathname.split('/')[2]);
  }, [location.pathname]);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='w-full lg:w-3/4'>
        <TableComponent 
        title={'standing.title'}
        header={[
          {text: 'standing.position', style: 'md:w-[100px] dark:text-[--color-font]'}, 
          {text: 'standing.username', style: 'dark:text-[--color-font]'}, 
          {text: 'standing.totalPoints', style: 'dark:text-[--color-font]'}, 
        ]}
        body = {
          standingBody
        }/>
      </div>
    </div>
  )
}

export default Standing