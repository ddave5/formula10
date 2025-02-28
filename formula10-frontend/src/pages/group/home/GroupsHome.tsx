import React, { useEffect, useState } from 'react'
import { currentSeasonConstuctorStanding, currentSeasonStanding } from '../../../services/seasonDataService';
import { CurrentSeasonConstructorStainding, CurrentSeasonDriverStanding } from '../../../interfaces/groupHome/currentSeason';
import StandingTable from './standingTable/StandingTable';
import DateCard from './dateCard/DateCard';


const GroupsHome = () => {

  const [currentDriverStanding, setCurrentDriverStanding] = useState<CurrentSeasonDriverStanding[]>([]);
  const [currentConstructorStanding, setCurrentConstructorStanding] = useState<CurrentSeasonConstructorStainding[]>([]);

  useEffect(() => {
    // Versenyzők állásának lekérése
    currentSeasonStanding(2024)
      .then(standings => setCurrentDriverStanding(standings))
      .catch(error => {
        console.error('Error fetching driver standings:', error);
      });

    // Konstruktőrök állásának lekérése
    currentSeasonConstuctorStanding(2024)
      .then(standings => setCurrentConstructorStanding(standings))
      .catch(error => {
        console.error('Error fetching constructor standings:', error);
      });
  }, []);

  return (
    <div className='container mx-auto p-4 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
      <DateCard date={new Date()} title='Qualifying Date' />
      <DateCard date={new Date()} title='Race Date' />
      <StandingTable data={currentDriverStanding} type="driver" />
      <StandingTable data={currentConstructorStanding} type="constructor" />
    </div>
    
  );
}

export default GroupsHome