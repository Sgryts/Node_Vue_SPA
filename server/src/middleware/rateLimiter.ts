import * as rateLimit from 'express-rate-limit';


export const apiLimiter15_900 = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 900, // 1req per s
  message: 'Too many accounts created from this IP, please try again after 15 min'
});

// export const apiLimiter1_3 = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 min
//   max: 3,
//   message: 'Too many emails set from this IP, please try again after 15 min'
// });
