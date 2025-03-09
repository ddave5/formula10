import { useEffect, useState } from 'react'
import TableComponent from '../../components/table/TableComponent'
import { useTranslation } from 'react-i18next';

const Points = () => {

  const racePosition = Array.from({ length: 20 }, (_, i) => i + 1);
  const sprintRacePosition = Array.from({ length: 5 }, (_, i) => i + 3);
  const racePoints = [1, 2, 4, 6, 8, 10, 12, 15, 18, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0];
  const sprintRacePoints = [4, 6, 8, 6, 4];

  const [raceBody, setRaceBody] = useState<{style: string, value: string}[][]>([]);
  const [sprintRaceBody, setSprintRaceBody] = useState<{style: string, value: string}[][]>([]);

  const { t } = useTranslation();

  useEffect( () => {

    const raceMatrix = racePosition.map((pos, index) => [pos, racePoints[index]]);
    const newRaceBody = raceMatrix.map((row) => [
      { value: row[0].toString(), style: 'dark:text-[--color-font]' },
      { value: row[1].toString(), style: 'dark:text-[--color-font]' },
    ]);
    setRaceBody(newRaceBody);

    const sprintMatrix = sprintRacePosition.map((pos, index) => [pos, sprintRacePoints[index]]);
    const newSprintRaceBody = sprintMatrix.map((row) => [
      { value: row[0].toString(), style: 'dark:text-[--color-font]' },
      { value: row[1].toString(), style: 'dark:text-[--color-font]' },
    ]);
    setSprintRaceBody(newSprintRaceBody);
  }, []);

  return (
    <> 
        <h1 className='text-2xl font-bold my-8 text-center'>{t('points.pointsTitle')}</h1>
        <div className='container mx-auto p-4 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <TableComponent 
            title={'points.racePoints'} 
            header={[{text: 'points.position', style: 'dark:text-[--color-font]'}, {text: 'points.points', style: 'dark:text-[--color-font]'}]} 
            body={
              raceBody
            }/>
          <TableComponent 
            title={'points.sprintRacePoints'} 
            header={[{text: 'points.position', style: 'dark:text-[--color-font]'}, {text: 'points.points', style: 'dark:text-[--color-font]'}]} 
            body={
              sprintRaceBody
            }/>
        </div>
    </>
  )
}

export default Points