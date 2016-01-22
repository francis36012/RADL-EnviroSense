/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.envirosense.springsecurity.controller;

import com.envirosense.springsecurity.model.User;
import com.envirosense.springsecurity.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author 666894
 */
@RestController
public class HelloWorldRestController {
      
      @Autowired
	UserService userService;
         //-------------------Retrieve All Users--------------------------------------------------------
     
      @RequestMapping(value = "/getuser/", method = RequestMethod.GET)
      public ResponseEntity<List<User>> listAllUsers() {
          List<User> users = userService.findAllUsers();
          if(users.isEmpty()){
              return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
          }
          return new ResponseEntity<List<User>>(users, HttpStatus.OK);
      }


      //-------------------Retrieve Single User--------------------------------------------------------

      @RequestMapping(value = "/getuser/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
      public ResponseEntity<User> getUser(@PathVariable("id") int id) {
          System.out.println("Fetching User with id " + id);
          User user = userService.findById(id);
          if (user == null) {
              System.out.println("User with id " + id + " not found");
              return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
          }
          return new ResponseEntity<User>(user, HttpStatus.OK);
      }
}
