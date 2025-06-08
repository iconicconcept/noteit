import { useEffect, useState } from "react"
import Header from "../components/Header"
import RateLimitedUi from "../components/RateLimitedUi"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import NoteAvailability from "../components/NoteAvailability"
import { LoaderIcon } from "lucide-react"

const Home = () => {
  const [isRateLimited, setIsRateLimted] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNote = async ()=>{
      try{
        // const res = await fetch("https://localhost:5001/api/notes")
        // const data = await res.json()
        // console.log(data);
        const res = await axiosInstance.get("/notes");
        console.log(res.data);
        setNotes(res.data)
        setIsRateLimted(false)

      } catch(error){
        console.error("Error fetching notes", error)
        console.log(error);    
        if(error.response?.status === 429){
          setIsRateLimted(true)
        } else{
          toast.error("Fail to load Notes")
        }
      } finally{
        setLoading(false)
      }
    }

    fetchNote();
  }, [])

  return (
    <div className="min-h-screen bg-green-700">
      <Header />

      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6 text-white">
        {loading && <div className="w-full flex justify-center">
            <div className="text-center text-gray-200 py-10 flex gap-2 font-mono"><LoaderIcon className='animate-spin size-5'/>Loading notes...</div>
          </div>}

        {notes.length === 0 && !isRateLimited && <NoteAvailability />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {notes.map(note =>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Home