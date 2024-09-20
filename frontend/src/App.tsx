
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Book } from './pages/book'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
import { Dashboard } from './pages/Dashboard'

function App() {
  
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/book/:id' element={<Blog/>}></Route>
        <Route path='/book' element={<Book/>}></Route>
        <Route path='/publish' element={<Publish/>}></Route>
        <Route path='/' element={<Dashboard/>}></Route>
       </Routes>     
     </BrowserRouter>
    </>
  )
}

export default App
