import { getDb } from '../db';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';
import crypto from 'crypto';

export const authService = {
  /**
   * Initializes the database with default admin users if none exist.
   */
  async seedDefaultAdmins() {
    const db = await getDb();
    const col = db.collection('admin_users');
    
    const adminCount = await col.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('12P@$$w0rd', salt);
      
      const defaultAdmins = [
        {
          email: 'gmn@gift.edu.pk',
          passwordHash,
          role: 'admin',
          createdAt: new Date(),
        },
        {
          email: 'ziaudin@gift.edu.pk',
          passwordHash,
          role: 'admin',
          createdAt: new Date(),
        },
        {
          email: '231370148@gift.edu.pk',
          passwordHash,
          role: 'admin',
          createdAt: new Date(),
        }
      ];

      await col.insertMany(defaultAdmins);
      logger.info(`🌱 Default admins seeded securely.`);
    }
  },

  /**
   * Validates credentials against strictly hashed DB records
   */
  async validateAdmin(email: string, candidatePass: string) {
    const db = await getDb();
    const col = db.collection('admin_users');
    
    const user = await col.findOne({ email });
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(candidatePass, user.passwordHash);
    return isValid ? user : null;
  },

  /**
   * Finds an admin user by email
   */
  async findAdminByEmail(email: string) {
    const db = await getDb();
    const col = db.collection('admin_users');
    return await col.findOne({ email });
  },

  /**
   * Updates an admin password
   */
  async updatePassword(email: string, newPasswordPlain: string) {
    const db = await getDb();
    const col = db.collection('admin_users');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPasswordPlain, salt);
    await col.updateOne({ email }, { $set: { passwordHash } });
  },

  /**
   * Creates a password reset token
   */
  async createPasswordResetToken(email: string) {
    const db = await getDb();
    const col = db.collection('admin_users');
    
    // Generate secure random hex token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await col.updateOne(
      { email },
      { $set: { resetPasswordToken, resetPasswordExpires } }
    );

    return resetToken;
  },

  /**
   * Verifies a password reset token
   */
  async verifyPasswordResetToken(resetToken: string) {
    const db = await getDb();
    const col = db.collection('admin_users');
    
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    const user = await col.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    return user;
  },

  /**
   * Clears the password reset token
   */
  async clearPasswordResetToken(email: string) {
    const db = await getDb();
    const col = db.collection('admin_users');
    
    await col.updateOne(
      { email },
      { $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }
    );
  }
};

