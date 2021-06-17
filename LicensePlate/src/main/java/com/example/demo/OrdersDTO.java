package com.example.demo;

public class OrdersDTO
{
    private int orderid;
    private String platename;
    private double price;
    private String fname;
    private String sname;

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
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

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }
}
