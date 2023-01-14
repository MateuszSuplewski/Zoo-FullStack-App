package com.MateuszSuplewski.Zoo.animal;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Species species;
}
