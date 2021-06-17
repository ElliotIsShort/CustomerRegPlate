package com.example.demo.services;

import com.example.demo.PlatesDTO;
import com.example.demo.models.Orders;
import com.example.demo.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlatesDTOService
{

    @Autowired
    private OrdersRepository ordersRepository;

    private PlatesDTO convertToPlatesDTO(Orders orders)
    {
        PlatesDTO platesDTO = new PlatesDTO();

        platesDTO.setPlatename(orders.getPlatename());

        return platesDTO;
    }

    public List<PlatesDTO> getAllPlatesDTO()
    {
        return ((List<Orders>)ordersRepository.findAll()).stream().map(this::convertToPlatesDTO).collect(Collectors.toList());
    }

    public PlatesDTO getPlatesDTOByPlatename(String platename)
    {
        List<PlatesDTO> platesDTOList = getAllPlatesDTO();

        for(PlatesDTO platesDTO : platesDTOList) {
            if(platesDTO.getPlatename().equals(platename)) {
                return platesDTO;
            }
        }
        return null;
    }
}