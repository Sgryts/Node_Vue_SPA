import {RequestHandler} from "express";

const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

export default class RateLimiter { // implements RequestHandler {
    private _time: number;
    private _max: number;
    private _message: string

    constructor(time: number, max: number) {
        this._time = time;
        this._max = max;
        this._message = `Too many accounts created from this IP, please try again after ${this._time} min`;
    }

    public setRateLimit = (req, res, next): any => {
        return rateLimit({
            windowMs: this._time,
            max: this._max,
            message: this._message
        });
    }
}

const apiLimiter15_900 = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 900, // 1req per s
    message: "Too many accounts created from this IP, please try again after 15 min"
});
//
//
// const apiLimiter1_3 = rateLimit({
//     windowMs: 60 * 1000, // 15 minutes
//     max: 3, // 1req per s
//     message: "Too many accounts created from this IP, please try again after 15 min"
// });

// // only apply to requests that begin with /api/
// app.use("/api/", apiLimiter);
