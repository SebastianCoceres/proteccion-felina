import { isAdmin } from '../access-control/isAdmin'
import isSelf from '../access-control/isSelf'
import { CollectionConfig } from 'payload/types'
import { CIUDADES } from '../constants'
import { isGestor } from '../access-control/isGestor'

/**
 * @description Registro de gatos
 */
export const Cats: CollectionConfig = {
    slug: 'cats',
    labels: {
        singular: 'Gato',
        plural: 'Gatos',
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'birthDate'],
    },
    versions: {
        drafts: {
            validate: false,
        }
    },
    access: {
        read: isGestor,
        create: isGestor,
        update: isGestor,
        delete: isGestor,
        // admin: ({ req: { user } }) => checkRole(['admin', 'user'], user),
    },
    fields: [
        {
            type: 'upload',
            name: 'image',
            relationTo: 'media',
            required: true,
            admin: {
                position: 'sidebar',
            }
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Nombre',
                    required: true,
                }, {
                    type: 'date',
                    name: 'birthDate',
                    label: "Nacimiento (Aprox)",
                    required: true,
                    admin: {
                        date: {
                            overrides: {
                                dateFormat: 'yyyy-MM-dd',
                            }
                        }
                    }
                },
                {
                    type: 'select',
                    name: 'location',
                    label: 'Ubicación',
                    options: [...CIUDADES.map((city) => ({ label: city, value: city }))],
                    defaultValue: 'Zaragoza'
                },
                {
                    type: 'select',
                    name: 'sex',
                    label: 'Sexo',
                    options: [
                        {
                            label: 'macho',
                            value: 'macho',
                        },
                        {
                            label: 'hembra',
                            value: 'hembra',
                        },
                    ],
                },


            ]
        },
        {
            type: 'richText',
            name: 'bodydescription',
            label: 'Descripción',
        },
        {
            type: 'group',
            name: 'health',
            label: 'Salud',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'group',
                            name: 'revisions',
                            label: false,
                            fields: [
                                {
                                    type: 'checkbox',
                                    name: 'vaccinated',
                                    label: 'Vacunado',
                                }, {
                                    type: 'checkbox',
                                    name: 'sterilized',
                                    label: 'Esterilizado',
                                }, {
                                    type: 'checkbox',
                                    name: 'dewormed',
                                    label: 'Desparasitado',
                                }
                            ]
                        }, {
                            type: 'number',
                            name: 'weight',
                            label: 'Peso (Kg)',
                            validate: (value: number) => value >= 0 ? true : 'Peso debe ser mayor a 0',
                        },
                    ]
                },
                {
                    type: 'richText',
                    name: 'notes',
                    label: 'Aclaraciones',
                }
            ]
        }, {
            type: 'select',
            name: 'availability',
            label: 'Disponibilidad',
            options: [
                {
                    label: 'En adopción',
                    value: 'disponible',
                }, {
                    label: 'Adoptado',
                    value: 'no disponible',
                }
            ],
            defaultValue: 'disponible',
            admin: {
                position: 'sidebar'
            }
        },
        {
            type: 'group',
            name: 'characteristics',
            label: 'Características',
            admin: {
                position: 'sidebar'
            },
            fields: [
                {
                    type: 'select',
                    name: 'personality',
                    label: 'Personalidad',
                    hasMany: true,
                    options: [
                        {
                            label: 'tranquilo',
                            value: 'tranquilo',
                        }, {
                            label: 'juguetón',
                            value: 'jugueton',
                        }, {
                            label: 'cariñoso',
                            value: 'carinoso',
                        }, {
                            label: 'amigable',
                            value: 'amigable',
                        }, {
                            label: 'tímido',
                            value: 'timido',
                        }, {
                            label: 'miedoso',
                            value: 'miedoso',
                        }, {
                            label: 'independiente',
                            value: 'independiente',
                        }
                    ]
                }, {
                    type: 'select',
                    name: 'compatibility',
                    label: 'Compatibilidad con otros gatos',
                    options: [
                        {
                            label: 'compatible',
                            value: 'compatible',
                        }, {
                            label: 'incompatible',
                            value: 'incompatible',
                        }
                    ]
                }
            ]
        }



    ],
}

export default Cats
