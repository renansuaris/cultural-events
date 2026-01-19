import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { InvalidCredentialsError } from "../errors/AppErrors";
import { Repository } from "typeorm/repository/Repository";

type LoginRequest = { email: string; password: string; };

export class AuthService {
  constructor(private userRepository: Repository<User>) {}

  async logar({ email, password }: LoginRequest) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'] 
    });

    if (!user) {
      throw new InvalidCredentialsError('Email ou senha incorretos');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new InvalidCredentialsError('Email ou senha incorretos');
    }

    const token = sign({ id: user.id, role: user.role }, 
      process.env.JWT_SECRET ?? '', { expiresIn: '3d' });

    const { password: _, ...userReturn } = user;

    return {
      user: userReturn,
      token,
    };
  }
}