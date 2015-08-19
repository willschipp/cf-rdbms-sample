package com.emc.examples;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

/**
 * bootstrap your application (start it up with a Spring Application Context)
 * @author will
 *
 */
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class,args);
	}
	
	/**
	 * only added so that it automatically creates the schema or updates it if missing on the datasource
	 * @return
	 */
	@Bean
	JpaVendorAdapter jpaVendorAdapter() {
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setGenerateDdl(true);
		return vendorAdapter;
		
	}
	
	@Bean
	@Profile("default")
	DataInitializer dataInitializer() {
		return new DataInitializer();
	}

}
