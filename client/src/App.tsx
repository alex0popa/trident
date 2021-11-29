import { Routes, Route } from 'react-router-dom';

import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { CurrencyConverter } from './components/currencyConverter';
import { Home } from './components/home';
import { PrivateRoute } from './components/privateRoute';
import { Todos } from './components/todos';
import { Unauthorized } from './components/unauthorized';
import { WeatherInfo } from './components/weatherInfo';

export const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/home"
      element={<PrivateRoute element={<Home />} />}
    />
    <Route
      path="/currency-converter"
      element={<PrivateRoute element={<CurrencyConverter />} />}
    />
    <Route
      path="/weather-info"
      element={<PrivateRoute element={<WeatherInfo />} />}
    />
    <Route
      path="/todos"
      element={<PrivateRoute element={<Todos />} />}
    />
    <Route path="*" element={<Unauthorized />} />
  </Routes>
);
