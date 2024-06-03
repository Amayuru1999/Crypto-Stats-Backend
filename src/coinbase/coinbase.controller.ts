import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Response, Request } from "express";
import { CoinbaseAuthService } from "./coinbase-auth.service";
import { request } from "http";

@Controller('coinbase')
export class CoinbaseController{
    constructor(private readonly coinbaseAuthService:CoinbaseAuthService){}

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
}