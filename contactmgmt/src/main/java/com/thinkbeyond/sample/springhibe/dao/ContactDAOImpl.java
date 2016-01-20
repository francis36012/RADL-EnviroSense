/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.thinkbeyond.sample.springhibe.dao;

import com.thinkbeyond.sample.springhibe.form.Contact;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
/**
 *
 * @author ubuntu
 */
@Repository
public class ContactDAOImpl implements ContactDAO{

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void addContact(Contact contact) {
       sessionFactory.getCurrentSession().save(contact);
    }

    @Override
    public List<Contact> listContact() {
       return sessionFactory.getCurrentSession().createQuery("from CONTACTS").list();
    }

    @Override
    public void removeContact(Integer id) {

        Contact contact = (Contact)sessionFactory.getCurrentSession().load(Contact.class, id);
        if(null != contact){
            sessionFactory.getCurrentSession().delete(contact);
        }
    }

}
