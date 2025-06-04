import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @Length(7)
  password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
