package com.emc.examples.endpoint;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.emc.examples.domain.Person;
import com.emc.examples.domain.PersonRepository;

@RestController
@RequestMapping("/data/person")
public class PersonEndpoint {

	@Autowired
	private PersonRepository personRepository;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<Person> findAll() {
		return personRepository.findAll(); 
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public Person save(@RequestBody Person person) {
		return personRepository.save(person);
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.PUT)
	public Person update(@PathVariable("id") String id,@RequestBody Person person) {
		return personRepository.save(person);
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public Person update(@PathVariable("id") Long id) {
		return personRepository.findOne(id);
	}	
	
	@RequestMapping(value="/{id}",method=RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id,HttpServletResponse response) {
		personRepository.delete(id);
		response.setStatus(HttpStatus.OK.value());
	}
	
	@RequestMapping(value="/fields",method=RequestMethod.GET)
	public List<String> getTableComposition() {
		List<String> list = new LinkedList<String>();
		//reflect
		for (Field field : Person.class.getDeclaredFields()) {
			list.add(field.getName());
		}//end for
		return list;
	}
	
}
