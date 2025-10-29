import type { User } from "@/types/users";

export function hasPermission(user: User | null, requiredPermission: string): boolean {
  if (!user || !user?.permissions)
    return false;

  return user?.permissions.permissionViews.includes(requiredPermission);
}
