import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto } from '../../../auth/dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login as customer' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, description: 'JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.login(body.email, body.password);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { access_token: token };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new customer' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, description: 'Customer registered' })
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }
}
