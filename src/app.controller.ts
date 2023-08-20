import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('/tweets')
  getTweet(){
    return this.appService.getTweets();
  }
  
  @Post('/sign-up')
  createUser(@Body() body: CreateUserDto) {
    try {
      return this.appService.signUp(body);
    } catch (error) {
      throw new HttpException("Mano, deu ruim!", HttpStatus.CONFLICT)
    }
  }
}
