import { useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router'

import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

const NoteDetail = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(()=>{
    const fetchNote = async ()=>{
      try {
        const res = await axiosInstance.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.error("Error in fetching note", error);
        toast.error("Fail to fetch the note")
      } finally {
        setLoading(false)
      };
    }

    fetchNote();
  }, [id])

  const handleDelete = async ()=>{
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/")
    } catch (error) {
      console.log("Error deleting this note", error);
      console.error("Fail to delete note");
    }
  };

  const handleSave = async ()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title & content");
      return
    }
    if(!window.confirm("You want the note to be updated?")) return;

    setSaving(true)
    try {
      await axiosInstance.put(`/notes/${id}`, note)
      toast.success("Note updated Successfully!")
      navigate("/")
    } catch (error) {
      console.log("Error saving note", error);
      console.error("Fail to update note");
      
    }
  }

  if (loading){
    return (
      <div className='min-h-screen flex bg-green-900 items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 text-white'/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-950">
      <div className="mx-auto py-8 px-4 container">
        <div className="max-w-2xl mx-auto">
          
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className="btn text-white cursor-pointer mb-6 flex items-center gap-1 hover:border hover:border-green-900 px-3 py-1 rounded-full">
              <ArrowLeftIcon className="size-4"/>
              <span className="tracking-tight">Back</span>
            </Link>
            <button className="btn border border-red-500 hover:bg-red-500 text-[14px] rounded-full px-2 py-1 text-white flex items-center gap-1" onClick={handleDelete}>
              <Trash2Icon className='h-4 w-4'/>
              Delete Note
            </button>
          </div>

          <div className="card w-full rounded-[10px] bg-green-900 text-white">
            <div className="card-body p-5">
              <div className="form-control mb-4 flex flex-col gap-2">
                  <label htmlFor="title">Title</label>
                  <input type="text"
                    placeholder="Note title"
                    className="input border px-2 py-2 rounded-[9px]"
                    value={note.title}
                    onChange={(e)=> setNote({...note, title: e.target.value})}
                  />
                </div>

                <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                  <label htmlFor="title">Content</label>
                  <textarea type="text"
                    placeholder="Write your note here..."
                    className="input border px-2 py-1 rounded-[9px] max-h-25 min-h-25"
                    value={note.content}
                    onChange={(e)=> setNote({...note, content: e.target.value})}
                  />
                </div>

                <div className="card-action flex justify-end bg-green mt-10">
                  <button type="submit" className="btn bg-green-500 font-medium rounded-full px-3 py-2 text-green-950 tracking-tight" disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save Note"}
                  </button>
                </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default NoteDetail