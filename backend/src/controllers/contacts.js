import HttpStatus from 'http-status-codes';

import * as contactService from '../services/contactService';

/**
 * Create a new contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  contactService
    .createContact(req.body, req.user)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Get all contacts.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  contactService
    .getAllContacts(req.user.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a contacts.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetch(req, res, next) {
  contactService
    .getContact(req.params.id, req.user.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  contactService
    .updateContact(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a contact.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteContact(req, res, next) {
  contactService
    .deleteContact(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}
