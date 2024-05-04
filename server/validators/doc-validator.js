const { z } = require('zod');

const docSchema = z.object({
    firstName: z
        .string({ required_error: "FirstName is Required!" })
        .trim().min(3, { message: "FirstName must be atleast of 3 characters" })
        .max(255, { message: "FirstName must not be more than 255 characters" }),
    lastName: z
        .string({ required_error: "LastName is Required!" })
        .trim().min(3, { message: "LastName must be atleast of 3 characters" })
        .max(255, { message: "LastName must not be more than 255 characters" }),
    phone: z
        .string({ required_error: "Phone number is Required!" })
        .trim().min(10, { message: "Phone number must be of 10 digits" }).max(10,{message:"Phone must be of 10 digits"}),

    email: z
    .string({ required_error: "Email is Required!" })
        .trim().email({ message: "Inavlid Email Address!" })
        .min(3, { message: "Email must be atleast of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    specialization: z
        .string({ required_error: "Specialization is Required!" })
        .trim().min(3, { message: "Specialization must be atleast of 3 characters" })
        .max(155, { message: "Specialization must not be more than 155 characters" }),
    experience: z
        .string({ required_error: "Experience is Required!" })
        .trim().min(1, { message: "Experience must be of 1 digits atleast" }).max(3,{message:"Experience cannot be more than 3 digits"}),
    
});

module.exports = docSchema;