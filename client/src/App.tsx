import { Routes, Route } from 'react-router-dom'
import AdminPage from './layout/AdminPage'
import Home from './layout/Home'
// import Login from './layout/Login'
import NotFound from './layout/NotFound'
import Register from './layout/Register'

const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/login" element={<Login />}/> */}
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="*" element={<NotFound />} />
    </Routes>
)

export default App
