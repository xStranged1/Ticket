import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Tickets from './routes/Tickets'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
import CreateTicket from './routes/CreateTicket'
import DetailTicket from './routes/DetailTicket'
import UserProfile from './routes/UserProfile'
import Support from './routes/Support'
import TicketForm from './routes/DetailTicket'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useColorScheme } from '@mui/material'
import { darkTheme, lightTheme } from './const/colors'

function App() {

  // Recordar que tickets necesita barra de busqueda(Relacionados),
  // Campana de notis (TU TICKET A SIDO REVISADO (HORARIO) podes apretar la noti y te lleva al ticket
  // boton eliminar con confirmacion, y podemos agregar un zoom al pasar el mouse sobre una tarjeta 
  const { mode } = useColorScheme()

  return (
    <>
      <ThemeProvider theme={mode == 'dark' || mode == 'system' ? darkTheme : lightTheme}>
        <CssBaseline /> {/* Aplica los estilos globales */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/create' element={<CreateTicket />} />
          <Route path='/ticket/:id' element={<DetailTicket />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/support' element={<Support />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  )

}




export default App
