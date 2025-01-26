import { Injectable } from "@nestjs/common";
import configuration, { EnvironmentVariables } from "./configuration";
import { ConfigService } from "@nestjs/config";

// Referenced at https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

type LeafTypes<T, S extends string> = S extends `${infer T1}.${infer T2}`
  ? T1 extends keyof T
    ? LeafTypes<T[T1], T2>
    : never
  : S extends keyof T
  ? T[S]
  : never;

type Paths<T> = T extends object ? { [K in keyof T]:
    `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`
}[keyof T] : never

type PathTypes<T, S extends string> = S extends `${infer T1}.${infer T2}`
  ? T1 extends keyof T
    ? PathTypes<T[T1], T2>
    : never
  : S extends keyof T
  ? T[S]
  : never

@Injectable()
export class TypedConfigService {
  constructor(private configService: ConfigService) {}

  // Get values of leaves
  get<T extends Leaves<EnvironmentVariables>>(propertyPath: T): LeafTypes<EnvironmentVariables, T> {
    return this.configService.get(propertyPath);
  }

  // Get values of all paths
  getObject<T extends Paths<EnvironmentVariables>>(propertyPath: T): PathTypes<EnvironmentVariables, T> {
    return this.configService.get(propertyPath);
  }
}