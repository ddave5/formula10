import React, { useEffect, useRef, useState } from 'react'
import { currentSeasonConstuctorStanding, currentSeasonStanding } from '../../../services/season-data.service';
import DateCard from '../../../components/dateCard/DateCard';
import Loading from '../../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { getNextRace } from '../../../services/race.service';
import { RaceDTO } from '../../../dto/race.dto';
import { useTranslation } from 'react-i18next';
import TableComponent from '../../../components/table/TableComponent';


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
        const comparisonDate = new Date('2025-04-17T00:00:00');
        const seasonYear = new Date() < comparisonDate ? 2024 : nextRace.seasonYear;

        if (!driverStandingsRef.current || !constructorStandingsRef.current) {
          const driverStandings = await currentSeasonStanding(seasonYear);
          const constructorStandings = await currentSeasonConstuctorStanding(seasonYear);
          
          const styles = ['font-medium dark:text-[--color-font]', 'dark:text-[--color-font]', 'text-right dark:text-[--color-font]'];
          const driverStructuredData = driverStandings.map(row => [
            { style: styles[0], value: row.position.toString() },
            { style: styles[1], value: row.driver },
            { style: styles[2], value: row.points.toString() }
          ]);

          const constructorStructuredData = constructorStandings.map(row => [
            { style: styles[0], value: row.position.toString() },
            { style: styles[1], value: row.constructor },
            { style: styles[2], value: row.points.toString() }
          ]);

          driverStandingsRef.current = driverStructuredData;
          constructorStandingsRef.current = constructorStructuredData;
        }
        
        setDriverStandingBody(driverStandingsRef.current || []);
        
        setConstructorStandingBody(constructorStandingsRef.current || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to fetch data'
        );
      } finally {
        setErgastLoading(false);
        setRaceLoading(false);
      }
    };

    getRaceData();
  }, []);

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