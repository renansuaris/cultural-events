import { UserRoles } from '../../constants/roles';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userRole: UserRoles;
    }
  }
}