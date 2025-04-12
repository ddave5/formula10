import React from 'react'
import Pilot from  './Pilot.svg'
import PilotBlack from './Pilot_Black.svg'
import PilotWhite from './Pilot_white.svg'
import { useTheme } from '../../Theme/ThemeContext'

const Player = () => {

  const {theme} = useTheme();
  return (
    <img src={theme === 'dark' ? PilotWhite : PilotBlack} alt="user" className='w-6 h-6 dark:text-white'/>
  )
}

export default Player