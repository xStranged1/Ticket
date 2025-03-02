import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import Tickets from './routes/Tickets'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
import CreateTicket from './routes/CreateTicket'
import UserProfile from './routes/UserProfile'
import Support from './routes/Support'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material'
import { darkTheme, lightTheme } from './const/colors'
import { DetailTicket } from './routes/DetailTicket'

function App() {

  // Recordar que tickets necesita barra de busqueda(Relacionados),
  // Campana de notis (TU TICKET A SIDO REVISADO (HORARIO) podes apretar la noti y te lleva al ticket
  // boton eliminar con confirmacion, y podemos agregar un zoom al pasar el mouse sobre una tarjeta
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => prefersDarkMode ? darkTheme : lightTheme, [prefersDarkMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Aplica los estilos globales */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/create' element={<CreateTicket />} />
          <Route path='/ticket/:idTicket' element={<DetailTicket />} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/support' element={<Support />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  )

}




export default App
