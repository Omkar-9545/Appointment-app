const { z } = require('zod');

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is Required!" })
        .trim().email({ message: "Inavlid Email Address!" })
        .min(3, { message: "Email must be atleast of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
    .string({ required_error: "Password is Required!" })
    .trim().min(7, { message: "Password must be atleast of 7 characters" })
        .max(25, { message: "Password must not be more than 25 characters" }),
});

//creating an object schema
const singupSchema = loginSchema.extend({
    name: z
        .string({ required_error: "Name is Required!" })
        .trim().min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),
    
    phone: z
        .string({ required_error: "Phone number is Required!" })
        .trim().min(10, { message: "Phone number must be of 10 digits" }).max(10,{message:"Phone must be of 10 digits"})
});

module.exports = { singupSchema, loginSchema };