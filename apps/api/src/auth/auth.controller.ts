import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, JwtPayload } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { IsPublic } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate a user and return JWT token',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      admin: {
        summary: 'Admin Login',
        description: 'Login as an admin user',
        value: {
          email: 'admin@rmpos.com',
          password: 'admin123',
        },
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth('jwt')
  @Get('profile')
  getProfile(@Request() req: { user: JwtPayload }) {
    return this.authService.validateUser(req.user);
  }

  /* @IsPublic()
  @Post('register')
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user account',
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      user: {
        summary: 'Register as User',
        description: 'Register a new user account',
        value: {
          firstName: 'Ana',
          lastName: 'López',
          email: 'ana.lopez@email.com',
          password: 'password123',
        },
      },
    },
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  } */
}
