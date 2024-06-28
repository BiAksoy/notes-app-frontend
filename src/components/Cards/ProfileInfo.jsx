import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ handleLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials('Bilal Aksoy')}
      </div>

      <div>
        <p className="text-sm font-medium">Bilal Aksoy</p>
        <button
          className="text-sm text-slate-700 underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
