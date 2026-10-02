package main

import (
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true;
	},
}

var clients = make(map[*websocket.Conn]bool)

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil);
	if err != nil {
		log.Println("WebSocket upgrade error:", err);
		return;
	}

	defer conn.Close(); // ensures the connection is properly closed

	clients[conn] = true;
	log.Println("Client connected");

	defer delete(clients, conn);

	for {
		messageType, message, err := conn.ReadMessage();
		if err != nil {
			log.Println("Client disconnected");
			break;
		}

		// Broadcast the message to every other connected client.
		for client := range clients {
			if client == conn {
				continue;
			}

			err := client.WriteMessage(messageType, message);
			if err != nil {
				log.Println("Write error:", err);
			}
		}
	}
}

func main() {
	http.HandleFunc("/ws", handleWebSocket); // attaches server to /ws endpoint

	log.Println("Signaling server listening on :8080");

	err := http.ListenAndServe(":8080", nil);
	if err != nil {
		log.Fatal(err);
	}
}