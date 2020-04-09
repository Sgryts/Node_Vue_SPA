import { Application } from 'express';
import * as helmet from 'helmet';
import CONFIG from '../config/config';

// TODO: use once hosted.
export const httpsConfig = (app: Application): void => {
  app.use(helmet.hsts({
    maxAge: 1000 * 60 * 60 * 24 * 365, // year
    includeSubDomains: true,
    preload: true
  }));

  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['\'self\'', '\'https\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\'',
        'https://fonts.googleapis.com',
        'http://code.jquery.com'],
      scriptSrc: ['\'self\'', '\'unsafe-inline\'',],
      imgSrc: ['\'self\'', '\'https\'', 'data:'],
      fontSrc: ['\'self\'', '\'https\'', 'https://fonts.gstatic.com', 'data:'],
      connectSrc: ['\'self\'', '\'https\'']
    }
  }));
};

export const httpsRedirectConfig = (app: Application): void => {
  const host = CONFIG.HOST;
  app.all('*', ((req, res, next) => {
    res.redirect(307, `https://${host}${req.url}`);
  }));
};


