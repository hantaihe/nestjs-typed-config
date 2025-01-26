import { Injectable } from '@nestjs/common';
import { TypedConfigService } from './config/typed-config.service';
import { EnvironmentVariables } from './config/configuration';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: TypedConfigService // ConfigService
  ) {}
  
  getEnv(): EnvironmentVariables {
    const port = this.configService.get('port');
    const dbHost = this.configService.get('database.host');
    const dbUser = this.configService.get('database.user');
    const dbPassword = this.configService.get('database.password');
    const dbName = this.configService.get('database.database');
    const dbPort = this.configService.get('database.port');

    console.log({
      port, // 3000
      dbHost, // localhost
      dbUser, // username
      dbPassword, // password
      dbName, // dbname
      dbPort // 3306
    })

    const database = this.configService.getObject('database');

    // {
    //   host: 'localhost',
    //   user: 'username',
    //   password: 'password',
    //   database: 'dbname',
    //   port: 3306
    // }
    console.log(database)

    return {
      port,
      database
    };
  }
}
