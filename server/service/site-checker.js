const axios = require('axios');
const cron = require('node-cron');
const SiteModel = require('../models/site-model');
const SiteLogModel = require('../models/sitelog-model');

async function checkSiteAvailability(site) {
    try {
        const response = await axios.get(site.url);
        await recordSiteCheck(site._id, response.status);
        return response.status;
    } catch (error) {
        await recordSiteCheck(site._id, error.response ? error.response.status : null);
        return error.response ? error.response.status : null;
    }
}

async function recordSiteCheck(siteId, responseStatus) {
    const newLog = new SiteLogModel({
        siteId: siteId,
        response: responseStatus
    });
    await newLog.save();
}

async function checkSitesByInterval() {
    const sites = await SiteModel.find();
    const currentTime = new Date();

    for (const site of sites) {
        const lastChecked = site.lastChecked || new Date(1970, 0, 1);
        const nextCheckTime = new Date(lastChecked.getTime() + site.interval * 60000);

        if (currentTime >= nextCheckTime) {
            await checkSiteAvailability(site);
            await SiteModel.updateOne({ _id: site._id }, { lastChecked: currentTime });
        }
    }
}

function setupSiteChecking() {
    cron.schedule('* * * * *', async () => {
        await checkSitesByInterval();
        //console.log('Проверка сайтов выполнена');
    });
}

module.exports = setupSiteChecking;
