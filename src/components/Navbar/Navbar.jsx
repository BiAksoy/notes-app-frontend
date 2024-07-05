import React, { useState } from 'react'
import ProfileInfo from '../../components/Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = ({ user, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery('')
    handleClearSearch()
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {user && (
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      {user && <ProfileInfo user={user} onLogout={onLogout} />}
    </div>
  )
}

export default Navbar
