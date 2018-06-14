import { Response, NextFunction } from "express";

import * as dbConnection from "../../config/database";

import { AccountField } from "../../shared/enums/-index";
import {Account} from '../../shared/interfaces/account';

const db = dbConnection.default;


/**
 * @description
 *
 * @param {string, string} id, email
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<any>}
 */
export async function newUserEmailValidation({id, emailAddress}, res: Response, next: NextFunction): Promise<any> {
  const isEmailAddressExists = await db(AccountField.Table)
  .count({ emailAddress: AccountField.EmailAddress })
  .where({ email_address: emailAddress })
  .then(response => response[0].emailAddress)
  .catch(err => next(err));
  
  if (isEmailAddressExists > 0) emailErrorResponse(res);
}


/**
 * @description
 *
 * @param {string, string} id, email
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<any>}
 */
export async function existingEmailValidation({id, emailAddress}, res: Response, next: NextFunction): Promise<any> {
  const isEmailAddressExists = await db(AccountField.Table)
  .count({ emailAddress: AccountField.EmailAddress })
  .whereNot({ id })
  .andWhere({ email_address: emailAddress })
  .then(response => response[0].emailAddress)
  .catch(err => err);
  
  if (isEmailAddressExists > 0) emailErrorResponse(res);
}


/**
 * @description
 *
 * @param {Response} res
 */
function emailErrorResponse(res: Response): void {
  res.status(409).send({
    status   : 409,
    duplicate: "Email Address already exists."
  });
}


/**
 * @description
 *
 * @param {string} id
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {Promise<any>}
 */
export async function accountValidation(id: string, res: Response, next: NextFunction): Promise<any> {
  const isIdExists = await db(AccountField.Table)
  .count({ id: AccountField.Id })
  .where({ id })
  .then(response => response[0].id)
  .catch(err => next(err));
  
  if (isIdExists == 0) {
    await res.status(404).send({
      status  : 404,
      notFound: "Account does not exists"
    });
  }
}