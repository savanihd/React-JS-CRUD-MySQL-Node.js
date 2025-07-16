import { Routes, Route } from 'react-router-dom'
import './App.css'
import PostIndex from './PostIndex'
import PostCreate from './PostCreate'
import PostEdit from './PostEdit'
import PostShow from './PostShow'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<PostIndex />} />
        <Route path='/create' element={<PostCreate />} />
        <Route path='/edit/:id' element={<PostEdit />} />
        <Route path='/show/:id' element={<PostShow />} />
      </Routes>
    </>
  )
}

export default App
