const express = require('express');
const { register, login, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../../controller/User/UserController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles} = require('../../middleware/userAuth')

// user registration  route
router.post('/register', register)

// user login route
router.post('/login', login)

// user logout route
router.get('/logout', logout)

// user forgot password route
router.post('/password/forgot', forgotPassword)

// user reset password route
router.put('/password/reset/:token', resetPassword)

// user details route
router.get('/me', isAuthenticatedUser, getUserDetails)

// user details route
router.put('/password/update', isAuthenticatedUser, updatePassword);

// user details update route
router.put('/me/update', isAuthenticatedUser, updateUserProfile);

//================================ADMIN ROUTES=============================//

// get all users route
router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), getAllUsers)

// get a user detail
router.get('/admin/user/:id',isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)

// update user role
router.put('/admin/user/:id',isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)

// update user rolw
router.delete('/admin/user/:id',isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router
