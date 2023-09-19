# Searching functionality

```js

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
```

# filtering functionality

```js

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
```

# Checking whether user is Admin or User

```js
const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("you are not Admin NOT authorized");
    }
    next();
  };
};
```

# In ProductRoutes.js file

```js
isAdmin("admin");
```

- add this to every route which you want to access only by admin role
