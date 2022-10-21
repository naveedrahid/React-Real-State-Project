import express from "express";
import { updateUser, deleteUser, getUser, getAllUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get('/checkAuth', verifyToken, (req,resp, next) => {
//     resp.send('Hellow you are logged in');
// });

// router.get('/checkUser/:id', verifyUser, (req,resp, next) => {
//     resp.send('Hellow you are logged in and you can delete your account');
// });
// router.get('/checkAdmin/:id', verifyAdmin, (req,resp, next) => {
//     resp.send('Hellow Admin, you are logged in and you can delete your account');
// });

// UPDATE

router.put('/:id', verifyUser, updateUser);

// DELETE

router.delete('/:id', verifyUser, deleteUser);
// GET

router.get('/:id', verifyUser, getUser);

// GET ALL

router.get('/', verifyAdmin, getAllUser);

export default router;