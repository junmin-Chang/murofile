import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import AuthRequired from '../common/decorators/auth.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get(':id')
  async getUserInfo(@Param(':id') userId: string): Promise<User> {
    return this.userServices.getUserInfo({ userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('playlist')
  async addPlaylist(
    @Body() body: { playlist: string },
    @AuthRequired() user: User,
  ) {
    return await this.userServices.addPlaylist(body.playlist, user);
  }
}
