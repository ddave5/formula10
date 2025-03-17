import React, { useEffect, useState } from 'react'
import { getDriverList } from '../../../../services/driver.service';
import { getNextRace } from '../../../../services/race.service';
import { RaceDTO } from '../../../../dto/race.dto';
import DriverCard from './driver-card/DriverCard';
import Loading from '../../../../components/Loading/Loading';
import { DriverDTO } from '../../../../dto/drivers.dto';
import { Button } from '@mui/material';
import { createTip, getUserTips, updateTip } from '../../../../services/tip.service';
import { RootState } from '../../../../redux/Store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TipDTO } from '../../../../dto/tip.dto';

const Tip = () => {

  const [drivers, setDrivers] = useState<DriverDTO[]>([]);
  const [race, setRace] = useState<RaceDTO | null>(null);
  const [selectedRaceType, setSelectedRaceType] = useState('');
  const [selectedDriverForSprint, setSelectedDriverForSprint] = useState<DriverDTO | null>(null);
  const [selectedDriverForRace, setSelectedDriverForRace] = useState<DriverDTO | null>(null);
  const [previousTips, setPreviousTips] = useState<TipDTO[]>([]);

  const [pageLoading, setPageLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const driverList = await getDriverList();
        const nextRace = await getNextRace();
        const tips = await getUserTips(user?.id || 0, +location.pathname.split('/')[2], nextRace?.seasonId || 0, nextRace?.id || 0);
        setDrivers(driverList);
        setRace(nextRace);
        setPreviousTips(tips);
        if (tips.length > 0) {
          tips.map( (tip: TipDTO) => {
            const tipDriver = driverList.find((driver: DriverDTO) => driver.id === tip.driverId);
            
            if (tip.tipType === 'SPRINT') {
              setSelectedDriverForSprint(tipDriver ? tipDriver : null);
            } else {
              setSelectedDriverForRace(tipDriver ? tipDriver : null);
            }
          });
        }
        setPageLoading(false);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchDatas();
  }, []);

  const selectDriver = (driver: DriverDTO) => {
    if (selectedRaceType === 'SPRINT') {
      setSelectedDriverForSprint(driver);
    } else {
      setSelectedDriverForRace(driver);
    }
  } 

  const saveTip = async () => {
    try {
      setPageLoading(true);

      let isSaved = false;
      let prevTips: TipDTO[] = [];

      if (previousTips.length > 0) {

        previousTips.map( async (tip) => {
          if (tip.tipType === selectedRaceType) {
            isSaved = true;
            let savedTip = await modifyTip(tip);
            prevTips.push(savedTip);
          } else {
            prevTips.push(tip);
          }
        });
      }

      if (!isSaved) {
        await createNewTip();
      }

      setPreviousTips(prevTips);
      console.log('Successfully saved tip');
      setSelectedRaceType('');
      setPageLoading(false);
    } catch (error) {
      console.error('Error saving tip:', error);
    }
    
  }

  const modifyTip = async (prevTip: TipDTO) => {
    const tip =  {
      id: prevTip?.id,
      userId: prevTip?.userId ,
      groupId: prevTip?.groupId,
      seasonId: prevTip?.seasonId ,
      raceId: prevTip?.raceId,
      driverId: selectedRaceType === 'SPRINT' ? selectedDriverForSprint?.id || 0 : selectedDriverForRace?.id || 0,
      createdAt: new Date().toISOString(),
      tipType: selectedRaceType ? selectedRaceType : 'race'
    }
    const savedTip = await updateTip(prevTip?.id, tip);
    return savedTip;
  }

  const createNewTip = async () => {
    const tip =  {
      id: 0,
      userId: user?.id || 0,
      groupId: +location.pathname.split('/')[2],
      seasonId: race?.seasonId || 0,
      raceId: race?.id || 0,
      driverId: selectedRaceType === 'SPRINT' ? selectedDriverForSprint?.id || 0 : selectedDriverForRace?.id || 0,
      createdAt: new Date().toISOString(),
      tipType: selectedRaceType ? selectedRaceType : 'race'
    }
    const savedTip = await createTip(tip);
    return savedTip;
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
              <Button 
                variant={selectedRaceType === 'SPRINT' ? 'contained' : 'outlined'} 
                onClick={() => setSelectedRaceType('SPRINT')}
                sx={{
                  marginRight: '2rem', 
                  backgroundColor: selectedRaceType === 'SPRINT' ? '#1976d2' : '#fff', 
                  color: selectedRaceType === 'SPRINT' ? '#fff' : '#1976d2'
                }}>Sprint</Button>
              <Button 
                variant={selectedRaceType === 'RACE' ? 'contained' : 'outlined'}
                onClick={() => setSelectedRaceType('RACE')}
                sx={{
                  marginRight: '2rem', 
                  backgroundColor: selectedRaceType === 'RACE' ? '#1976d2' : '#fff', 
                  color: selectedRaceType === 'RACE' ? '#fff' : '#1976d2'
                }}>Race</Button>
            </div>
          </div>
        )
      }
      {
        ( (race?.sprintQualifyingStart && selectedRaceType !== '') || (race?.qualifyingStart == null) ) && (
          <>
            <div className='mb-8'>
              {Array.from({ length: (drivers.length / 2) }, (_, index) => (index * 2)).map((_, index) => (
                <div className='flex justify-center h-[200px]' key={'line' + index}>
                  <div className='grid grid-cols-2 gap-4 w-2/3 relative'>
                    <div className='w-[calc(50%-8px)] absolute top-0'>
                      <DriverCard 
                        key={index + 30}
                        driver={drivers[_]} 
                        selected={selectedRaceType === 'SPRINT' ? selectedDriverForSprint?.name === drivers[_].name : selectedDriverForRace?.name === drivers[_].name} 
                        selectFn={() => selectDriver(drivers[_])}/>
                    </div>
                    <div className='w-[calc(50%-8px)] absolute bottom-0 right-0' key={drivers[_].id}>
                      <DriverCard 
                        key={index}
                        driver={drivers[_ + 1]} 
                        selected={selectedRaceType === 'SPRINT' ? selectedDriverForSprint?.name === drivers[_+1].name : selectedDriverForRace?.name === drivers[_+1].name} 
                        selectFn={() => selectDriver(drivers[_ + 1])}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-center mb-8'>
              <Button variant="contained" onClick={saveTip} disabled={selectedRaceType === 'SPRINT' ? !selectedDriverForSprint : !selectedDriverForRace}>Tipp leadása</Button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Tip