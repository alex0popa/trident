import { Request, Response } from 'express';

/** 
 * Clear the cookies, set the expiration date in the past (01-01-1970) and set
 * the user to null on the front end 
 */
export const logout = (req: Request, res: Response) => {
  res
    .cookie('secret', '', { httpOnly: true, expires: new Date(0) })
    .json(null);
};
