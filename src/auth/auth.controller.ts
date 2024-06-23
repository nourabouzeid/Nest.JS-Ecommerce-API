import { Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginAuthDto,SignupAuthDto } from "./dto";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}
    
    @Post('signup')
    @ApiCreatedResponse({description:'User Registeration'})
    @ApiBody({type:SignupAuthDto})
    signup(@Body() dto: SignupAuthDto){
        return this.authService.signup(dto)
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOkResponse({description:'User Login'})
    @ApiUnauthorizedResponse({description:'Unauthorized access'})
    @ApiBody({type:LoginAuthDto})
    login(@Body() dto: LoginAuthDto){
        return this.authService.login(dto)
    }

}