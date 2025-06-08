import { NotebookIcon } from "lucide-react"
import { Link } from "react-router"

const NoteAvailability = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
        <div className="p-6 rounded-full bg-green-800">
            <NotebookIcon className="size-10 text-green-950"/>
        </div>
        <h3 className="text-2xl font-bold">No note available</h3>
        <p className="text-white">
            Ready to organize your thoughts? Create your first note to get started on your journey.
        </p>
        <Link to={"/create"}>
            <button className="btn bg-green-950 text-green-500 px-4 py-2 rounded-full">
                Create your First Note
            </button>
        </Link>
    </div>
  )
}

export default NoteAvailability