import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Password'}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {showPassword ? (
        <FaRegEye
          onClick={handleShowPassword}
          size={22}
          className="text-primary cursor-pointer"
        />
      ) : (
        <FaRegEyeSlash
          onClick={handleShowPassword}
          size={22}
          className="text-slate-400 cursor-pointer"
        />
      )}
    </div>
  )
}

export default PasswordInput