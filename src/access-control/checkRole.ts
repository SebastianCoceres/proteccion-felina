import type { User } from '@/payload-types'

export const checkRole = (allRoles: User['roles'] = [], user?: User): boolean => {
  return user?.roles?.some(role => allRoles.includes(role)) || false
}