/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.thinkbeyond.sample.springhibe.dao;

import com.thinkbeyond.sample.springhibe.form.Contact;
import java.util.List;

/**
 *
 * @author ubuntu
 */
public interface ContactDAO {

    void addContact(Contact contact);
    List<Contact> listContact();
    void removeContact(Integer id);

}
