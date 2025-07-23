/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

export interface RequestWithUserId<Body = any, Params = any, ResBody = any, Query = any>
  extends Request<Params, ResBody, Body, Query> {
  user?: { id: number };
  accessToken?: {
    value: string;
    exp?: number | undefined;
  };
}
