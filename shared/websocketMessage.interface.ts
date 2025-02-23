export interface WebsocketMessage {
    type: WebSocketMessageTypes,
    message: string,
    entity: string
}

export enum WebSocketMessageTypes {
    PATCH = 'PATCH',
    POST = 'POST',
    DELETE = 'DELETE'
}
