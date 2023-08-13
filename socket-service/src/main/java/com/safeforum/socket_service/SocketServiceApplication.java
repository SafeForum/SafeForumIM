package main.java.com.safeforum.socket_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SocketServiceApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(SocketServiceApplication.class, args);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
