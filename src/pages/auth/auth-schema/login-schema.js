import { z } from "zod";

export const formSchema = z.object({
  Email: z.string().email("Please enter a valid email address"),
  Password: z.string().min(6, "Password must be at least 6 characters"),
});
