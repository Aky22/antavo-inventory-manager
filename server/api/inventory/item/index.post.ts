import {defineWebsocketEventHandler} from "~/server/utils/websocketHandler";
import {WebSocketMessageTypes} from "#shared/websocketMessage.interface";

export default defineWebsocketEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        return await Item.insertOne(body);
    }
    catch (error) {
        return error
    }
}, { type: WebSocketMessageTypes.POST, entity: 'InventoryItem' })