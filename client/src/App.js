import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { MyMovies } from './pages/MyMovies';
import MovieDetails from './pages/Details/MovieDetails';
import PersonDetails from './pages/Details/PersonDetails';
import { AuthProvider } from './context/contextapi';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import PrivateRoutes from './context/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/' element={<PrivateRoutes />}>
            <Route exact path='myMovies' element={<MyMovies />} />
          </Route>
          <Route exact path='/movie/:id' element={<MovieDetails />} />
          <Route exact path='/actor/:id' element={<PersonDetails />} />
          <Route exact path='/producer/:id' element={<PersonDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
