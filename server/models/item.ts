import { defineMongooseModel } from '#nuxt/mongoose'

export const Item = defineMongooseModel({
    name: 'Item',
    schema: {
        name: {
            type: 'string',
            required: true,
        },
        image_url: {
            type: 'string',
            required: true,
        },
        quantity: {
            type: 'Number',
            required: true,
        },
        lastUpdated: {
            type: 'Date',
            required: true,
        },
    },
})