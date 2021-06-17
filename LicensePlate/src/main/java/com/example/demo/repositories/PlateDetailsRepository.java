package com.example.demo.repositories;

import com.example.demo.PlatesDTO;
import com.example.demo.services.PlatesDTOService;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class PlateDetailsRepository {
    @Autowired
    private PlatesDTOService platesDTOService;

    @GetMapping("/platedetails")
    public List<PlatesDTO> getAllPlateDetails() { return platesDTOService.getAllPlatesDTO(); }

    @GetMapping("/platedetails/{platename}")
    public PlatesDTO getOrdersByPlatename(@PathVariable("platename") String platename)
    {
        PlatesDTO platesDTO = platesDTOService.getPlatesDTOByPlatename(platename);

        if(platesDTO != null)
        {
            return platesDTO;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plate name not found");
    }
}