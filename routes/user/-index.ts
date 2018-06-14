"use strict";

import { Router } from "express";

import * as userApi from "./user-api";

const router: Router = Router();


router.post("/", userApi.addUser);
router.put("/:id", userApi.updateUser);
router.get("/", userApi.getAllUsers);
router.get("/:id", userApi.getUser);
router.delete("/:id", userApi.deleteUser);

export const userRoutes: Router = router;