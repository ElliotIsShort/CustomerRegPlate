package com.example.demo.repositories;

import com.example.demo.models.Customer;
import io.swagger.annotations.Api;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Api(tags = "Address Entity")
@RepositoryRestResource(collectionResourceRel = "customer", path="customer")
@CrossOrigin
public interface CustomerRepository extends CrudRepository<Customer, Integer>
{
    List<Customer> findByFname(@Param("fname") String fname);

    List<Customer> findByFnameContainingIgnoreCase(@Param("fname") String fname);

    @Query("select s from Customer s where s.fname = ?1 and s.sname = ?2")
    List<Customer> findCustomerByFnameAndSname(@Param("fname") String fname, @Param("sname") String sname);

}