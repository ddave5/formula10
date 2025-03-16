import { Divider } from '@mui/material'
import { DriverDTO } from '../../../../../dto/drivers.dto'

const DriverCard = ({driver, selected = false, selectFn} : {driver: DriverDTO, selected?: boolean, selectFn: Function}) => {


    return (
        <div className={`bg-gradient-to-b from-white from-40% ${selected ? 'to-red-500' : 'to-black'} to-black p-1 select-none`} onClick={() => selectFn()}>
            <div className='bg-white h-[150px] grid grid-cols-5 gap-2'>
                <div className='col-span-2 max-h-[150px] flex items-center'>
                    <img src={`/assets/drivers/${driver.name}.avif`} alt={`${driver.name}`} className='h-full'/> 
                </div>
                <div className='col-span-3 flex flex-col justify-center h-full'>
                    <h1 className='text-2xl title-font mb-4'>{driver.name} ({driver.raceNumber})</h1>
                    <Divider className='w-5/6'/>
                    <h3 className='text-md text-gray-400 mt-2'>{driver.constructorName}</h3>
                </div>
            </div>
        </div>
        
    )
}

export default DriverCard