import type { CollectionConfig } from 'payload/types'

import { isAdmin } from '../../access-control/isAdmin'
import isSelf from '../../access-control/isSelf'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'


export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: isSelf,
    create: isAdmin,
    update: isSelf,
    delete: isAdmin,
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 5,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'gestor',
          value: 'gestor',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: isAdmin,
        create: isAdmin,
        update: isAdmin,
      },
      admin: {
        position: 'sidebar'
      }
    },
  ],
  timestamps: true,
}

export default Users