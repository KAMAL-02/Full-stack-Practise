import {useState} from 'react'
import axios from 'axios'

const AddTask = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        console.log(title, description, isCompleted);
        try {
            const response = await axios.post('http://localhost:3000/add-task',{
                title,
                description,
                isCompleted
            })
            if(response.status === 201){
                console.log(response.data);
                setTitle('')
                setDescription('')
                setIsCompleted(false)
                setLoading(false)
            }else{
                console.log('Task not created', response.data);
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }

    }

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isCompleted" className="block text-sm font-medium text-gray-700">
            Completed
          </label>
          <input
            id="isCompleted"
            type="checkbox"
            className="mt-1 mr-2 leading-tight"
            checked={isCompleted}
            onChange={(e)=>setIsCompleted(e.target.checked)}
          />
          <span className="text-sm text-gray-600">Mark as completed</span>
          <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Loading...' : 'Add Task'}
        </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask
