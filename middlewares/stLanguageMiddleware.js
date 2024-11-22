// Middleware to set preferred language
module.exports = (req, res, next) => {
    const supportedLanguages = ["ar", "en"];
    const defaultLanguage = "ar";

    // Check for language in headers, query, or default to Arabic
    const lang = req.headers["accept-language"] || req.query.lang || defaultLanguage;

    req.lang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
    next();
};
