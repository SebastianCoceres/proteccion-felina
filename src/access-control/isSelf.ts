import type { Access } from 'payload/types'

import { checkRole } from '../access-control/checkRole'

export const isSelf: Access = ({ req: { user } }) => {
  if (!user) return false

  return checkRole(['admin'], user) || {
    id: {
      equals: user.id,
    },
  }
}

export default isSelf