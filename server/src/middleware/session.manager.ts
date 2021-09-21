// import { MongoStoreFactory } from 'connect-mongo';
// import { Application } from 'express';
// import * as session from 'express-session';
// import * as connectMongo from 'connect-mongo';
// import CONFIG from '../config/config';

// export default function SessionManager(app: Application): void {
//   const MongoStore: MongoStoreFactory = connectMongo(session);

//   app.use(session({
//     store: new MongoStore({
//       url: CONFIG.DB_HOST,
//       ttl: 14 * 24 * 60 * 60, // 14 days - default;
//       // autoRemove: 'native',
//     }),
//     secret: CONFIG.SESSION_ENCRYPTION,
//     saveUninitialized: true,
//     resave: false,
//     cookie: {
//       path: '/',
//       httpOnly: true,
//       secure: false
//     },
//     name: 'id'
//   }))
// };
