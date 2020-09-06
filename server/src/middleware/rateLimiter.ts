import * as rateLimit from 'express-rate-limit';

const limitReachedMessage = (windowMs: number) => `Too many request created from this IP, please try again after ${windowMs} min`;

/**
 * API Bandwith
 * @param windowMs in minutes (example windowMs 1 is (1 * 60 * 1000) - 1 minute)
 * @param max - max tries
 * @param message
 * @returns if rate limit is reached - returns HTTP Code 429 and custom message 
 */
export const apiRateLimiter = (windowMs: number, max: number) => rateLimit({
  windowMs: windowMs * 60 * 1000,
  max,
  message: limitReachedMessage(windowMs)
});