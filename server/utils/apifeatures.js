class ApiFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

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
}

export { ApiFeatures }