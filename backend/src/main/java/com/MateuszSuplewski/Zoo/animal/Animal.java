package com.MateuszSuplewski.Zoo.animal;


import com.MateuszSuplewski.Zoo.orderedAnimal.OrderedAnimal;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "animal")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer age;
    private Double weight;
    private String description;
    private String image;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "species_id", referencedColumnName = "id")
    private Species species;

    @JsonIgnore
    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    private List<OrderedAnimal> orderedAnimals;
}
