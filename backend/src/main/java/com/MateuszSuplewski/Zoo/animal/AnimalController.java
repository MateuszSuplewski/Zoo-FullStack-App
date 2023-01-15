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

    @GetMapping // działą git
    public ResponseEntity<List<Animal>> getAllAnimals(){
        List<Animal> animals = animalRepository.findAll();

        return ResponseEntity.ok(animals);
    }

    @PostMapping // zrobić "back reference"
    public ResponseEntity<String> saveAnimal(@RequestBody Animal animal){

        Species animalSpecies = animal.getSpecies();
        String speciesName = animalSpecies.getName();

        var species = speciesRepository.findByName(speciesName);

        if(species != null) {
            animal.setSpecies(species);
        }

        animalRepository.save(animal);
        return ResponseEntity.ok("Animal added");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAnimal(@PathVariable Integer id){
        animalRepository.deleteById(id);
        return ResponseEntity.ok("Animal deleted");
    }

    @PutMapping("{id}") // działa super!
    public ResponseEntity<String> updateAnimal(@PathVariable Integer id, @RequestBody Animal animal){

        Animal newAnimal = Animal.builder()
                .id(id)
                .name(animal.getName())
                .age(animal.getAge())
                .weight(animal.getWeight())
                .description(animal.getDescription())
                .species(animal.getSpecies())
                .build();

        animalRepository.save(newAnimal);

        return ResponseEntity.ok("Animal updated");
    }
}
