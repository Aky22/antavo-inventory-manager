export default defineEventHandler(async (event) => {
    try {
        return await Item.findOne({ _id: event.context.params?.id })
    }
    catch (error) {
        return error
    }
})