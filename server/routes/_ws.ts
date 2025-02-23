export const websocketStore = {
    connectedPeers: new Map()
};

export default defineWebSocketHandler({
    open(peer) {
        const peerId = peer.toString();
        websocketStore.connectedPeers.set(peerId, peer);
        peer.send({ user: "server", message: `Welcome ${peerId}!`});
    },
    message(peer, message) {
        if (message.text().includes("ping")) {
            peer.send({ user: "server", message: "pong" });
        }
    },
    close(peer) {
        const peerId = peer.toString();
        websocketStore.connectedPeers.delete(peerId);
        console.log(`Goodbye ${peerId}`);
    },
});