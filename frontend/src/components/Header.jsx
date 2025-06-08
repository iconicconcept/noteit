import {PlusIcon} from "lucide-react"
import { Link } from "react-router"

const Header = () => {
  return (
    <>
        <header className="w-full bg-green-950 border-b">
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl tracking-tight font-bold font-mono text-green-500">THINKBOARD</h1>
                    <div className="flex items-center gap-3">
                        <Link to={"/create"} className="px-3 py-2 cursor-pointer rounded-full flex items-center gap-2 bg-green-500">
                            <PlusIcon className="size-4" />
                            <span className="font-semibold text-10px">New Note</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header