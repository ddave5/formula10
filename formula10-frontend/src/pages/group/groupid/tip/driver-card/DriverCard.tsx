import { Divider } from '@mui/material'
import type { DriverDTO } from '../../../../../dto/drivers.dto'
import { useTheme } from '../../../../../layout/navbar/Theme/ThemeContext'

const DriverCard = ({driver, selected = false, selectFn} : {driver: DriverDTO, selected?: boolean, selectFn: () => void}) => {

    const {theme} = useTheme();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectFn();
        }
      };

    return (
        <div 
            className={`bg-gradient-to-b from-white dark:from-black from-40% ${selected ? 'to-red-500 dark:to-red-500' : (theme === "dark" ? 'to-white' : 'to-black')} p-1 select-none`} 
            onClick={() => selectFn()} onKeyDown={handleKeyDown}>
            <div className='bg-white dark:bg-gray-500 xl:h-[150px] grid grid-cols-5 gap-2'>
                <div className='col-span-2 max-h-[150px] flex items-center'>
                    <img src={`/assets/drivers/${driver.name}.avif`} alt={`${driver.name}`} className='h-full'/> 
                </div>
                <div className='col-span-3 flex flex-col justify-center h-full'>
                    <h1 className='text-lg sm:text-xl xl:text-2xl title-font mb-4'>{driver.name} ({driver.raceNumber})</h1>
                    <Divider className='w-5/6'/>
                    <h3 className='xl:text-md text-gray-400 mt-2'>{driver.constructorName}</h3>
                </div>
            </div>
        </div>
        
    )
}

export default DriverCard