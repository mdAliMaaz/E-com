import { v2 as cloudinary } from 'cloudinary';

const uploadImage = async (imagePath) => {


    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'avatars'
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        const { public_id, url } = result;
        return { public_id, url };
    } catch (error) {
        console.error(error);
    }
};

export { uploadImage }