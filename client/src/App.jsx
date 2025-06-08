//Contiene la estructura de la app (rutas)
import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LandingPage from './components/landingp';

function App() {
  return (
    <Router>
      <nav>
        <Link to= "/"> Inicio</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
