import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 'U-sdfgjksakfg',
  })
  id: string;

  @ApiProperty({
    example: 'example username',
  })
  username: string;

  @ApiProperty({
    example: '2024-11-24T16:17:03.024Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-11-24T16:17:03.024Z',
  })
  updatedAt: Date;
}
