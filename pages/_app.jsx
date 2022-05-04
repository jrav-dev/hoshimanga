import LayoutApp from '../components/LayoutApp'

// Importacion de CSS para Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

// CSS React Toastify
import 'react-toastify/dist/ReactToastify.css';

// Imporaciones CSS
import '../styles/Globals.css'
import '../styles/Header.css'
import '../styles/Formulario.css'
import '../styles/Paginacion.css'
import '../styles/Boton.css'

function MyApp({ Component, pageProps }) {
  return (
    <LayoutApp>
      <Component {...pageProps} />
    </LayoutApp>
  )
}

export default MyApp
