require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? './.env.test' : './.env' });

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import mongoose from 'mongoose';
import APP_CONFIG from './config/config';

require('dotenv').config();

const app = express();
mongoose.connect(APP_CONFIG.db.uri as string).then(()=> {
  app.use(morgan('dev'));
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: 15778476000, //SIX_MONTHS,
    includeSubDomains: true,
  }));
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      example: 'Express REST API for dog breeds',
      api :{
        getAllBreeds : 'api/v1/breeds',
        getBreedByName : 'api/v1/breed/:breedName',
      }
    });
  });

  app.use('/api/v1', api);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);
}).catch(err => console.error(err));
export default app;
