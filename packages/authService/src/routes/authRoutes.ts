import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { createTenant } from "../services/tenant";

const router = Router();