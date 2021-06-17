package com.example.demo.repositories;

import com.example.demo.OrdersDTO;
import com.example.demo.services.OrdersDTOService;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class OrderDetailsRepository {
    @Autowired
    private OrdersDTOService ordersDTOService;

    @GetMapping("/orderdetails")
    public List<OrdersDTO> getAllOrderDetails()
    {
        return ordersDTOService.getAllOrdersDTO();
    }

    @GetMapping("/orderdetails/{id}")
    public OrdersDTO getOrdersById(@PathVariable("id") int ordersId)
    {
        OrdersDTO ordersDTO = ordersDTOService.getOrdersDTOById(ordersId);

        if(ordersDTO != null)
        {
            return ordersDTO;
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order ID not found");
    }
}
