import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'username is too short' })
  @ApiProperty({
    example: 'example username',
    minimum: 5,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password is too short' })
  @ApiProperty({
    example: 'example password',
    minimum: 8,
  })
  password: string;
}
