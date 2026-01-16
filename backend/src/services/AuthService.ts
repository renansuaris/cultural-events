import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { AppError } from "../errors/AppErrors";

type LoginRequest = {
  email: string;
  password: string;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async logar({ email, password }: LoginRequest) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new AppError('Email ou senha incorretos', 401);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Email ou senha incorretos', 401);
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '3d' });

    const { password: _, ...userReturn } = user;

    return {
      user: userReturn,
      token,
    };
  }
}