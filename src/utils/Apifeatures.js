export class Apifeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    pagination() {
        let page_limit = 4;
        let page = this.queryString.page * 1 || 1;

        if (page <= 0) page = 1;

        let skip = (page - 1) * page_limit;

        this.page = page;
        this.mongooseQuery.skip(skip).limit(page_limit);
        return this;
    }

    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { firstname: { $regex: this.queryString.keyword, $options: 'i' } },
                    { lastname: { $regex: this.queryString.keyword, $options: 'i' } },
                ]
            });
        }
        return this;
    }
}