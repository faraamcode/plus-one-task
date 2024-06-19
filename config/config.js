require('dotenv').config();

const isDevelopment = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development';

const sslConfig = isDevelopment
  ? {}
  : {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };

// Database configuration here
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '50502',

  username: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: process.env.DB_DIALECT || "postgres",
  timezone: '+01:00',
  logging: false,
  dialectOptions: {
    ...sslConfig,
    idle_in_transaction_session_timeout: 5000, // 5seconds
  },
  define: {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },

  pool: {
    max: 20,
    min: 0,
    // acquire: 30000,
    idle: 10000,
    evict: 10000,
  },
};
