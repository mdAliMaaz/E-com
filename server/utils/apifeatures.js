class ApiFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Searching functionality based on name
    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this

    }

    /* filtering the products based on price and category , first i am making copy of the query string and then modifiying it for my need and not creating any problem for searching functionality */

    filter() {
        // copying queary because i will chanhe it bit
        const queryCopy = { ...this.queryString }

        const itemsToDelete = ["keyword", "page", "limit"]

        // deleting the keyword in the query
        itemsToDelete.forEach(item => delete queryCopy[item]);

        // convert the query to string
        let quearyStr = JSON.stringify(queryCopy);

        // relpacing gt|gte|lt|lte => $lt | $gt
        quearyStr = quearyStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(quearyStr));

        return this;
    }
    // pagination
    pagination(resultPerPage) {

        const currentPage = Number(this.queryString.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

export { ApiFeatures }