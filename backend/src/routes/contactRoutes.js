import { Router } from 'express';
import multer from 'multer';

import * as contactController from '../controllers/contacts';
import { contactValidator, findContact } from '../validators/contactValidator';

const router = Router();

/**
 * GET /api/contacts
 */
router.get('/', contactController.fetchAll);

/**
 * GET /api/contacts/:id
 */
router.get('/:id', findContact, contactController.fetch);

/**
 * POST /api/contacts
 */
router.post('/', contactValidator, contactController.create);

/**
 *
 * PUT /api/contacts/image/:id
 */
router.put('/image/:id', multer().single('file'), contactController.updateImg);

/**
 * PUT /api/contacts/:id
 */
router.put('/:id', findContact, contactController.update);

/**
 * DELETE /api/contacts/:id
 */
router.delete('/:id', findContact, contactController.deleteContact);

export default router;
