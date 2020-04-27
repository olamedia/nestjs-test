import './env'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname + '/migration/**/*{.ts,.js}'],
  cli: {
    migrationsDir: '/migration',
  },
}

export = config
