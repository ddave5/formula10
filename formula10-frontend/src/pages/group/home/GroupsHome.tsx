import React, { useEffect, useState } from 'react'
import { currentSeasonConstuctorStanding, currentSeasonStanding } from '../../../services/seasonDataService';
import { CurrentSeasonConstructorStainding, CurrentSeasonDriverStanding } from '../../../interfaces/groupHome/currentSeason';
import StandingTable from './standingTable/StandingTable';
import DateCard from './dateCard/DateCard';
import Loading from '../../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { getNextRace } from '../../../services/raceService';
import { RaceDTO } from '../../../dto/race.dto';
import { useTranslation } from 'react-i18next';


const GroupsHome = () => {

  const { t } = useTranslation();

  const [currentDriverStanding, setCurrentDriverStanding] = useState<CurrentSeasonDriverStanding[]>([]);
  const [currentConstructorStanding, setCurrentConstructorStanding] = useState<CurrentSeasonConstructorStainding[]>([]);
  const [race, setRace] = useState<RaceDTO | null>(null);

  const loading = useSelector((state: RootState) => state.groups.loading);
  const [ergastLoading, setErgastLoading] = useState<boolean>(true);
  const [raceLoading, setRaceLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        const driverStandings = await currentSeasonStanding(seasonYear);
        const constructorStandings = await currentSeasonConstuctorStanding(seasonYear);

        setCurrentDriverStanding(driverStandings);
        setCurrentConstructorStanding(constructorStandings);
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
        </>
      )}
      <StandingTable data={currentDriverStanding} type="driver" />
      <StandingTable data={currentConstructorStanding} type="constructor" />
    </div>
    
  );
}

export default GroupsHome