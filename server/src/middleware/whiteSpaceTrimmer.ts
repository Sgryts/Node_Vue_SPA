import * as _ from 'underscore';

const trimmer = (req, res, next) => {
  req.body = _.object(_.map(req.body, (value, key) =>
    Array.isArray(value) ?
      [key, value.map(v => v.trim())] :
      [key, value.trim()]
  ));
  next();
};

export default trimmer;
