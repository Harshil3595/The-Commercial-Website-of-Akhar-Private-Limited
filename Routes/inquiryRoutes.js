const express=require('express');
const { inquiryController, getAllInquiryController, getMyInquirysController, getAllInquiryForDisplay } = require('../Controllers/inquiryController');
const verifyToken = require('../middlewares/verifyToken');
const authorizedRoles = require('../middlewares/checkroles');

const router=express.Router();

router.post('/create',verifyToken,inquiryController);
router.get('/get-all-inquirys',authorizedRoles("admin"),verifyToken,getAllInquiryController);
router.get('/me',verifyToken,getMyInquirysController)
router.get('/admin/inquiry/:id',verifyToken,getAllInquiryForDisplay);

module.exports=router;