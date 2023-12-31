export class UserDto {
  public id?: string;
  public email!: string;
  public avatar?: string;
  public name!: string;
  public password!: string;
}

export class LoginUserDto {
  public email!: string;
  public password!: string;
}
