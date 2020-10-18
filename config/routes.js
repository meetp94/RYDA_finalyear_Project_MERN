'use strict'

const express = require('express')
const router = express.Router();
const passport= require('passport')
//var jwt = require('jwt-simple');

const { controllers, middlewares} = require('./../api')

const routes = [
  //User
  {
    method: 'POST',
    path: '/user',
    handler: 'AuthController.create'
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: 'AuthController.UserExist',
  },
  {
    method: 'GET',
    path: '/user/logout',
    handler: 'AuthController.logout',
    authenticate: true,
  },
  {
    method: 'POST',
    path: '/user/resetpassword',
    handler: 'AuthController.resetpassword',
    authenticate:true,
  },
  {
    method: 'POST',
    path: '/user/forgotpassword',
    handler: 'AuthController.forgotpassword'
  },
  {
    method: 'GET',
    path: '/user/getuserbytoken',
    handler: 'AuthController.getuserbytoken',
    authenticate: true,
  },
  {
    method: 'GET',
    path: '/user/getalluserforadmin',
    handler: 'AuthController.getalluserforadmin',
    authenticate: true,
  },
  {
    method: 'PATCH',
    path: '/user/userupdate/:id',
    handler: 'AuthController.userupdate',
    authenticate : true,
  },
  //Survey
  {
    method: 'POST',
    path: '/survey',
    handler: 'SurveyController.create',
  },
  {
    method: 'GET',
    path: '/survey/getall',
    handler: 'SurveyController.getAll'
  },
  //Questions
  {
    method: 'POST',
    path: '/question/addquestion',
    handler: 'QuestionController.create',
    authenticate : true,
  },
  {
    method: 'POST',
    path: '/question/getall',
    handler: 'QuestionController.getAll',
    authenticate : true,
  },
  {
    method: 'PATCH',
    path: '/question/update/:id',
    handler: 'QuestionController.update',
    authenticate : true,
  },
  {
    method: 'POST',
    path: '/question/result',
    handler: 'QuestionController.result',
    authenticate : true,
  },
  {
    method: 'GET',
    path: '/question/getallforadmin',
    handler: 'QuestionController.getAllforAdmin',
    authenticate : true,
  },
  {
    method: 'DELETE',
    path: '/question/deletequestion/:id',
    handler: 'QuestionController.deletequestion',
    authenticate : true,
  },
  //News
  {
    method: 'POST',
    path: '/news/add',
    handler: 'NewsController.create',
    authenticate : true,
  },
  {
    method: 'GET',
    path: '/news/getall',
    handler: 'NewsController.getAll',
  },
  {
    method: 'GET',
    path: '/news/getallforadmin',
    handler: 'NewsController.getAllforadmin',
    authenticate : true,
  },
  {
    method: 'PATCH',
    path: '/news/update/:id',
    handler: 'NewsController.update',
    authenticate : true,
  },

];

// Applying routes
routes.forEach((route)=>{

  const handler = route.handler.split('.');
  let middleware = route.authenticate ?
                    [ middlewares.Auth.validateToken, passport.authenticate('jwt', { session: false })] :
                    [ (req, res, next) => next() ];
  router[route.method.toLowerCase()](route.path, ...middleware, controllers[handler[0]][handler[1]])
  // ex. router.get('/hello', middleware, controller.DefaultController.hello)
});

module.exports = router;

