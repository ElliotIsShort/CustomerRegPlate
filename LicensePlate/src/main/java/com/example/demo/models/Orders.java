package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Orders implements java.io.Serializable
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int orderid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="customerid")
    private Customer customerid;

    private String platename;
    private double price;

    public Orders() {

    }

    public Orders(Customer customerid, String platename, double price) {
        this.customerid = customerid;
        this.platename = platename;
        this.price = price;
    }

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    public Customer getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Customer customerid) {
        this.customerid = customerid;
    }

    public String getPlatename() {
        return platename;
    }

    public void setPlatename(String platename) {
        this.platename = platename;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
