package hu.project.formula10;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class Formula10Application {

    public static void main(String[] args) {
        SpringApplication.run(Formula10Application.class, args);
    }

}
