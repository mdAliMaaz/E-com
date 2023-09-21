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

# How to use Node-Mailer

```js
import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,

    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
```

- don't forget to make changes in your email

# How to generate reset password token using crypto ?

```js
// generating reset password  token
userSchema.methods.getRestPasswordToken = function () {
  // Generating reset password token
  const token = crypto.randomBytes(20).toString("hex");

  // Hashing and adding  reset password token
  const tokenCrypto = crypto.createHash("sha256").update(token).digest("hex");

  // setting reset password token in user schema
  this.resetPasswordToken = tokenCrypto;

  this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;

  return token;
};
```

# How to reset Password ?

```js
export const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error(`User not found`);
  }

  //   get reset password token
  const resetPasswordToken = user.getRestPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetPasswordToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n,if you have not requested this email then plese igonre it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecom Password recovery",
      message,
    });

    res
      .status(200)
      .json({ success: true, message: `Email sent to ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    user.save({ validateBeforeSave: false });

    throw new Error(error);
  }
});
```

<details>
<summary>Reset password work-flow </summary>
<br/>

User has to enter his valid email , once we conform that email is valid then , we gona send him a recover password link to his email and then , User can click on link and can reset his password.

In order to reset the password user must have reset password token which will expire in 15min in this application, reset password token will be present in params of the recovery link ,we need to hash the token before start checking .

I am using ** 'Crypto' ** module of node to generate hashed token.

then by clicking the provided link user has to enter new password and conform password .

if password === conformPassword then we gona save the new password to respective User

**_ read the about code twice 😁_**

</details>
