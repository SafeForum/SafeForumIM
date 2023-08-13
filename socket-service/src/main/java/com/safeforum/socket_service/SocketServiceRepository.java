package main.java.com.safeforum.socket_service;

import org.springframework.stereotype.Repository;

@Repository
public interface SocketServiceRepository {

    void saveMessage(String message);
}
