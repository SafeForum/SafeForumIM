package main.java.com.safeforum.socket_service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class SocketServiceConfig implements WebSocketMessageBrokerConfigurer {

    @Bean
    public SocketServiceRepository socketServiceRepository() {
        return new SocketServiceRepository() {
            /**
             * @param message
             */
            @Override
            public void saveMessage(String message) {

            }
        };
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // Enable a simple message broker
        config.setApplicationDestinationPrefixes("/app"); // Prefix for application-level messages
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket").withSockJS(); // Register the WebSocket endpoint
    }
}