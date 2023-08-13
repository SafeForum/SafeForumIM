package main.java.com.safeforum.socket_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketServiceController {

    @Autowired
    private SocketServiceRepository repository;

    public SocketServiceController(SocketServiceRepository repository) {
        this.repository = repository;
    }

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public String handleMessage(String message) {
        // Handle the incoming message
        repository.saveMessage(message);
        return "Received message: " + message;
    }
}
