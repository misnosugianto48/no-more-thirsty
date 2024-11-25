import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
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
import { responseJson } from 'src/utils/response.utils';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(201)
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
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      status: 'success',
      message: 'user has been successfully created',
      statusCode: HttpStatus.CREATED,
      data: await this.usersService.create(createUserDto),
    };
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
  async findAll() {
    return {
      status: 'success',
      message: 'successfully get all users',
      statusCode: HttpStatus.OK,
      data: await this.usersService.findAll(),
    };
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
  async findOne(@Param('id') id: string) {
    return responseJson(
      'success',
      'successfully get user',
      HttpStatus.OK,
      await this.usersService.findOne(id),
    );
  }

  @Patch(':id')
  @ApiOkResponse({ type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: User,
  })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return Response.json({
      status: 'success',
      statusCode: HttpStatus.OK,
    });
  }
}
