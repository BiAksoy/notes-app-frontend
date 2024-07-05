import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: '',
  })

  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(false)

  const navigate = useNavigate()

  const handleEditNote = (note) => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data: note })
  }

  const showToastMessage = (message, type) => {
    setShowToast({ isShown: true, message, type })
  }

  const handleCloseToast = () => {
    setShowToast({ isShown: false, message: '' })
  }

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/users/me')
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes')
      setNotes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/notes/${noteId}`)
      showToastMessage('Note deleted successfully', 'delete')
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const onSearchNote = async (searchQuery) => {
    try {
      const response = await axiosInstance.get(
        `/notes/search?query=${searchQuery}`
      )
      setSearch(true)
      setNotes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const pinNote = async (noteId) => {
    try {
      await axiosInstance.put(`/notes/${noteId}/pin`)
      showToastMessage('Note updated successfully')
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearSearch = async () => {
    setSearch(false)
    getNotes()
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getUser()
      await getNotes()
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  const pinnedNotes = notes.notes.filter((note) => note.isPinned)
  const otherNotes = notes.notes.filter((note) => !note.isPinned)

  return (
    <>
      <Navbar
        user={user}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {pinnedNotes.length > 0 || otherNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEditNote(note)}
                onDelete={() => deleteNote(note._id)}
                onPinNote={() => pinNote(note._id)}
              />
            ))}

            {otherNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEditNote(note)}
                onDelete={() => deleteNote(note._id)}
                onPinNote={() => pinNote(note._id)}
              />
            ))}
          </div>
        ) : (
          <EmptyMessage
            message={
              search
                ? 'Oops! No notes found for your search.'
                : 'No notes here yet! Time to jot down your thoughts and ideas.'
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: 'add', data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: 'add', data: null })
          }
          getNotes={getNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home
