// /services/ServicesGenerator.js
exports.createService = (serviceType, serviceModel) => {
    // Define operations in a map
    const operations = {
        getById: async (id) => {
            const result = await serviceModel.findById(id);
            if (!result) throw new Error(`${serviceModel.modelName} not found`);
            return result;
        },
        getAll: async () => {
            const results = await serviceModel.find();
            return results;
        },
        add: async (data) => {
            const newItem = new serviceModel(data);
            await newItem.save();
            return newItem;
        },
        update: async (id, data) => {
            const updatedItem = await serviceModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!updatedItem) throw new Error(`${serviceModel.modelName} not found`);
            return updatedItem;
        },
        delete: async (id) => {
            const deletedItem = await serviceModel.findByIdAndDelete(id);
            if (!deletedItem) throw new Error(`${serviceModel.modelName} not found`);
            return deletedItem;
        },
        addImageToAlbum: async (albumId, imageData) => {
            const album = await serviceModel.findById(albumId);
            if (!album) throw new Error(`${serviceModel.modelName} not found`);

            album.images.push(imageData);
            await album.save();
            return album;
        },
        deleteImageFromAlbum: async (albumId, imageId) => {
            const album = await serviceModel.findById(albumId);
            if (!album) throw new Error(`${serviceModel.modelName} not found`);

            const imageIndex = album.images.findIndex((img) => img._id.toString() === imageId);
            if (imageIndex === -1) throw new Error(`Image not found in ${serviceModel.modelName}`);

            album.images.splice(imageIndex, 1);
            await album.save();
            return album;
        }
    };

    // Return the operation function if it exists, otherwise throw an error
    const operation = operations[serviceType];
    if (!operation) throw new Error('Invalid service type');
    return operation;
};
