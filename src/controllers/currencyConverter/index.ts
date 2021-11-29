import { Request, Response } from 'express';

import axios from 'axios';

import { Rates } from './types';

export const currencyConverter = (req: Request, res: Response) => {
  const url = process.env.EXCHANGE_URI as string;

  const sendResponse = ({ data : { data: { USD: rate } }}: Rates) => {
    res
      .status(200)
      .json(Number((rate).toFixed(2)));
  };

  axios.get(url).then(sendResponse);
};
