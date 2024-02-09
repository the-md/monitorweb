const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const raExpressMongoose = require("express-mongoose-ra-json-server").default;

const SiteModel = require('../models/site-model');
const NotificationModel = require('../models/notification-model');


router.use("/site", authMiddleware, raExpressMongoose(SiteModel));
router.use("/notification", authMiddleware, raExpressMongoose(NotificationModel));

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router
