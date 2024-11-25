import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { nanoid } from 'nanoid-cjs';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const isUsernameExist = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (isUsernameExist) {
      throw new HttpException('username already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = hashSync(createUserDto.password, 10);

    const newUser = {
      id: `U-${nanoid(10)}`,
      username: createUserDto.username,
      password: hashPassword,
    };

    const createUser = await this.prisma.user.create({ data: newUser });

    return {
      id: createUser.id,
      username: createUser.username,
      createdAt: createUser.created_at,
      updatedAt: createUser.updated_at,
    };
  }

  async findAll() {
    const user = await this.prisma.user.findMany();

    const users = user.map((u) => ({
      id: u.id,
      username: u.username,
      createdAt: u.created_at,
      updatedAt: u.updated_at,
    }));

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userId = await this.prisma.user.findUnique({ where: { id: id } });

    if (!userId) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const isUsernameExist = await this.prisma.user.findUnique({
      where: { username: updateUserDto.username },
    });

    if (isUsernameExist) {
      throw new HttpException('username already exist', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
      select: {
        id: true,
      },
    });
  }

  async remove(id: string) {
    const userId = await this.prisma.user.findUnique({ where: { id: id } });

    if (!userId) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.delete({ where: { id: id } });
  }
}
