import { Module } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsController } from './authentications.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService],
  imports: [PrismaModule],
})
export class AuthenticationsModule {}
