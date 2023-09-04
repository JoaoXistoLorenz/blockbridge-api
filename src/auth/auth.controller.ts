import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SafeResponse } from 'src/configs/utils.config';
import { Usuario } from 'src/usuario/usuario.entity';
import { Response } from '../configs/response.config';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SafeResponse()
  public async login(@Body() user: Usuario): Promise<Response> {
    return new Response(
      await this.authService.login(user),
      'Usuário autenticado com sucesso',
    );
  }
}
