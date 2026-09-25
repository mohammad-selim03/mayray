import { Request, Response } from "express";
export declare const listROI: (req: Request, res: Response) => Promise<void>;
export declare const getROMAdmin: (req: Request, res: Response) => Promise<void>;
export declare const createROI: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateROI: (req: Request, res: Response) => Promise<void>;
export declare const deleteROI: (req: Request, res: Response) => Promise<void>;
export declare const reorderROI: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
