import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

class TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.configService.get(key);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    if (this.isProduction()) {
      return {
        url: this.getValue('DATABASE_URL'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        type: 'postgres',
        logging: false,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        migrationsTableName: 'migration',
        migrations: ['../src/migration/*.ts'],
        cli: {
          migrationsDir: '../src/migration',
        },
        synchronize: true,
      };
    }
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['../src/migration/*.ts'],
      cli: {
        migrationsDir: '../src/migration',
      },
      ssl: this.isProduction(),
      synchronize: true,
      logging: true,
    };
  }
}

export { TypeOrmConfigService };
