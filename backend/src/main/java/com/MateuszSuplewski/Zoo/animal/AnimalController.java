package com.MateuszSuplewski.Zoo.animal;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/animals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private SpeciesRepository speciesRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveAnimal(@RequestBody Animal animal){

        Species animalSpecies = animal.getSpecies();
        String speciesName = animalSpecies.getName();

        Species species = speciesRepository.findByName(speciesName);

        if(species) { // waruenk
            // stworz animala i dodaj za pomoca save

        }

//        animalRepository.save(animal);
//        return ResponseEntity.ok("Animal added");
    }
}
