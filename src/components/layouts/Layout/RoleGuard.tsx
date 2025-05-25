import { UserRole } from "@models";
import { useAuthStore } from "@stores";

interface RoleGuardProps {
  roles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard = ({ roles, children }: RoleGuardProps) => {
  const { role } = useAuthStore();
  return roles.includes(role!) ? children : null;
};
