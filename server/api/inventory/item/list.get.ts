export default defineEventHandler(async () => {
    try {
        return await Item.find()
    }
    catch (error) {
        return error
    }
})