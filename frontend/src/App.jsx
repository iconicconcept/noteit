import {Routes, Route} from "react-router"
import Home from "./pages/Home"
import Create from "./pages/Create"
import NoteDetail from "./pages/NoteDetail"


const App = () => {
  return (
    <div>
      {/* <div className="absolute inset-0 z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"></div>/> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/detail/:id" element={<NoteDetail />}/>
      </Routes>
    </div>
  )
}

export default App