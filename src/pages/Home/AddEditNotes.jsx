import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({
  noteData,
  type,
  getNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || '')
  const [content, setContent] = useState(noteData?.content || '')
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState('')

  const addNewNote = async () => {
    try {
      await axiosInstance.post('/notes', {
        title,
        content,
        tags,
      })

      showToastMessage('Note added successfully')
      getNotes()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const editNote = async () => {
    try {
      await axiosInstance.put(`/notes/${noteData._id}`, {
        title,
        content,
        tags,
      })

      showToastMessage('Note updated successfully')
      getNotes()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError('Please enter a title')
      return
    }

    if (!content) {
      setError('Please enter a content')
      return
    }

    setError('')

    if (type === 'edit') {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  )
}

export default AddEditNotes
