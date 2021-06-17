package com.example.demo.services;

import com.example.demo.OrdersDTO;
import com.example.demo.models.Orders;
import com.example.demo.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdersDTOService
{
    @Autowired
    private OrdersRepository ordersRepository;

    private OrdersDTO convertToOrdersDTO(Orders orders)
    {
        OrdersDTO ordersDTO = new OrdersDTO();

        ordersDTO.setOrderid(orders.getOrderid());
        ordersDTO.setPlatename(orders.getPlatename());
        ordersDTO.setPrice(orders.getPrice());
        ordersDTO.setFname(orders.getCustomerid().getFname());
        ordersDTO.setSname(orders.getCustomerid().getSname());

        return ordersDTO;
    }

    public List<OrdersDTO> getAllOrdersDTO()
    {
        return ((List<Orders>)ordersRepository.findAll()).stream().map(this::convertToOrdersDTO).collect(Collectors.toList());
    }

    public OrdersDTO getOrdersDTOById(int id)
    {
        List<OrdersDTO> ordersDTOList = getAllOrdersDTO();

        for(OrdersDTO ordersDTO : ordersDTOList) {
            if(ordersDTO.getOrderid() == id) {
                return ordersDTO;
            }
        }
        return null;
    }
}
