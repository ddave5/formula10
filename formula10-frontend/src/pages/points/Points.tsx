import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/table/TableComponent'

const Points = () => {

  const racePosition = Array.from({ length: 20 }, (_, i) => i + 1);
  const sprintRacePosition = Array.from({ length: 5 }, (_, i) => i + 3);
  const racePoints = [1, 2, 4, 6, 8, 10, 12, 15, 18, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0];
  const sprintRacePoints = [4, 6, 8, 6, 4];

  const [raceBody, setRaceBody] = useState<{style: string, value: string}[][]>([]);
  const [sprintRaceBody, setSprintRaceBody] = useState<{style: string, value: string}[][]>([]);

  useEffect( () => {

    const raceMatrix = racePosition.map((pos, index) => [pos, racePoints[index]]);
    const newRaceBody = raceMatrix.map((row) => [
      { value: row[0].toString(), style: '' },
      { value: row[1].toString(), style: '' },
    ]);
    setRaceBody(newRaceBody); // Állapot frissítése

    // Sprintverseny pozíció és pontok mátrix létrehozása
    const sprintMatrix = sprintRacePosition.map((pos, index) => [pos, sprintRacePoints[index]]);
    const newSprintRaceBody = sprintMatrix.map((row) => [
      { value: row[0].toString(), style: '' },
      { value: row[1].toString(), style: '' },
    ]);
    setSprintRaceBody(newSprintRaceBody); // Állapot frissítése
  }, []);

  return (
    <div className=''> 
        <h1>Points</h1>
        <div>
          <TableComponent 
            title={'points'} 
            header={[{text: 'points.position', style: 'w-1/3'}, {text: 'points.points', style: 'w-1/3'}]} 
            body={
              raceBody
            }/>
          <TableComponent 
            title={'sprintRace'} 
            header={[{text: 'points.position', style: 'w-1/3'}, {text: 'points.points', style: 'w-1/3'}]} 
            body={
              sprintRaceBody
            }/>
        </div>
    </div>
  )
}

export default Points