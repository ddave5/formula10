import React, { useEffect, useState } from 'react'
import { getActiveDriverList } from '../../../../services/driver.service';
import { getNextRace } from '../../../../services/race.service';
import type { RaceDTO } from '../../../../dto/race.dto';
import DriverCard from './driver-card/DriverCard';
import Loading from '../../../../components/Loading/Loading';
import type { DriverDTO } from '../../../../dto/drivers.dto';
import { createTip, getUserTips, updateTip } from '../../../../services/tip.service';
import type { RootState } from '../../../../redux/Store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { TipDTO } from '../../../../dto/tip.dto';
import { Button, Card, CardContent, CardHeader, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import eventBus from '../../../../services/eventBus';
import { RiTimeLine } from "react-icons/ri";

const Tip = () => {

  const SPRINT = 'SPRINT';
  const RACE = 'RACE';

  const [drivers, setDrivers] = useState<DriverDTO[]>([]);
  const [race, setRace] = useState<RaceDTO | null>(null);
  const [selectedRaceType, setSelectedRaceType] = useState('');
  const [selectedDriverForSprint, setSelectedDriverForSprint] = useState<DriverDTO | null>(null);
  const [selectedDriverForRace, setSelectedDriverForRace] = useState<DriverDTO | null>(null);
  const [previousTips, setPreviousTips] = useState<TipDTO[]>([]);

  const [pageLoading, setPageLoading] = useState(true);

  const [isBettingDisabled, setIsBettingDisabled] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  const { t } = useTranslation();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const driverList = await getActiveDriverList();
        const nextRace = await getNextRace();
        const tips = await getUserTips(user?.id || 0, +location.pathname.split('/')[2], nextRace?.seasonId || 0, nextRace?.id || 0);

        setDrivers(driverList);
        setRace(nextRace);
        setPreviousTips(tips);

        if (nextRace && (!nextRace?.sprintQualifyingStart || !nextRace?.sprintRaceStart)) {
          setSelectedRaceType(RACE);
        }

        if (nextRace) {
          const now = new Date().getTime();
          const raceStart = new Date(nextRace.raceStart).getTime();
          const sprintStart = nextRace?.sprintQualifyingStart ? new Date(nextRace.sprintQualifyingStart).getTime() : null;
          const qualifyingStart = new Date(nextRace.qualifyingStart).getTime();
  
          const raceWindow = raceStart + 4 * 60 * 60 * 1000;
  
          const isSprintWeekend = sprintStart !== null && sprintStart !== undefined;
          const isClosed = isSprintWeekend
            ? sprintStart < now && raceWindow > now
            : qualifyingStart < now && raceWindow > now;
  
          setIsBettingDisabled(isClosed);
        }
        
        for (const tip of tips) {
          const tipDriver = driverList.find( (driver: DriverDTO) => driver.id === tip.driverId);
          if (tip.tipType === SPRINT) {
            setSelectedDriverForSprint(tipDriver ?? null);
          } else {
            setSelectedDriverForRace(tipDriver ?? null);
          }
        }
        setPageLoading(false);

      } catch (error) {
        eventBus.emit('error', {message: t('messages.errorUnknown'), isDialog: true});
        setPageLoading(false);
      }
    };
    fetchDatas();
  }, [location.pathname, user?.id, t]);

  

  const selectDriver = (driver: DriverDTO) => {
    if (selectedRaceType === SPRINT) {
      setSelectedDriverForSprint(driver);
    } else {
      setSelectedDriverForRace(driver);
    }
  } 

  const saveTip = async () => {
    try {
      setPageLoading(true);
  
      const selectedDriverId = selectedRaceType === SPRINT
        ? selectedDriverForSprint?.id
        : selectedDriverForRace?.id;
  
      if (!selectedDriverId) return;
  
      const existingTip = previousTips.find(t =>
        t.userId === user?.id &&
        t.seasonId === race?.seasonId &&
        t.raceId === race?.id &&
        t.tipType === (selectedRaceType === SPRINT ? 'SPRINT' : 'RACE')
      );
  
      if (existingTip) {
        const updatedTip: TipDTO = {
          ...existingTip,
          driverId: selectedDriverId,
          createdAt: new Date().toISOString()
        };
        const savedTip = await updateTip(existingTip.id, updatedTip);
  
        const updatedTips = previousTips.map(t => t.id === savedTip.id ? savedTip : t);
        setPreviousTips(updatedTips);

      } else {
        const newTip: TipDTO = {
          id: 0,
          userId: user?.id || 0,
          groupId: +location.pathname.split('/')[2],
          seasonId: race?.seasonId || 0,
          raceId: race?.id || 0,
          driverId: selectedDriverId,
          tipType: selectedRaceType,
          createdAt: new Date().toISOString()
        };

        const savedTip = await createTip(newTip);
        setPreviousTips([...previousTips, savedTip]);
      }
  
      eventBus.emit('success', { message: t('messages.successTip') });
      setSelectedRaceType('');
    } catch (error) {
      eventBus.emit('error', { message: t('messages.errorUnknown'), isDialog: true });
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading) {
    return <Loading isLoading={pageLoading} />
  }

  return (
    <div>
      {isBettingDisabled && (
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
          <Card className="w-full max-w-md border-2 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-900 dark:text-white">
            <CardHeader className="pb-2" title={t('tip.bettingClosedTitle')} avatar={<RiTimeLine />}>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-base">
                  <p>{t('tip.bettingClosedDescription')}</p>
                </div>
                <LinearProgress variant="determinate" value={new Date().getTime() / (new Date(race?.raceStart || '').getTime() + (4*60*60*1000))} />
              </div>
            </CardContent>
          </Card>
      </div>
      )}
      {!isBettingDisabled && (
        <>
          {race?.sprintQualifyingStart && race?.sprintRaceStart && !isBettingDisabled && (
              <div className='w-full flex flex-col justify-center items-center my-4'>
                <h2 className='text-2xl'>{t('tip.chooseType')}</h2>
                <div className='mt-4 w-full flex justify-center'>
                  <Button
                    variant={selectedRaceType === SPRINT ? 'contained' : 'outlined'}
                    onClick={() => setSelectedRaceType(SPRINT)}
                    sx={{ marginRight: '2rem' }}
                  >
                    {t('tip.sprint')}
                  </Button>
                  <Button
                    variant={selectedRaceType === RACE ? 'contained' : 'outlined'}
                    onClick={() => setSelectedRaceType(RACE)}
                  >
                    {t('tip.race')}
                  </Button>
                </div>
              </div>
            )
          }
          {
            ( (race?.sprintQualifyingStart && selectedRaceType !== '') || (race?.sprintQualifyingStart == null) ) && (
              <>
                <div className='mb-8'>
                  <p className='text-2xl xl:text-4xl title-font w-full text-center whitespace-nowrap dark:text-white my-8'>{t('tip.chooseDriver')}</p>
                  {Array.from({ length: (drivers.length / 2) }, (_, index) => (index * 2)).map((_, index) => {
                    const firstDriver = drivers[index * 2];
                    const secondDriver = drivers[index * 2 + 1];
    
                    return (
                      <div className='flex justify-center lg:h-[200px]'key={`pair-${firstDriver?.id}-${secondDriver?.id}`}>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-5/6 md:w-2/3 lg:w-5/6 2xl:w-2/3 lg:relative'>
                          <div className='lg:w-[calc(50%-8px)] lg:absolute lg:top-0'>
                            <DriverCard 
                              key={firstDriver.id}
                              driver={drivers[_]} 
                              selected={selectedRaceType === SPRINT ? selectedDriverForSprint?.name === drivers[_].name : selectedDriverForRace?.name === drivers[_].name} 
                              selectFn={() => selectDriver(drivers[_])}/>
                          </div>
                          <div className='lg:w-[calc(50%-8px)] lg:absolute lg:bottom-0 lg:right-0' key={drivers[_].id}>
                            <DriverCard 
                              key={secondDriver.id}
                              driver={drivers[_ + 1]} 
                              selected={selectedRaceType === SPRINT ? selectedDriverForSprint?.name === drivers[_+1].name : selectedDriverForRace?.name === drivers[_+1].name} 
                              selectFn={() => selectDriver(drivers[_ + 1])}/>
                          </div>
                        </div>
                      </div>
                    )})}
                </div>
                <div className='flex justify-center mb-8'>
                  <Button variant="contained" onClick={saveTip} disabled={selectedRaceType === SPRINT ? !selectedDriverForSprint : !selectedDriverForRace}>{t('tip.saveTip')}</Button>
                </div>
              </>
            )
          }
        </>
      )}
    </div>
  )
}

export default Tip