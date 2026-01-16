import { hash } from 'bcryptjs';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { ConflictError, ForbiddenError, NotFoundError } from '../errors/AppErrors';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create({ name, email, password }: any) {

    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictError('E-mail já cadastrado');
    }

    const passwordHash = await hash(password, 10);
      
    const newUser = this.userRepository.create({ name, email, password: passwordHash, });

    await this.userRepository.save(newUser);
    const { password: _, ...userReturn } = newUser;
    return userReturn;
  }

  async update(id: string, userId: string, { name, email, password }: any) {
    if (id !== userId) {
        throw new ForbiddenError('Não tens permissao para alterar este usuário');
    }

    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new NotFoundError('Usuário não encontrado');

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await hash(password, 10);
    }

    await this.userRepository.save(user);
    const { password: _, ...userReturn } = user;
    return userReturn;
  }

  async delete(id: string, loggedUserId: string, userRole: string) {      
    if (id !== loggedUserId && userRole !== 'admin') {
        throw new ForbiddenError('Sem permissão');
    }

    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new NotFoundError('Usuário não encontrado');

    await this.userRepository.remove(user);
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId }); 
    if (!user) throw new NotFoundError('Usuario não encontrado');
    const { password: _, ...userReturn } = user;
    return userReturn;
  }

  async listAll(userRole: string) {
    if (userRole !== 'admin') {
      throw new ForbiddenError('Acesso negado: Apenas administradores');
    }

    const users = await this.userRepository.find();
    return users.map(user => {
      const { password: _, ...userData } = user;
      return userData;
    });
  }

  async updateRole(id: string, role: any, loggedUserId: string, userRole: string) {
    if (userRole !== 'admin') {
      throw new ForbiddenError('Apenas administradores podem alterar permissões');
    }
      
    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new NotFoundError('Usuário não encontrado');
    user.role = role;
    await this.userRepository.save(user);
  }
}