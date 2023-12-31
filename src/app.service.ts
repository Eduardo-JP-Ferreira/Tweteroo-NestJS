import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

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

  getTweets(page: number){
    if(!page){
      return this.tweets.slice(-15);
    }
    else if(page<1){
      throw new Error('Bad Request');
    }
    else{
      return this.tweets.slice((15*(page - 1)), ((15*(page - 1))+15));
    } 
  }

  getTweetsByUsername(page: number, username: string){
    const tweets = this.tweets.filter((tweet) => tweet.getUsername() === username);
    if(!page){
      return tweets.slice(-15);
    }
    else if(page<1){
      throw new Error('Bad Request');
    }
    else{
      return tweets.slice((15*(page - 1)), ((15*(page - 1))+15));
    } 
  }

  getUsers(){
    return this.users;
  }

  signUp(body: CreateUserDto){
    const user = new User(body.username, body.avatar);
    this.users.push(user);
    return
  }

  postTweet(body: CreateTweetDto){
    const user = this.findUserByUsername(body.username)
    if(!user) throw new Error('Unauthorized');
    const tweet = new Tweet(user.getUsername(), user.getAvatar(), body.tweet);
    this.tweets.push(tweet);
    return
  }

  findUserByUsername(username: string): User | undefined {
    return this.users.find(user => user.getUsername() === username);
  }
}
