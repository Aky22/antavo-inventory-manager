import {defineWebsocketEventHandler} from "~/server/utils/websocketHandler";
import {WebSocketMessageTypes} from "#shared/websocketMessage.interface";
export default defineWebsocketEventHandler(async (event) => {
    const body = await readBody(event)
    const item = await Item.findOne({_id: event.context.params?.id});
    const query = getQuery(event)
    if(new Date(item?.lastUpdated as string).valueOf() !== new Date(query.lastUpdated as string).valueOf()) {
        throw createError({
            status: 409,
            message: 'Data is out of date',
        })
    }
    return Item.findOneAndUpdate({_id: event.context.params?.id}, body, {upsert: false, new: true});
}, { type: WebSocketMessageTypes.PATCH, entity: 'InventoryItem' })