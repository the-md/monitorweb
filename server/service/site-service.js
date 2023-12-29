const SiteModel = require('../models/site-model');
const ApiError = require('../exceptions/api-error');
const SiteDto = require("../dtos/site-dto");

class UserService {
    async createSite(url, name, interval, userId) {
        const siteDublicate = await SiteModel.findOne({ url });
        if (siteDublicate) {
            throw ApiError.BadRequest(`this URL (${url}) has already been added by you`);
        }
        const site = await SiteModel.create({ url, name, interval, userId });
        return site;
    }

    async getSites() {
        const sites = await SiteModel.find();
        return sites.map(site => new SiteDto(site));
    }
}

module.exports = new UserService();
