/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.thinkbeyond.sample.springhibe.service;

import com.thinkbeyond.sample.springhibe.form.Contact;
import java.util.List;

/**
 *
 * @author ubuntu
 */
public interface ContactService {

    void addContact(Contact contact);
    public List<Contact> listContact();
    public void removeContact(Integer id);

}
