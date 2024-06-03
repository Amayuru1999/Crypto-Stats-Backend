import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Response, Request } from "express";
import { CoinbaseAuthService } from "./coinbase-auth.service";
import { request } from "http";
import { CurrentUser } from "src/current-user.decorator";
import { UserResponse } from "src/users/dto/response/user-response.dto";
import { CoinbaseService } from "./coinbase.service";
@Controller('coinbase')
export class CoinbaseController{
    constructor(private readonly coinbaseAuthService:CoinbaseAuthService,private readonly coinbaseService: CoinbaseService,){}

    @Get('auth')
    @UseGuards(JwtAuthGuard)
    authorize(@Res() response:Response):void {
        this.coinbaseAuthService.authorize(response);
    }

    @Get('auth/callback')
    @UseGuards(JwtAuthGuard)
    handleCallback(@Req() request:Request,@Res() response:Response):void{
        this.coinbaseAuthService.handleCallback(request, response);
    }

    @Get()
  @UseGuards(JwtAuthGuard)
  getCoinbaseData(@CurrentUser() user: UserResponse): Promise<any> {
    return this.coinbaseService.getPrimaryAccountTransactions(user._id);
  }
}