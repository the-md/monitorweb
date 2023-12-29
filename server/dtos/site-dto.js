module.exports = class SiteDto {
    url;
    name;
    interval;
    id;
    userid;

    constructor(model) {
        this.url = model.url;
        this.name = model.name;
        this.interval = model.interval;
        this.id = model._id;
        this.userid = model.userid;
    }
}
