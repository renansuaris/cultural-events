import { hash } from 'bcryptjs';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { AppError } from '../errors/AppErrors';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create({ name, email, password }: any) {

    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new AppError('E-mail já cadastrado', 409);
    }

    const passwordHash = await hash(password, 10);
      
    const newUser = this.userRepository.create({ name, email, password: passwordHash, });

    await this.userRepository.save(newUser);
    const { password: _, ...userReturn } = newUser;
    return userReturn;
  }

  async update(id: string, userId: string, { name, email, password }: any) {
    if (id !== userId) {
        throw new AppError('Você não tem permissão para alterar este usuário', 403);
    }

    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new AppError('Usuário não encontrado', 404);

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await hash(password, 10);
    }

    await this.userRepository.save(user);
    const { password: _, ...userReturn } = user;
    return userReturn;
  }

  async delete(id: string, loggedUserId: string) {
    const requester = await this.userRepository.findOneBy({ id: loggedUserId });
      
    if (id !== loggedUserId && requester?.role !== 'admin') {
        throw new AppError('Sem permissão', 403);
    }

    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new AppError('Usuário não encontrado', 404);

    await this.userRepository.remove(user);
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId }); 
    if (!user) throw new AppError('Usuário não encontrado', 404);
    const { password: _, ...userReturn } = user;
    return userReturn;
  }

  async listAll(loggedUserId: string) {
    const requester = await this.userRepository.findOneBy({ id: loggedUserId });
    if (requester?.role !== 'admin') {
      throw new AppError('Acesso negado: Apenas administradores', 403);
    }

    const users = await this.userRepository.find();
    return users.map(user => {
      const { password: _, ...userData } = user;
      return userData;
    });
  }

  async updateRole(id: string, role: any, loggedUserId: string) {
    const requester = await this.userRepository.findOneBy({ id: loggedUserId });
    if (requester?.role !== 'admin') {
      throw new AppError('Apenas administradores podem alterar permissões', 403);
    }
      
    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new AppError('Usuário não encontrado', 404);

    user.role = role;
    await this.userRepository.save(user);
  }
}