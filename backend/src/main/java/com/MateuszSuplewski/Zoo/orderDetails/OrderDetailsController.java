package com.MateuszSuplewski.Zoo.orderDetails;


import com.MateuszSuplewski.Zoo.animal.Animal;
import com.MateuszSuplewski.Zoo.animal.AnimalRepository;
import com.MateuszSuplewski.Zoo.animal.Species;
import com.MateuszSuplewski.Zoo.auth.AuthenticationService;
import com.MateuszSuplewski.Zoo.orderedAnimal.OrderedAnimal;
import com.MateuszSuplewski.Zoo.orderedAnimal.OrderedAnimalRepository;
import com.MateuszSuplewski.Zoo.user.User;
import com.MateuszSuplewski.Zoo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private UserRepository userRepository;
    private final AuthenticationService service;

    @GetMapping
    public ResponseEntity<List<OrderDetails>> getAllOrders(){
        List<OrderDetails> orderDetails = orderDetailsRepository.findAll();

        return ResponseEntity.ok(orderDetails);
    }

    @PostMapping("/user")
    public ResponseEntity<List<OrderDetails>> getUserOrders(@RequestBody String token){
        Integer id = service.findUserIdFromToken(token);

        List<OrderDetails> orderDetails = orderDetailsRepository.findAllByUser_Id(id);
        return ResponseEntity.ok(orderDetails);
    }


    @PostMapping
    public ResponseEntity<OrderDetails> saveOrder(@RequestBody OrderDetails orderDetails){

        var id = orderDetails.getUser().getId();

        User user = userRepository.findById(id).orElseThrow();
        orderDetails.setUser(user);

        List<OrderedAnimal> orderedAnimals = orderDetails.getOrderedAnimals();

        for(OrderedAnimal orderedAnimal  : orderedAnimals){
            orderedAnimal.setOrderDetails(orderDetails);

        }

        orderDetails.setOrderedAnimals(orderedAnimals);
        orderDetailsRepository.save(orderDetails);

        return ResponseEntity.ok(orderDetails);
    }
}
