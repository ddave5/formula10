import React, { useEffect, useState } from 'react'
import { getDriverList } from '../../../../services/driver.service';
import { getNextRace } from '../../../../services/race.service';
import { RaceDTO } from '../../../../dto/race.dto';
import DriverCard from './driver-card/DriverCard';
import Loading from '../../../../components/Loading/Loading';
import { DriverDTO } from '../../../../dto/drivers.dto';
import { Button } from '@mui/material';
import { createTip, getUserTip, updateTip } from '../../../../services/tip.service';
import { RootState } from '../../../../redux/Store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TipDTO } from '../../../../dto/tip.dto';

const Tip = () => {

  const [drivers, setDrivers] = useState<DriverDTO[]>([]);
  const [race, setRace] = useState<RaceDTO | null>(null);
  const [selectedRaceType, setSelectedRaceType] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<DriverDTO | null>(null);
  const [previousTip, setPreviousTip] = useState<TipDTO | null>(null);

  const [pageLoading, setPageLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driverList = await getDriverList();
        const nextRace = await getNextRace();
        const tip = await getUserTip(user?.id || 0, +location.pathname.split('/')[2], nextRace?.seasonId || 0, nextRace?.id || 0);
        setDrivers(driverList);
        setRace(nextRace);
        if (tip) {
          const tipDriver = drivers.find(driver => driver.id === tip.driverId);
          setPreviousTip(tip);
          setSelectedDriver(tipDriver ? tipDriver : null);
        }
        setPageLoading(false);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchDrivers();
  }, []);

  const selectDriver = (driver: DriverDTO) => {
    setSelectedDriver(driver);
  } 

  const saveTip = async () => {
    try {
      setPageLoading(true);

      if (previousTip) {
        const tip =  {
          id: previousTip?.id,
          userId: previousTip?.userId ,
          groupId: previousTip?.groupId,
          seasonId: previousTip?.seasonId ,
          raceId: previousTip?.raceId,
          driverId: selectedDriver?.id || 0,
          createdAt: new Date().toISOString(),
          tipType: selectedRaceType ? selectedRaceType : 'race'
        }
        await updateTip(previousTip?.id, tip);

      } else {
        const tip =  {
          id: 0,
          userId: 0,
          groupId: +location.pathname.split('/')[2],
          seasonId: race?.seasonId || 0,
          raceId: race?.id || 0,
          driverId: selectedDriver?.id || 0,
          createdAt: new Date().toISOString(),
          tipType: selectedRaceType ? selectedRaceType : 'race'
        }
        const savedTip = await createTip(tip);
        setPreviousTip(savedTip);
      }
      console.log('Successfully saved tip');
      setSelectedDriver(null);
      setPageLoading(false);
    } catch (error) {
      console.error('Error saving tip:', error);
    }
    
  }

  if (pageLoading) {
    return <Loading isLoading={pageLoading} />
  }

  return (
    <div>
      {
        race?.sprintQualifyingStart && (
          <div className='w-full flex flex-col justify-center items-center my-4'>
            <h2 className='text-2xl'> Válasszon verseny típust!</h2>
            <div className='mt-4'>
              <Button onClick={() => setSelectedRaceType('sprint')}>Sprint</Button>
              <Button onClick={() => setSelectedRaceType('race')}>Race</Button>
            </div>
          </div>
        )
      }
      {
        ( (race?.sprintQualifyingStart && selectedRaceType !== '') || (race?.qualifyingStart == null) ) && (
          <>
            <div className='mb-8'>
              {Array.from({ length: (drivers.length / 2) }, (_, index) => (index * 2)).map((_, index) => (
                <div className='flex justify-center h-[200px]'>
                  <div className='grid grid-cols-2 gap-4 w-2/3 relative'>
                    <div className='w-[calc(50%-8px)] absolute top-0' key={drivers[_].id}>
                      <DriverCard driver={drivers[_]} selected={selectedDriver?.name === drivers[_].name} selectFn={() => selectDriver(drivers[_])}/>
                    </div>
                    <div className='w-[calc(50%-8px)] absolute bottom-0 right-0' key={drivers[_].id}>
                      <DriverCard driver={drivers[_ + 1]} selected={selectedDriver?.name === drivers[_ + 1].name} selectFn={() => selectDriver(drivers[_ + 1])}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-center mb-8'>
              <Button variant="contained" onClick={saveTip} disabled={!selectedDriver}>Tipp leadása</Button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Tip