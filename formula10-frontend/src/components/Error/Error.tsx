import React from 'react'

const Error = ({errorMessage} : {errorMessage: string}) => {
  return (
    <span className='text-[var(--color-font)] border-solid border-2 border-[var(--color-primary)] rounded-xl h-[3rem] flex justify-center items-center bg-[var(--color-primary-light)]'>{errorMessage}</span>
  )
}

export default Error