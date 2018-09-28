module.exports = {
  port: 3030,
  app: process.env.APP || 'dev',
  db: {
    dialect: process.env.DB_DIALECT || 'mongodb',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    host: process.env.HOST || '://localhost:27017/',
    database: process.env.DB_NAME || 'photography'
  },
  authentication: {
    jwt_encryption: process.env.JWT_SECRET || 'secret_token',
    jwt_expiration: process.env.JWT_EXPIRATION || '10000'
  },
  salt: process.env.SALT || 'secret_salt'
}
