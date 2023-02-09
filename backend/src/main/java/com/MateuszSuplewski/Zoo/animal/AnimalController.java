package com.MateuszSuplewski.Zoo.animal;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/animals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private SpeciesRepository speciesRepository;

    @GetMapping
    public ResponseEntity<List<Animal>> getAllAnimals(){
        return ResponseEntity.ok(animalRepository.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Optional <Animal>> getAnimal(@PathVariable Integer id){
        Optional<Animal> animal = animalRepository.findById(id);
        return ResponseEntity.ok(animal);
    }

    @PostMapping
    public ResponseEntity<Animal> saveAnimal(@RequestBody Animal animal){

        Species animalSpecies = animal.getSpecies();
        String speciesName = animalSpecies.getName();
        Species foundSpecies = speciesRepository.findByName(speciesName);

        if(foundSpecies != null) {
            animal.setSpecies(foundSpecies);
        }

        animalRepository.save(animal);
        return ResponseEntity.ok(animal);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Integer> deleteAnimal(@PathVariable Integer id){
        animalRepository.deleteById(id);
        return ResponseEntity.ok(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable Integer id, @RequestBody Animal animal){

        Species animalSpecies = animal.getSpecies();
        String speciesName = animalSpecies.getName();
        Species foundSpecies = speciesRepository.findByName(speciesName);

        Animal updatedAnimal = Animal.builder()
                .id(id)
                .name(animal.getName())
                .age(animal.getAge())
                .weight(animal.getWeight())
                .description(animal.getDescription())
                .species(foundSpecies != null ? foundSpecies : animal.getSpecies())
                .image(animal.getImage())
                .build();

        animalRepository.save(updatedAnimal);
        return ResponseEntity.ok(updatedAnimal);
    }
}