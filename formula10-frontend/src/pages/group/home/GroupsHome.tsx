import React from 'react'
import { Link } from 'react-router-dom'

const GroupsHome = () => {
  return (
    <div className='grid grid-cols-[15%_85%]'>
        <div className='bg-blue-500 h-screen'>
          <div>
            <Link to="/groups/create">Create groups</Link>
          </div>
        </div>
        <div className='bg-red-500 h-screen'>GroupsHome</div>
    </div>
  )
}

export default GroupsHome