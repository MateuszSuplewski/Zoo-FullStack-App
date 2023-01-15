package com.MateuszSuplewski.Zoo.animal;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "animal")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer age;
    private Integer weight;
    private String description;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "species_id", referencedColumnName = "id")
    @JsonManagedReference
    private Species species;
}
