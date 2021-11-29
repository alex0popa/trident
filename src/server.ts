import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { currencyConverter } from './controllers/currencyConverter';
import { getWeatherInfo } from './controllers/weatherInfo';
import { connectDB } from './db/connectDB';
import { ensureAuthenticated } from './middlewares/protect';
import { authenticationRouter } from './routes/auth';
import { todosRouter } from './routes/todos';
import { getUser } from './controllers/auth/getUser';

// connect db
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true
};

// body parsing middleware
app.use(express.json());

app.use(cookieParser());
app.use(cors(options));

// authentication
app.use('/api/auth', authenticationRouter);

// protect
app.use(ensureAuthenticated);

//
app.get('/api/user', getUser)

// exchage
app.get('/api/convert-eur-to-usd', currencyConverter);

// weather
app.post('/api/get-weather-info', getWeatherInfo);

// todos
app.use('/api/todos', todosRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
