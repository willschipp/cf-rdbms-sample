package com.emc.examples.domain;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * interface to be used by Spring Data JPA to create the actual implementation classes
 * @author will
 *
 */
public interface PersonRepository extends JpaRepository<Person, Long> {

}
