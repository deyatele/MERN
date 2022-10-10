import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { register, login, getMe } from './../controllers/auth.js';

const router = new Router();

//Регистрация
//api/auth/...
router.post('/register', register);

//Авторизация
router.post('/login', login);

//Запрос авторизации
router.get('/me',checkAuth, getMe);

export default router;
