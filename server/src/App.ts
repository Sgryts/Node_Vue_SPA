import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import api from './api/index';
import * as errorHandler from './middleware/errorHandler';
import * as expressip from 'express-ip';
import * as csrf from 'csurf';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    // this.express.use(morgan('dev'));
    this.express.use(morgan('combined'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(expressip().getIpInfoMiddleware);
    this.express.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['\'self\''],
        styleSrc: ['\'self\'', 'fonts.googleapis.com'],
        fontSrc: ['\'self\'', 'fonts.gstatic.com', 'data:'],
        scriptSrc: ['\'self\'', 'code.jquery.com']
      }
    }));
    this.express.set('trust proxy', 1); // heroku
    // this.express.use(csrf()); // heroku
    // this.express.use('/api/genres/:id/photos', (req, res, next) => {
    //   req.url = req.params.asset;
    //   express.static(__dirname + '/images')(req, res, next);
    // });
    // this.express.use(express.static('images'));
    this.express.use(express.static('images'));
    // this.express.use('/genres/:id/images', express.static('images'));
    // this.express.use('/images', express.static('images'));
    // this.express.use('/', express.static('dist', { index: 'index.html' }));
  }

  private setRoutes(): void {
    this.express.use('/api', api);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;
