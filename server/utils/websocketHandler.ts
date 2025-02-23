import type { EventHandler, EventHandlerRequest } from 'h3'
import {websocketStore} from "~/server/routes/_ws";
import type {WebsocketMessage} from "#shared/websocketMessage.interface";

export const defineWebsocketEventHandler = <T extends EventHandlerRequest, D> (
    handler: EventHandler<T, D>,
    message: Omit<WebsocketMessage, 'message'>
): EventHandler<T, D> =>
    defineEventHandler<T>(async event => {
        try {
            const response = await handler(event)
            const peers = websocketStore.connectedPeers;
            if (peers) {
                for (const peer of peers.values()) {
                    peer.send({...message, message: response});
                }
            }
            return response
        } catch (err) {
            return err
        }
    })