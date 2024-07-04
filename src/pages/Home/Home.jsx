import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'

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
      const response = await axiosInstance.get('/user')
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
      await axiosInstance.delete(`/delete-note/${noteId}`)
      showToastMessage('Note deleted successfully', 'delete')
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNotes()
    getUser()
  }, [])

  return (
    <>
      <Navbar user={user} />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {notes.notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.createdAt}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => handleEditNote(note)}
              onDelete={() => deleteNote(note._id)}
              onPinNote={() => {}}
            />
          ))}
        </div>
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
