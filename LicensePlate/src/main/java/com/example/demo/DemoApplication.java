package com.example.demo;

import io.swagger.annotations.Api;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Import(SpringDataRestConfiguration.class)
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {SpringApplication.run(DemoApplication.class, args);
    }
}
