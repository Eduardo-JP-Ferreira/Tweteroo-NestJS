import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  getTweets(){
    return this.tweets.slice(-15);
  }

  signUp(body: CreateUserDto){
    const user = new User(body.username, body.avatar);
    this.users.push(user);
    return
  }
}
