import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
 import { store, persistor } from "./redux/store";
import "./styles/style.css"
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <BrowserRouter>
     <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate> </Provider>
    </BrowserRouter>

  </StrictMode>,
)
