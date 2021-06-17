package com.example.demo.repositories;

import com.example.demo.models.Customer;
import com.example.demo.models.Orders;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Api(tags = "Address Entity")
@RepositoryRestResource(collectionResourceRel = "order", path = "order")
@CrossOrigin
public interface OrdersRepository extends PagingAndSortingRepository<Orders, Integer>
{

//    @Query("select s from Orders s where s.platename like '%?1%'")
//    List<Orders> findPlatenameByPlate(@Param("platename") String platename);
//
//    List<Orders>findByPlatename(@Param("platename") String platename);
//
//    List<Orders>findByPlatenameContaining(String platename);

    @Query("FROM Orders WHERE UPPER(platename) LIKE %?#{[0].toUpperCase()}%")
    List<Orders>findByPlatenameContainingIgnoreCase(String platename);

}
