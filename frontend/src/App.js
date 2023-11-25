import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './Componentes/InicioSesion'
import Menu from './Componentes/Menus/MenuPrincipal'
import MenuTercero from './Componentes/Menus/MenuTercero'
import MenuUsuario from './Componentes/Menus/MenuUsuario'
import MenuProducto from './Componentes/Menus/MenuProducto'
import MenuBodega from './Componentes/Menus/MenuBodega'
import MenuFactura from './Componentes/Menus/MenuFacturas'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/menu/tercero' element={<MenuTercero />}></Route>
          <Route path='/menu/usuario' element={<MenuUsuario />}></Route>
          <Route path='/menu/producto' element={<MenuProducto />}></Route>
          <Route path='/menu/bodega' element={<MenuBodega />}></Route>
          <Route path='/menu/factura' element={<MenuFactura />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
