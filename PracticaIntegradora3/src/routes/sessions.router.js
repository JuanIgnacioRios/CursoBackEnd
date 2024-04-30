import express from 'express';
import passport from 'passport';
import { passportCall, authorization } from '../../utils.js'
import sessionsController from '../controllers/sessions.controller.js';

const router = express.Router();

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), sessionsController.login);
router.get('/faillogin', sessionsController.faillogin)
router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), sessionsController.register)
router.get('/failregister', sessionsController.failregister)
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionsController.githubCallBack)
router.get('/current', sessionsController.current)
router.get('/logout', sessionsController.logout)


export default router