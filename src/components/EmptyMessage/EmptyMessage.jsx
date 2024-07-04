import React from 'react'

const EmptyMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <h6 className="text-lg text-slate-400">{message}</h6>
    </div>
  )
}

export default EmptyMessage
