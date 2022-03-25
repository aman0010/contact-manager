import bookshelf from '../db';

const TABLE_NAME = 'contacts';

/**
 * Contact model.
 */
class Contact extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }
}

export default Contact;
