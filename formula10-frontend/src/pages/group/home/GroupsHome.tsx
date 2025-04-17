import React, { useEffect, useRef, useState } from 'react'
import DateCard from '../../../components/dateCard/DateCard';
import Loading from '../../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/Store';
import { getNextRace } from '../../../services/race.service';
import type { RaceDTO } from '../../../dto/race.dto';
import { useTranslation } from 'react-i18next';
import TableComponent from '../../../components/table/TableComponent';
import eventBus from '../../../services/eventBus';
import { getConstructorStanding, getDriverStanding } from '../../../services/standing.service';


const GroupsHome = () => {

  const { t } = useTranslation();

  const [race, setRace] = useState<RaceDTO | null>(null);
  const [driverStandingBody, setDriverStandingBody] = useState<{style: string, value: string}[][]>([]);
  const [constructorStandingBody, setConstructorStandingBody] = useState<{style: string, value: string}[][]>([]);

  const loading = useSelector((state: RootState) => state.groups.loading);
  const [ergastLoading, setErgastLoading] = useState<boolean>(true);
  const [raceLoading, setRaceLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const driverStandingsRef = useRef<{style: string, value: string}[][] | null>(null);
  const constructorStandingsRef = useRef<{style: string, value: string}[][] | null>(null);

  useEffect(() => {
    const getRaceData = async () => {
      try {
        const nextRace = await getNextRace();

        if (!nextRace) {
          setError('Failed to fetch race data');
          return;
        }

        setRace(nextRace);
        const comparisonDate = new Date('2025-03-17T00:00:00');
        const seasonYear = new Date() < comparisonDate ? 2024 : nextRace.seasonYear;

        if (!driverStandingsRef.current || !constructorStandingsRef.current) {
          const driverStandings = await getDriverStanding(seasonYear) || [];
          const constructorStandings = await getConstructorStanding(seasonYear) || [];
          
          const styles = ['font-medium dark:text-[--color-font]', 'dark:text-[--color-font]', 'text-right dark:text-[--color-font]'];
          const driverStructuredData = driverStandings.map(row => [
            { style: styles[0], value: row.position.toString() },
            { style: styles[1], value: row.driverName },
            { style: styles[2], value: row.point.toString() }
          ]);

          const constructorStructuredData = constructorStandings.map(row => [
            { style: styles[0], value: row.position.toString() },
            { style: styles[1], value: row.constructorName },
            { style: styles[2], value: row.point.toString() }
          ]);

          driverStandingsRef.current = driverStructuredData;
          constructorStandingsRef.current = constructorStructuredData;
        }
        
        setDriverStandingBody(driverStandingsRef.current || []);
        
        setConstructorStandingBody(constructorStandingsRef.current || []);

      } catch (error) {
        eventBus.emit('error', {message: t('messages.errorFetching')})
        setError(
          error instanceof Error ? error.message : 'Failed to fetch data'
        );
      } finally {
        setErgastLoading(false);
        setRaceLoading(false);
      }
    };

    getRaceData();
  }, [t]);

  if (ergastLoading || loading || raceLoading) {
    return <Loading isLoading={ergastLoading || loading || raceLoading } />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  return (
    <div className='container mx-auto p-4 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
      {race && (
        <>
          <DateCard date={new Date(race.qualifyingStart)} title={t('groupHome.qualifyingDate')} location={race.location}/>
          <DateCard date={new Date(race.raceStart)} title={t('groupHome.raceDate')} location={race.location}/>
          {race.sprintQualifyingStart && (
            <DateCard date={new Date(race.sprintQualifyingStart)} title={t('groupHome.sprintQualifyingDate')} location={race.location}/>
          )}
          {race.sprintRaceStart && (
            <DateCard date={new Date(race.sprintRaceStart)} title={t('groupHome.sprintRaceDate')} location={race.location}/>
          )}
        </>
      )}
      <TableComponent 
        title={'groupHome.driverStanding'}
        header={[
          {text: 'groupHome.position', style: 'w-[100px] dark:text-[--color-font]'}, 
          {text: 'groupHome.driver', style: 'dark:text-[--color-font]'}, 
          {text: 'groupHome.points', style: 'text-right dark:text-[--color-font]'}
        ]}
        body = {
          driverStandingBody
        }
      />
      <TableComponent 
        title={'groupHome.constructorStanding'}
        header={[
          {text: 'groupHome.position', style: 'w-[100px] dark:text-[--color-font]'}, 
          {text: 'groupHome.constructor', style: 'dark:text-[--color-font]'}, 
          {text: 'groupHome.points', style: 'text-right dark:text-[--color-font]'}
        ]}
        body = {
          constructorStandingBody
        }/>
    </div>
    
  );
}

export default GroupsHome