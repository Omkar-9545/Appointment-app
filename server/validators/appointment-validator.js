const { z } = require('zod');

const appointmentSchema = z.object({
    userId: z
        .string({ required_error: "userId is Required!" }),
    doctorId: z
        .string({ required_error: "DoctorId is Required!" }),
    date: z
        .string({ required_error: "Date is Required!" })
        .trim().min(3, { message: "Please enter date" }),
    time: z
        .string({ required_error: "Time is Required!" })
        .trim().min(3, { message: "please enter time" }),
    status: z
        .string({required_error:'error while obtaining status'}),
})



module.exports = appointmentSchema;