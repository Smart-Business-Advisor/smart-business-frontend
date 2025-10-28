import z from "zod";

export const formSchema = z
  .object({
    FirstName: z.string().min(2, "FirstName must be at least 2 characters."),
    LastName: z.string().optional().nullable(),
    UserName: z.string().min(2, "UserName must be at least 2 characters."),
    Email: z.email("Please enter a valid email address."),
    PhoneNumber: z
      .string()
      .nonempty("Please enter phone number")
      .regex(/^\+?[0-9]\d{9,14}$/, "Invalid phone number"),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    PasswordConfirm: z.string(),
  })
  .refine((data) => data.Password === data.PasswordConfirm, {
    message: "Passwords do not match",
    path: ["PasswordConfirm"],
  });
