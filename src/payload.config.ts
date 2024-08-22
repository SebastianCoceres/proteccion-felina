import { viteBundler as bundler } from "@payloadcms/bundler-vite"
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload/config'
import { Cats, Media, Users } from './collections'
import AdminUser from './collections/Users'
import { Logo } from './components/graphics/Logo'
import { Icon } from './components/graphics/Icon'
import seoPlugin from '@payloadcms/plugin-seo';

export default buildConfig({
  editor: slateEditor({}),
  admin: {
    user: AdminUser.slug,
    bundler: bundler(),
    css: path.resolve(__dirname, 'styles/global.css'),
    avatar: 'gravatar',
    components: {
      graphics: {
        Logo,
        Icon
      },

    },
    meta: {
      titleSuffix: '- Protección Felina',
      favicon: '/assets/plataforma-proteccion-felina.png',
      ogImage: '/assets/plataforma-proteccion-felina.png',
    },
  },
  collections: [Users, Cats, Media],
  upload: {
    limits: {
      fileSize: 10000000,
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  plugins: [
    seoPlugin({
      collections: [
        'cats',
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc, collection, ...rest }) => {
        // console.log({ rest, doc })

        return `Adopta a ${(doc as any)?.name?.value} - Plataforma Protección Felina`

      },
      generateDescription: ({ doc }) => {
        return (doc as any)?.bodydescription?.value || ''
      },
      generateImage: ({ doc }) => {
        return (doc as any)?.image?.value
      },
      generateURL: ({ collection, id }) => {
        return `https://proteccionfelina.com/${collection?.slug}/${id}`
      }
    })
  ],
  csrf: [
    // whitelist of domains to allow cookie auth from
    'https://protecionfelina.com',
  ]
})

