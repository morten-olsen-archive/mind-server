const config = {};
config.env = process.env.NODE_ENV || 'development';

switch (process.env.DB_DRIVER || 'sqlite') {
  case 'postgres': {
    const { DB_USER, DB_HOST } = process.env;
    config.knex = {
      client: 'postgresql',
      connection: `postgres://${DB_USER}@${DB_HOST}`,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    };
    break;
  }
  default: {
    config.knex = {
      client: 'sqlite3',
      connection: {
        filename: process.env.DB_LOCATION || './dev.sqlite3',
      },
      useNullAsDefault: true,
    };
    break;
  }
}

switch (config.env) {
  case 'development': {
    config.knex.seeds = {
      directory: './seeds/dev',
    };
    break;
  }
  case 'staging': {
    config.knex.seeds = {
      directory: './seeds/staging',
    };
    break;
  }
  default: {
    config.knex.seeds = {
      directory: './seeds/live',
    };
    break;
  }
}

module.exports = config;
