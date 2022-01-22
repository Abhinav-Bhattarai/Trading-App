import express from 'express';
import { SignupMiddleware } from '../Middleware/SignupMiddleware.js';

const router = express.Router();

router.post('/', SignupMiddleware, (req, res) => {

})

export default router;