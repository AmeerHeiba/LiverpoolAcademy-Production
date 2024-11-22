

// /services/ServicesGenerator.js
exports.createService = (serviceType, serviceModel) => {
    // Define operations in a map
    const operations = {
        getAll: async (lang) => {
            const results = await serviceModel.find();
            return results.map((item) => mapLanguageFields(item, lang));
        },
        getById: async (id, lang) => {
            const result = await serviceModel.findById(id);
            if (!result) throw new Error(`${serviceModel.modelName} not found`);
            return mapLanguageFields(result, lang);
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
        },
        getCount: async () => {
            const count = await serviceModel.countDocuments();
            return count;
        },
        filter: async (filterConditions) => {
            if (typeof filterConditions !== 'object') {
                throw new Error('Filter conditions must be an object');
            }

            const results = await serviceModel.find(filterConditions);
            return results;
        }
    };

    // Return the operation function if it exists, otherwise throw an error
    const operation = operations[serviceType];
    if (!operation) throw new Error('Invalid service type');
    return operation;
};


// Helper function to map language fields
function mapLanguageFields(item, lang) {
    const fieldsToTranslate = Object.keys(item._doc).filter((key) => key.endsWith("_ar") || key.endsWith("_en"));

    const translatedItem = { ...item._doc };
    fieldsToTranslate.forEach((field) => {
        const baseField = field.replace(/_(ar|en)$/, ""); // Get field name without suffix
        const preferredField = `${baseField}_${lang}`;
        const fallbackField = `${baseField}_ar`;

        translatedItem[baseField] = item[preferredField] || item[fallbackField] || null;
    });

    return translatedItem;
}