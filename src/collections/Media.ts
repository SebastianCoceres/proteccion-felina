import { isGestor } from '../access-control/isGestor'
import { anyone } from '../access-control/anyone'
import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Imagen',
    plural: 'Imágenes',
  },
  access: {
    read: anyone,
    update: isGestor,
    create: isGestor,
    delete: isGestor
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined,
        position: 'centre',
      }, {
        name: 'default',
        width: undefined,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    }
  ],
}

export default Media