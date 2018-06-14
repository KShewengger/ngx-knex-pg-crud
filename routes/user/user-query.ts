import { Response, NextFunction } from "express";

import * as dbConnection from "../../config/database";

import { Account } from "../../shared/-index"
import { AccountField } from "../../shared/enums/-index";

const camelCase = require("camelcase-keys");
const db = dbConnection.default;


/**
 * @description
 *
 * @param {Account} body
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function addUserQuery(body: Account, res: Response, next: NextFunction): Promise<void> {
  await db(AccountField.Table)
  .insert(body)
  .catch(err => next(err));
  
  res.sendStatus(201);
}


/**
 * @description
 *
 * @param {string} id
 * @param {Account} body
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function updateUserQuery(id: string, body: Account, res: Response, next: NextFunction): Promise<void> {
  await db(AccountField.Table)
  .where({ id })
  .update(body)
  .catch(err => next(err));
  
  res.sendStatus(200);
}


/**
 * @description
 *
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function getAllUsersQuery(res: Response, next: NextFunction): Promise<void> {
  const fetchUsers = await db(AccountField.Table)
  .select()
  .catch(err => next(err));
  
  const result = camelCase(fetchUsers);
  
  res.json(<Account[]>result);
}


/**
 * @description
 *
 * @param {string} id
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function getUserQuery(id: string, res: Response, next: NextFunction): Promise<void> {
  const fetchUser = await db(AccountField.Table)
  .where({ id })
  .catch(err => next(err));
  
  const result = camelCase(fetchUser);
  
  res.json(<Account>result);
}


/**
 * @description
 *
 * @param {string} id
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<void>}
 */
export async function deleteUserQuery(id: string, res: Response, next: NextFunction): Promise<void> {
  await db(AccountField.Table)
  .where({ id })
  .del()
  .catch(err => next(err));
  
  res.sendStatus(204);
}