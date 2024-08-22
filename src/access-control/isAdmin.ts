import type { AccessArgs } from 'payload/config'

import { checkRole } from './checkRole'
import type { User } from '../payload-types'

type isAdmin = (args: AccessArgs<unknown, User>) => boolean

export const isAdmin: isAdmin = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}