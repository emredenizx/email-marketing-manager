import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Main from './pages/Main'
import Login from './pages/Login'
import Register from "./pages/Register";
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/auth'

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false} />
      <Switch>
        <PrivateRoute exact path='/' component={Main} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
