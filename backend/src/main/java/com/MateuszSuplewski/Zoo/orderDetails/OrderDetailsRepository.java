package com.MateuszSuplewski.Zoo.orderDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderDetailsRepository extends  JpaRepository<OrderDetails, Integer> {
    List<OrderDetails> findAllByUser_Id(Integer id);
}

