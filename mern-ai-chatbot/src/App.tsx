
import { Fragment } from 'react';
import { Routes ,Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Header from "./components/Header"
function App() {
  return (
    <Fragment>
      <Header />
     <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="*" element={<NotFound />} />


     </Routes>
    </Fragment>
   
  )
}

export default App