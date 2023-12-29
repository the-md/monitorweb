const siteService = require('../service/site-service');

class SiteController {
    async createSite(req, res, next) {
        try {
            //const userId = req.user._id;
            const {url, name, interval, userId} = req.body;
            const siteData = await siteService.createSite(url, name, interval, userId);
            return res.json(siteData);
        } catch (e) {
            next(e);
        }
    }

    async getSites(req, res, next) {
        try {
            const sites = await siteService.getSites();
            return res.json(sites);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SiteController();
