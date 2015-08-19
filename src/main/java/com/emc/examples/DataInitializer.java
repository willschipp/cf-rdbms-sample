package com.emc.examples;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import com.emc.examples.domain.Person;
import com.emc.examples.domain.PersonRepository;

public class DataInitializer implements ApplicationListener<ContextRefreshedEvent> {

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		PersonRepository repository = event.getApplicationContext().getBean(PersonRepository.class);
		if (repository.count() <= 0) {
			//nothing in there, setup some data
			for (int i=0;i<2;i++) {
				Person person = new Person();
				person.setFirstName("John");
				person.setLastName("Doe");
				try {
					person.setDateOfBirth(new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1984"));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				//save
				repository.save(person);
			}//end if
		}//end if
		
	}

}
