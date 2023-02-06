package com.MateuszSuplewski.Zoo.orderedAnimal;

import com.MateuszSuplewski.Zoo.animal.Animal;
import com.MateuszSuplewski.Zoo.orderDetails.OrderDetails;
import com.MateuszSuplewski.Zoo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "ordered_animal")
public class OrderedAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double money;

    @ManyToOne
    @JoinColumn(name =  "animal_id", referencedColumnName = "id")
    private Animal animal;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_details_id", referencedColumnName = "id")
    private OrderDetails orderDetails;
}
