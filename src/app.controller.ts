import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
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
  getTweet(@Query('page') page: number | undefined) {   
    try {
      return this.appService.getTweets(page);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_REQUEST)
    }
  }
  
  @Get('/tweets/:username')
  getTweetByUsername(@Query('page') page: number | undefined, @Param('username') username: string) {   
    try {
      return this.appService.getTweetsByUsername(page, username);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_REQUEST)
    }
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
