
import AppController1 from '../controllers/AppController1';

import {controller} from './register-helper';

const controllers = angular.module('controllers', [])

    .controller('AppController1', controller(AppController1));

export default controllers;