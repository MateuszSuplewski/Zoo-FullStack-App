package com.MateuszSuplewski.Zoo.orderedAnimal;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderedAnimalRepository extends JpaRepository<OrderedAnimal, Integer> {
}
