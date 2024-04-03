import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { PodcastFilter } from './interface/CodeChallengeApi';
import * as fs from 'fs';

/** from my limited understanding, this is a decorator that tells the class that it is a controller
the controller is a class that is responsible for handling incoming requests and returning responses to the client
the controller is the entry point of the application
*/

// using this controller to retrieve the data for the best_podcasts endpoint
@Controller('podcasts')
export class PodcasteController {
  constructor(private readonly appService: AppService) {}

  // so the @get decorator is used to define a route handler for retrieving the data for the best_podcasts endpoint
  // if we want to retrieve the data for the best_podcasts endpoint, we would send a GET request to the /podcasts/best_podcasts endpoint
  @Get('best_podcasts')
  async getBest_Podcast(
    @Req() request: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<any> {
    // unpack the request object to get the body, token and query properties
    const { headers, query } = request;

    // now we want to unpack query to get the page, region, and safe_mode properties
    const { region, safe_mode, genre_id } = query;

    // now let grab the jwt token from the request object and store it in a variable called jwtToken to figure out if that user has access to the database
    const { authorization } = headers;

    // the goal here is to decode the jwt token to get the user's information and check if the user has access to the database
    try {
      // decode the jwt token
      const decodedToken = jwt.decode(authorization.split(' ')[1]);
      // if the token is valid, return the data
      if (decodedToken && decodedToken['Role'].includes('freeSubscription')) {
        const data = await this.appService.getPodcasts(
          page,
          region.toString(),
          safe_mode.toString(),
          genre_id.toString(),
        );

        return data as PodcastFilter;
      }
    } catch (error) {
      // if the token is invalid, return an error message
      fs.appendFileSync('log.txt', `Error: ${error}\n`);

      return {
        error: error,
      };
    }
  } // this method returns an object of type PodcastFilterResponse, it takes in an argument of type Request

  // add additional controllers below to either post or delete data from the pocasts table
}
