"use strict";

import { Router } from "express";

import * as userApi from "./user-api";

const router: Router = Router();


/**
 * @apiUrl /user/
 * @description Saves New User
 */
router.post("/", userApi.addUser);


/**
 * @apiUrl /user/:id
 * @description Update User Information
 */
router.put("/:id", userApi.updateUser);


/**
 * @apiUrl /user/
 * @description Get All Users
 */
router.get("/", userApi.getAllUsers);


/**
 * @apiUrl /user/:id
 * @description Get user information
 */
router.get("/:id", userApi.getUser);


/**
 * @apiUrl /user/:id
 * @description Delete user
 */
router.delete("/:id", userApi.deleteUser);

export const userRoutes: Router = router;