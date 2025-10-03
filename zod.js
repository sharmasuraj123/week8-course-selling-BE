const { z, email } = require("zod");

const signupSchema = z.object({
  email: z.string().email("invalid email id"),
  password: z
    .string()
    .min(3)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
  firstName: z
    .string()
    .min(3)
    .regex(/^[A-Z]{1}[a-z]*$/, "start first letter with capital."),
  lastName: z
    .string()
    .min(3)
    .regex(/^[A-Z]{1}[a-z]*$/, "start first letter with capital."),
});
module.exports = {
  signupSchema: signupSchema,
};
