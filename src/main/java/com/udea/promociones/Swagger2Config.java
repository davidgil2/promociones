package com.udea.promociones;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger2Config is a configuration class for Swagger 2, a tool for documenting RESTful APIs.
 * @Configuration - This annotation tags the class as a source of bean definitions
 * for the application context.
 * @EnableSwagger2 - This annotation enables the Swagger 2 for the application.
 */
@Configuration
@EnableSwagger2
public class Swagger2Config {

    /*
     * api() is a bean method that configures the Swagger 2 documentation for the application.
     * @return a Docket which is a builder provided by Swagger 2 that provides a global
     * level of configuration for the application.
     */
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .apis(RequestHandlerSelectors
                        .basePackage("com.udea.promociones"))
                .paths(PathSelectors.regex("/.*"))
                .build().apiInfo(apiEndPointsInfo());
    }

    /**
     * apiEndPointsInfo() is a private method that builds and returns the API information
     * that will be shown on the Swagger UI.
     * @return an ApiInfo that contains the information about the API.
     */
    private ApiInfo apiEndPointsInfo() {
        return new ApiInfoBuilder().title("Spring Boot REST API")
                .description("Driver Management REST API")
                .contact(new Contact("Laboratorio3@gmail.com", "Esteban Cossio y David Gil", "arquisoft@gmail.com"))
                .license("Apache 2.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
                .version("1.0.0")
                .build();
    }
}