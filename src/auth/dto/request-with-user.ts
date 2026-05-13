import {JWTUser} from "../models";
import {Request} from "express";

export type RequestWithUser = Request & {user: JWTUser}