import cloudinary from './cloudinary.config.js';

export const uploadProfilePic = async (googlePicUrl, userId) => {
  try {
    // Cloudinary can directly fetch remote URL
    const result = await cloudinary.uploader.upload(googlePicUrl, {
      folder: 'user_profiles',
      public_id: `user_${userId}`,
      overwrite: true,
    });

    return result.secure_url; // URL to store in DB
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
    throw err;
  }
};
