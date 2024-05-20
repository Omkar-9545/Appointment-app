const { z } = require('zod');

const leaveSchema = z.object({
    date: z
        .string({ required_error: "Date is Required!" })
        .trim().min(3, { message: "Please enter date" }),
    days: z
        .string({ required_error: "Numbe of Days is Required!" })
        .trim().min(1, { message: "Please enter number of days" }),
})

module.exports = leaveSchema;