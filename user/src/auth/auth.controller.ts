import { Body, Controller, Get, HttpException, HttpStatus, OnModuleInit, Patch, Post, Put, Req, UseGuards, Res } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ForgetPasswordDto } from './dto/forgetPasswordDto';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import { BrokerService } from 'src/broker/broker.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthReq } from 'src/util/types';
import { GoogleStrategy } from 'src/config/google-strategy.config';
import { CacheService } from 'src/cache/cache.service';

@ApiTags("Auth")
@Controller('auth')
export class AuthController{

    constructor(
        private authService: AuthService,
        private brokerService: BrokerService,
        private userService: UserService,
        private cacheService: CacheService
    ){}

    @Post("login")
    async login(
        @Body() loginDto: LoginDto
    ){
        if(!loginDto.email)return new HttpException("email is required", HttpStatus.BAD_REQUEST)
        if(!loginDto.password)return new HttpException("password is required", HttpStatus.BAD_REQUEST)
        const data = await this.authService.login(loginDto)
        return data
    }

    @Put("forget-password")
    async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto){
        if(!forgetPasswordDto.email)return new HttpException("email is required", HttpStatus.BAD_REQUEST)
        const user = await this.authService.forgetPassword(forgetPasswordDto)
        //send message to forget-password-notification queue
        this.brokerService.queueForgetPassword({email: user.email, data: {token: user.resetToken}})

        return {message: `password reset link sent to ${user.email}`}
    }

    @Patch("forget-password/:resetToken")
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto){
        if(!resetPasswordDto.token)return new HttpException("token is required", HttpStatus.BAD_REQUEST)
        if(!resetPasswordDto.password || !resetPasswordDto.confirmPassword)return new HttpException("password and confirmPassword is required", HttpStatus.BAD_REQUEST)
        if(resetPasswordDto.password !== resetPasswordDto.confirmPassword)return new HttpException("password and confirmPassword must be the same", HttpStatus.BAD_REQUEST)
        const user = await this.authService.resetPassword(resetPasswordDto)
        await this.brokerService.queueResetPassword(user.email)
        const token = await user.generateToken()
        await this.cacheService.set(token, user, 5)
        return {user: {...user.toObject(), password: undefined}, token}
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleAuth(@Req() req: Request){
        
    }

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async GoogleAuthCallback(@Req() req: AuthReq, @Res() res: Response){
        const details = req.user
        const existing = await this.userService.getByEmail(details.email)
        if(existing){
            const passwordMatch = await existing.comparePassword(details.id)
            if(!passwordMatch)return res.status(401).json({message: "google account does not exist, login with email and password"})
            const authToken = await existing.generateToken()
                await this.cacheService.set(authToken, existing, 5)
                res.cookie("token", authToken)
                res.cookie("user", {...existing.toObject(), password: undefined})
            return res.status(200).json({user: {...existing.toObject(), password: undefined}, token: authToken})
        }
        const {email, firstName, lastName, id: password} = details
        const user = await this.userService.create({email, firstName, lastName, password})
        const authToken = await user.generateToken()
        res.cookie("token", authToken)
        res.cookie("user", {...user.toObject(), password: undefined})
        await this.cacheService.set(authToken, user, 5)
        return res.status(200).json({user: {...user.toObject(), password: undefined}, token: authToken})
    }


}