# Inventory manager system
[![Lint code](https://github.com/Aky22/antavo-inventory-manager/actions/workflows/lint.yaml/badge.svg)](https://github.com/Aky22/antavo-inventory-manager/actions/workflows/lint.yaml)

This is a simple inventory manager system built with Nuxt.js and Tailwind CSS.

## How to run the project
### Development
To run the project in development mode, you need to run the following commands:
```bash
 docker-compose -f docker-compose.dev.yml up
```

### Production
To run the project in production mode, you need to run the following commands:
```bash
 docker-compose up
```

## Design Choices

### State Management

I used Pinia for state management. It is a modern alternative to Vuex, and it is built with the Composition API in mind.
It was a good choice for this project because it is simple to use and has a small bundle size.
I wanted to separate the state management from the components, and Pinia allowed me to do that.

### Synchronization intervals
I used WebSockets to keep the inventory in sync across all clients.
It allows me to update the inventory in real-time without the need to refresh the page.
I used the `useWebsocket` composable to handle the WebSocket connection and the synchronization of the inventory.

### Conflict resolution logic
In this project, I used WebSockets to keep the inventory in sync across all clients.
Right now all the clients are connected to the same WebSocket server, and they all receive the same updates.
It means that the client that updates the inventory will receive the update message from the server too.
To avoid displaying the same data twice, I show a message that says that the data is updated, and a button to refresh the list.

If two clients update the inventory at the same time, the first update will be applied, and the second update will be rejected.
It should be improved to handle conflicts in a better way, because right now the one that finishes the request earlier will be the winner.
However, the other user will be notified that the data was updated and will be able to refresh the list.

### Afterthoughts
I had a lot of fun building this project. I learned a lot about Nuxt.js and Tailwind CSS. I used Vue.js a lot in the past, but I never used Nuxt.js before. It was a good opportunity to learn more about it.
I tried to keep the project simple and focused on the main features that described in the assessment description.
My main focus was to stick to main principles, like separation of concerns, KISS, DRY, YAGNI and SOLID.
In this manner, I used shared interfaces to avoid code repetition and implement only the currently necessary features.

## Possible Improvements
 - Add tests
 - Improve conflict resolution logic
 - Add authentication
 - Add pagination
 - Add search functionality
 - Add filters