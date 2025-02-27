import React, { useEffect, useState } from 'react'
import { currentSeasonConstuctorStanding, currentSeasonStanding } from '../../../services/seasonDataService';
import { CurrentSeasonConstructorStainding, CurrentSeasonDriverStanding } from '../../../interfaces/groupHome/currentSeason';

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
    <div>
      <h2>Driver Standings</h2>
      <ul>
        {currentDriverStanding.map((driver, index) => (
          <li key={index}>
            <strong>Position:</strong> {driver.position} - 
            <strong> Driver:</strong> {driver.driver} - 
            <strong> Points:</strong> {driver.points}
          </li>
        ))}
      </ul>
      <h2>Constructor Standings </h2>
      <ul>
        {currentConstructorStanding.map((constructor, index) => (
          <li key={index}>
            <strong>Position:</strong> {constructor.position} - 
            <strong> Constructor:</strong> {constructor.constructor} - 
            <strong> Points:</strong> {constructor.points}
          </li>
        ))}
      </ul>
    </div>
    
  );
}

export default GroupsHome