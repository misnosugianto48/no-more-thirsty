import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiTags,
  ApiExtraModels,
  getSchemaPath,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ResponseJson, responseJson } from 'src/utils/response-json.utils';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiExtraModels(User)
  @ApiCreatedResponse({
    description: 'User Created',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: {
          type: 'string',
          example: 'User has been successfully created',
        },
        statusCode: {
          example: 201,
        },
        data: { $ref: getSchemaPath(User) },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User Error',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        message: {
          type: 'string',
          example: 'username is too short',
        },
        statusCode: {
          example: 400,
        },
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<
    ResponseJson<{
      id: string;
      username: string;
      createdAt: Date;
      updatedAt: Date;
    }>
  > {
    return responseJson(
      'user has been successfully created',
      HttpStatus.CREATED,
      await this.usersService.create(createUserDto),
    );
  }

  @Get()
  @ApiOkResponse({
    description: 'Get Users',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: {
          type: 'string',
          example: 'successfully get all users',
        },
        statusCode: {
          example: 200,
        },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(User),
          },
          minItems: 2,
        },
      },
    },
  })
  async findAll(): Promise<
    ResponseJson<
      {
        id: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    >
  > {
    return responseJson(
      'success get all users',
      HttpStatus.OK,
      await this.usersService.findAll(),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get User By Id',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: {
          type: 'string',
          example: 'successfully get user',
        },
        statusCode: {
          example: 200,
        },
        data: {
          $ref: getSchemaPath(User),
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User Not Found',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        message: {
          type: 'string',
          example: 'user not found',
        },
        statusCode: {
          example: 404,
        },
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<
    ResponseJson<{
      id: string;
      username: string;
      createdAt: Date;
      updatedAt: Date;
    }>
  > {
    return responseJson(
      'successfully get user',
      HttpStatus.OK,
      await this.usersService.findOne(id),
    );
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update User By Id',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: {
          type: 'string',
          example: 'User has been successfully updated',
        },
        statusCode: {
          example: 200,
        },
        data: {
          example: {
            id: 'U-sdadgaidg',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User Error',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        message: {
          type: 'string',
          example: 'username is too short',
        },
        statusCode: {
          example: 400,
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User Not Found',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        message: {
          type: 'string',
          example: 'user not found',
        },
        statusCode: {
          example: 404,
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<
    ResponseJson<{
      id: string;
    }>
  > {
    return responseJson(
      'user has been successfully updated',
      HttpStatus.OK,
      await this.usersService.update(id, updateUserDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete User By Id',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: {
          type: 'string',
          example: 'User has been successfully deleted',
        },
        statusCode: {
          example: 200,
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User Not Found',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        message: {
          type: 'string',
          example: 'user not found',
        },
        statusCode: {
          example: 404,
        },
      },
    },
  })
  async remove(@Param('id') id: string): Promise<
    ResponseJson<{
      id: string;
    }>
  > {
    await this.usersService.remove(id);
    return responseJson('user has been deleted', HttpStatus.OK);
  }
}
