import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

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
  
  @Get('/users')
  getUsers(){
    return this.appService.getUsers();
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUserDto) {      
    try {
      return this.appService.signUp(body);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_REQUEST)
    }
  }

  @Post('/tweets')
  @HttpCode(HttpStatus.CREATED)
  postTweet(@Body() body: CreateTweetDto) {      
    try {
      return this.appService.postTweet(body);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.UNAUTHORIZED)
    }
  }
}
