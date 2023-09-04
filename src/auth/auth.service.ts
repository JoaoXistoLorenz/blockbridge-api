import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(user: Usuario): Promise<any> {
    const userDB = await this.usuariosService.findByLogin(user.login);
    if (!userDB) {
      throw new HttpException(`Usuário não existe!`, HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await bcrypt.compare(user.senha, userDB.senha);
    if (!areEqual) {
      throw new HttpException(
        'Erro ao realizar login, senha incorreta!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.createToken(userDB.login);
  }

  private createToken(login: string): any {
    const expiresIn = 60 * 60 * 24;
    const user = { login };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: any): Promise<Usuario> {
    const user = await this.usuariosService.findByLogin(payload.login);
    if (!user) {
      throw new HttpException('Token inválido.', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
