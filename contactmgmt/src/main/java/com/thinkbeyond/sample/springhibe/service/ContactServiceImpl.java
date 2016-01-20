/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.thinkbeyond.sample.springhibe.service;

import com.thinkbeyond.sample.springhibe.dao.ContactDAO;
import com.thinkbeyond.sample.springhibe.form.Contact;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 *
 * @author ubuntu
 */
@Service
public class ContactServiceImpl implements ContactService{

    @Autowired
    ContactDAO contactDAO;

    @Override
    @Transactional
    public void addContact(Contact contact) {
       contactDAO.addContact(contact);
    }

    @Override
    @Transactional
    public List<Contact> listContact() {
    return  contactDAO.listContact();
      
    }

    @Override
    @Transactional
    public void removeContact(Integer id) {
       contactDAO.removeContact(id);
    }

}
