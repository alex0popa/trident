import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { secret: token }: { secret?: string }  = req.cookies;

  if (!token) {
    return res.status(401).json(null);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (error, decoded) => {
      if (error) {
        console.error(error);

        return res.status(401).json(null);
      }

      if (decoded) {
        req.userId = decoded.id;
        
        next();
      }
    }
  );
};
