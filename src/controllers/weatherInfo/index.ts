import { Request, Response } from 'express';

import axios from 'axios';
import { PPROPERTIES_TO_DELETE } from './constants';

export const getWeatherInfo = (req: Request, res: Response) => {
  const { cityName }: { cityName: string } = req.body;
  const baseUrl = process.env.WEATHER_URI as string;
  const apiKey = process.env.WEATHER_API_KEY as string;

  axios
    .get(`${baseUrl}?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(({ data }) => {
      // remove unnecessary properties from the 'data' object
      PPROPERTIES_TO_DELETE.forEach(prop => delete data[prop]);

      res.status(200).json(data);
    });
};
