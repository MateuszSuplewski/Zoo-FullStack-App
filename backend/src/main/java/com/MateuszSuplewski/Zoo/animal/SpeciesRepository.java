package com.MateuszSuplewski.Zoo.animal;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeciesRepository extends JpaRepository<Species, Integer> {
    Species findByName(String name);
}
