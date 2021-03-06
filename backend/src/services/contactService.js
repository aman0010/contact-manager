import Boom from '@hapi/boom';

import Contact from '../models/contact';
import { upload } from '../firebase';

/**
 * Create new contact.
 *
 * @param   {Object}  contact
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createContact(contact, user) {
  return new Contact({
    name: contact.name,
    photograph: contact.photograph,
    email: contact.email,
    address: contact.address,
    favourite: contact.favourite,
    phone: JSON.stringify(contact.phone),
    user_id: user.id,
  }).save();
}

/**
 * Get all contact.
 *
 * @param   {Number|String}  userId
 * @returns {Promise}
 */
export function getAllContacts(userId) {
  return Contact.where('user_id', userId).fetchAll();
}

/**
 * Get a contact.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getContact(id) {
  return new Contact({ id })
    .fetch()
    .then((contact) => contact)
    .catch(Contact.NotFoundError, () => {
      throw Boom.notFound('Contact not found');
    });
}

/**
 * Update a contact.
 *
 * @param   {Number|String}  id
 * @param   {Object}         contact
 * @returns {Promise}
 */
export function updateContact(id, contact) {
  return new Contact({ id }).save({
    name: contact.name,
    photograph: contact.photograph,
    email: contact.email,
    address: contact.address,
    favourite: contact.favourite,
    phone: JSON.stringify(contact.phone),
  });
}

/**
 * Delete a contact.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteContact(id) {
  return new Contact({ id }).fetch().then((contact) => contact.destroy());
}

/**
 * Update a image.
 *
 * @param   {File}  file
 * @param   {Number|String}  user
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function updateImage(file, user, id) {
  const ext = file.originalname.split('.').pop();
  const filename = `${user.id}_${Date.now()}.${ext}`;

  upload(filename, file); // Uploading file to firebase

  return new Contact({ id }).save({
    photograph: filename,
  });
}
