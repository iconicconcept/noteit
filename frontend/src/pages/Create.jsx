import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import axiosInstance from "../lib/axios"

const Create = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required!");
      return;
    }

    setLoading(true)
    try{
      await axiosInstance.post("/notes", {
        title,
        content
      });

      toast.success("Note created successfully!")
      navigate("/")
    } catch(error){
      console.error("Error Creating Note", error);
      if(error.response.status === 429){
        toast.error("Slow down!, You are creating notes too fast."), {
          duration: 4000
        }
      } else{
        toast.error("Fail to create Note")
      }
   
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-950">
      <div className="mx-auto py-8 px-4 container">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn text-white cursor-pointer mb-6 flex items-center gap-1 hover:border hover:border-green-900 w-max px-3 py-1 rounded-full">
            <ArrowLeftIcon className="size-4"/>
            <span className="tracking-tight">Back</span>
          </Link>

          <div className="card w-full rounded-[10px] bg-green-900 text-white">
            <div className="card-body p-5">
              <h2 className="text-2xl card-title mb-4">Create New Note</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4 flex flex-col gap-2">
                  <label htmlFor="title">Title</label>
                  <input type="text"
                    placeholder="Note title"
                    className="input border px-2 py-2 rounded-[9px]"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                  <label htmlFor="title">Content</label>
                  <textarea type="text"
                    placeholder="Write your note here..."
                    className="input border px-2 py-1 rounded-[9px] max-h-25 min-h-25"
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                  />
                </div>

                <div className="card-action flex justify-end bg-green mt-10">
                  <button type="submit" className="btn bg-green-500 font-medium rounded-full px-3 py-2 text-green-950 tracking-tight" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create