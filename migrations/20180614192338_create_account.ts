import * as Knex from "knex";

import { AccountField } from "../shared/enums/-index";


export async function up(knex: Knex) {
  return await knex.schema.createTable(AccountField.Table, table => {
    table.uuid(AccountField.Id).primary();
    table.string(AccountField.FirstName, 128).notNullable();
    table.string(AccountField.LastName, 128).notNullable();
    table.string(AccountField.EmailAddress, 255).notNullable();
    table.integer(AccountField.Age).notNullable();
    table.enum(AccountField.Gender, ["m", "f"]).notNullable();
    table.date(AccountField.Birthday).notNullable();
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(AccountField.Table);
}