import { PercentSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"

import {formatDate} from "../lib/util"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id)=>{
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try{
      await axiosInstance.delete(`/notes/${id}`);
      setNotes((prev)=> prev.filter(note => note._id !== id)); // GET RID OF THE DELETED ONE IMMEDIATELY BEEN DELETED
      toast.success("Note deleted successfully")
    } catch(error){
      console.log("Error deleting the note", error);
      toast.error("Fail to delete note")
    }

  };

  return (
    <Link 
      to={`/detail/${note._id}`}
      className="card bg-green-950 hover:shadow-lg transition-all duration-200 border-t-5 border-solid border-green-900 rounded-[10px]"
    >
        <div className="card-body p-5">
            <h3 className="text-[22px] tracking-tight font-semibold font-mono text-green-500">{note.title}</h3>

            <p className="font-normal line-clamp-3 text-[16px]">{note.content}</p>

            <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-300">{formatDate(new Date(note.createdAt))}</span>
                <div className="flex items-center gap-2">
                    <PercentSquareIcon className="size-4 cursor-pointer" />
                    <button className="btn btn-xs text-red-700 cursor-pointer" onClick={(e)=> handleDelete(e, note._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div>

        </div>
    </Link>
  )
}

export default NoteCard