const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { registerController, loginController, getCurrentuser, getAllUsers, getStats, sendEmailController, sendStatusChangeEmailController, forgotPassword, resetPassword } = require('../Controllers/userController');
const { createService, getAllService, clientController, getAllClients } = require('../Controllers/serviceController');
const { updateInquiryStatus } = require('../Controllers/inquiryController');
const authorizedRoles = require('../middlewares/checkroles');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', verifyToken, getCurrentuser);
router.post('/create-service',authorizedRoles("admin"), verifyToken, createService);
router.post('/client',authorizedRoles("admin"), verifyToken, clientController);
router.get('/get-all-services', getAllService);
router.get('/all-clients',getAllClients);
router.put('/inquiries/:inquiryId',authorizedRoles("admin"),verifyToken,updateInquiryStatus)
router.get('/get-all-users',authorizedRoles("admin"),verifyToken, getAllUsers)
router.get('/get-status',authorizedRoles("admin"),verifyToken, getStats);
router.post('/me/send-email',verifyToken,sendEmailController);
router.post('/me/send-status-mail',verifyToken,sendStatusChangeEmailController);
router.post('/password/forgot',forgotPassword);
router.put('/password/reset/:token',resetPassword);

module.exports = router;