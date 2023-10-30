import {
  Attribute,
  HashKey,
  RangeKey,
  ReturnModel,
  Table,
} from 'nestjs-dynamodb';
// import * as nanoid from 'nanoid';

@Table('employee')
export class EmployeeEntity {
  @HashKey()
  id: string;

  @RangeKey()
  sk: string;

  @Attribute()
  email: string;

  @Attribute()
  password: string;

  @Attribute()
  firstName: string;

  @Attribute()
  lastName: string;

  @Attribute()
  username: string;

  @Attribute()
  roles: Role[];
}

export class Role {
  id: string;

  name: string;

  permission: string;
}

export const Employee = ReturnModel<EmployeeEntity>();
