import { hash } from 'bcryptjs';
import { z } from 'zod';
import { User } from '../entities/User';
import { ConflictError, ForbiddenError, NotFoundError } from '../errors/AppErrors';
import { createUserSchema, updateUserSchema, updateRoleSchema } from '../schemas/user.schema';
import { Repository } from 'typeorm/repository/Repository';
import { UserRoles } from '../constants/roles';

type CreateUserDTO = z.infer<typeof createUserSchema>['body'];
type UpdateUserDTO = z.infer<typeof updateUserSchema>['body'];
type UpdateRoleDTO = z.infer<typeof updateRoleSchema>['body'];

export class UserService {

  constructor(private userRepository: Repository<User>) {}

  async create(data: CreateUserDTO) {
    const userExists = await this.userRepository.findOneBy({ email: data.email });
    if (userExists) {
      throw new ConflictError('E-mail já cadastrado');
    }

    const passwordHash = await hash(data.password, 10);
      
    const newUser = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
    });

    await this.userRepository.save(newUser);
    const { password: _, ...userReturn } = newUser;
    return userReturn;
  }

  async update(id: string, userId: string, data: UpdateUserDTO) {
    if (id !== userId) {
        throw new ForbiddenError('Não tens permissao para alterar este usuário');
    }

    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new NotFoundError('Usuário não encontrado');

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;

    if (data.password) {
      user.password = await hash(data.password, 10);
    }

    await this.userRepository.save(user);
    const { password: _, ...userReturn } = user;
    return userReturn;
  }

  async delete(id: string, loggedUserId: string, userRole: UserRoles) {      
    if (id !== loggedUserId && userRole !== UserRoles.ADMIN) {
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

  async listAll(userRole: UserRoles) {
    if (userRole !== UserRoles.ADMIN) {
      throw new ForbiddenError('Acesso negado: Apenas administradores');
    }

    return await this.userRepository.find();
  }

  async updateRole(id: string, role: UpdateRoleDTO['role'], loggedUserId: string, userRole: UserRoles) {
    if (userRole !== UserRoles.ADMIN) {
      throw new ForbiddenError('Apenas administradores podem alterar permissões');
    }
      
    const user = await this.userRepository.findOneBy({ id }); 
    if (!user) throw new NotFoundError('Usuário não encontrado');

    user.role = role;
    await this.userRepository.save(user);
  }
}