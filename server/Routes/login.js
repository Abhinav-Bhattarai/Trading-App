import express from 'express';
import { LoginMiddleware } from '../Middleware/LoginMiddleware.js';

const router = express.Router();

router.post('/', LoginMiddleware, (req, res) => {

});;

export default router