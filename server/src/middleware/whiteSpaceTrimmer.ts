import * as _ from 'underscore';

const trimmer = function (req, res, next) {
    req.body = _.object(_.map(req.body, function (value, key) {
        return [key, value.trim()];
    }));
    next();
};

export default trimmer;
