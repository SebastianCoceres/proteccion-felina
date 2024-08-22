import type { AccessArgs } from 'payload/config'

import { checkRole } from './checkRole'
import type { User } from '../payload-types'

type isGestor = (args: AccessArgs<unknown, User>) => boolean

export const isGestor: isGestor = ({ req: { user } }) => {
  return checkRole(['admin','gestor'], user)
}