import { Request, Response, NextFunction } from "express";
import * as uuid from "uuid/v4";

import * as userQuery from "./user-query";
import * as userValidation from "./user-validation";

const snakeCase = require("snakecase-keys");


/**
 * @api
 * @description
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function addUser(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  body.id    = uuid();
  
  await userValidation.newUserEmailValidation(body, res, next);
  
  const sqlBodyFieldCase = snakeCase(req.body);
  
  if (res.statusCode != 409) await userQuery.addUserQuery(sqlBodyFieldCase, res, next);
}


/**
 * @api
 * @description
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const id   = req.params.id;
  const body = snakeCase(req.body);
  
  await userValidation.existingEmailValidation(body, res, next);
  
  if (res.statusCode != 409) await userQuery.updateUserQuery(id, body, res, next);
}


/**
 * @api
 * @description
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  await userQuery.getAllUsersQuery(res, next);
}


/**
 * @api
 * @description
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function getUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  
  await userValidation.accountValidation(id, res, next);
  
  if (res.statusCode != 404) await userQuery.getUserQuery(id, res, next);
}


/**
 * @api
 * @description
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  
  await userValidation.accountValidation(id, res, next);
  
  if (res.statusCode != 404) await userQuery.deleteUserQuery(id, res, next);
}
