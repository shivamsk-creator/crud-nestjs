import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}