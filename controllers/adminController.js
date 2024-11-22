const CustomError = require("../utils/CustomError");
const config = require('../config/formMetadata');
const { fetchFormInputsData } = require("../utils/helper");

// Import service generator
const { createService } = require("../services/ServicesGenerator");

// Import models
const News = require("../models/News");
const Branch = require("../models/Branch");
const Service = require("../models/Services");
const Story = require("../models/Story");
const Staff = require("../models/Staff");
const Album = require("../models/Album");

// Map model names to their corresponding services and models
const modelServices = {
    news: { model: News, service: { getAll: createService("getAll", News), getById: createService("getById", News), getCount: createService("getCount", News) } },
    branch: { model: Branch, service: { getAll: createService("getAll", Branch), getById: createService("getById", Branch), getCount: createService("getCount", Branch) } },
    service: { model: Service, service: { getAll: createService("getAll", Service), getById: createService("getById", Service), getCount: createService("getCount", Service) } },
    album: { model: Album, service: { getAll: createService("getAll", Album), getById: createService("getById", Album), getCount: createService("getCount", Album), addImageToAlbum: createService("addImageToAlbum", Album), deleteImageFromAlbum: createService("deleteImageFromAlbum", Album) } },
    story: { model: Story, service: { getAll: createService("getAll", Story), getById: createService("getById", Story), getCount: createService("getCount", Story) } },
    staff: { model: Staff, service: { getAll: createService("getAll", Staff), getById: createService("getById", Staff), getCount: createService("getCount", Staff) } },

    
};

// Render the dashboard with data for all models
exports.renderDashboard = async (req, res, next) => {
    try {
        const dataPromises = Object.values(modelServices).map(async ({ model }) => model.find());
        const news = await dataPromises[0];
        const branches = await dataPromises[1];
        const services = await dataPromises[2];
        const gallery = await dataPromises[3];
        const stories = await dataPromises[4];
        const staff = await dataPromises[5];

        const statisticsCounts = await Promise.all(
            Object.values(modelServices).map(async ({ service }) => service.getCount())
        );

        const modelNames = Object.keys(modelServices);
        const statistics = modelNames.reduce((acc, modelName, index) => {
            acc[modelName] = statisticsCounts[index];
            return acc;
        }, {});

        // Determine language (default to 'en' if not provided)
        const lang = req.query.lang || 'ar';

        // Pass the lang variable to the EJS template
        res.render("admin/pages/dashboard", { 
            news, 
            branches, 
            services, 
            gallery, 
            stories, 
            staff, 
            statistics, 
            lang ,
        });
    } catch (error) {
        next(new CustomError(500, "Error loading dashboard"));
    }
};

// Render dynamic form based on modelType and formMethod (e.g., "POST", "PUT")
exports.renderDynamicForm = async (req, res, formMethod) => {
    const { modelType, id } = req.params;

    const fields = config[modelType];
    if (!fields) {
        return res.status(400).json({ error: `Model type '${modelType}' is not defined in the configuration.` });
    }

    try {
        let item = null;

        // Only fetch item data if updating (PUT)
        if (formMethod === "PUT" && id) {
            const modelService = modelServices[modelType]?.service?.getById;
        
            if (!modelService) {
                return res.status(400).json({ error: `Service for model type '${modelType}' is not defined.` });
            }
        
            // Fetch item by ID using the getById method
            item = await modelService(id);
            if (!item) {
                return res.status(404).json({ error: `${capitalize(modelType)} not found` });
            }
        }


        // Render the dynamic form with specified fields and prepopulate item data if updating
        res.render("admin/dynamicForm", {
            modelType,
            formMethod,
            fields,
            item,
            capitalize
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
};


exports.renderViewPage = async (req, res) => {
    const modelType = req.params.modelType;
    try{
        const modelData = await modelServices[modelType].service.getAll();

        res.render(`admin/pages/${modelType}Management`, {modelData});
    }catch(error){
        console.error("Error fetching data:", error);
    }
}

exports.renderAlbumImages = async (req, res) => {
    const albumId = req.params.id;
    try{
        const albumData = await modelServices.album.service.getById(albumId);
        res.render(`admin/pages/albumImages`, {images: albumData.images, albumId});

    }catch(error){
        console.error("Error fetching data:", error);
    }
}

//Add image to album

exports.addImageToAlbum = async (req, res) => {
    const albumId = req.params.id;
    const { image } = {path:req.body};
    try{
        const albumData = await modelServices.album.service.getById(albumId);
        albumData.images.push(image);
        console.log("Album data:",albumData);
        await albumData.save();
        res.redirect(`/admin/dashboard/album/${albumId}`);
    }catch(error){
        console.error("Error fetching data:", error);
    }
}

// Utility function to capitalize the first letter of a string
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
