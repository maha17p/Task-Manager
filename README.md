# Not Found:
    1.When you search random url which is not inside your on code  your browser throw an error like can't Get url name.
    2.If you get into Newtwork tap, you can 404 error.
    3.So we can create custom middleware for this.

```js

    const notFound = (req,res) => res.status(404).send("Router doesn't exist");

```
    4.Now we can use this middleware in our app file.
    app.use(notFound);


# Async Wrapper:
    1.In controller, I've written lot of redutant code over there. Esp , I used try catch block all my controller function. How to remove the redutant code .
    2. Here We can use async wrapper.

```js
const asyncWrapper = (func) => {
    return async(req,res,next) => {
        try{
            await func(req,res,next)
        }catch(error){
            // res.send(error) //This is built in error 
            next(error) //If We don't handle it by custom error,It will be handled by built-in error
        }
    }
}
```



# How to write custom error:
    1. Express comes with a built in error handler that take care of any errors that might be encountered in the app.
    2.If you pass an error to next() and you don't handle it in a custom error handler , It will be handled by the built-in error handler.

# Write Error Handler Function:
    1.Define error handler middleware function same way as  other middleware function except error-handling functionn have four arguments instead of three(err,req,res,next) 

```js
  const error = new Error('Not Found');
    error.status = 404
    return next(error)

    const errorHandler = (err,req,res,next) =>{
    console.log(err);
    return res.status(err.status).json({msg:err.message})
};
```
    2.We can't write manually for every controller function.We are going to create custom error class extended from javascript error.
    3.Create errors folder and add the file name called custom-error.js
```js
    class CustomAPIError extends Error{
        constructor(message,statusCode){
            super(message)
            this.statusCode = statusCode
        }
    }

    const createCustomError = (msg,statusCode) => {
        return new CustomAPIError(msg,statusCode)
    }

    module.exports = {CustomAPIError,createCustomError}
``` 
4.This super method ivokes the constructor of parent class.Here , We pass the message value to the parent class.As a result, We can access all the method and property of parent Class.

5. import the functions in controller.

```js
      if (!task) {
    const error = new Error('Not Found');
    error.status = 404
    return next(error)
    return res.status(404).json({ msg: `No task with id:${taskID}` });
  }

//   Replace this with our custom function
    if(!task){
        return next(createCustomError(`No task with id:${taskID}`,404 ))
    }
```
    6.Copy and paste the createCustomError function to all controller functions. 

# Handle the errors which is not in our controller function:
    1.Call the custom error class to our error handler file
    2.Check the error whether it is instance of it or not.
    3.Based on we can write errors

```js
    const { CustomAPIError } = require("");
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg: " Something went wrong, Please try again later"})
```