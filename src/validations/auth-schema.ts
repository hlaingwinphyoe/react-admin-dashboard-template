import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(8, "Phone number must be at least 8 characters")
    .nullable()
    .or(z.literal("")),
  profile_image: z
    .union([z.instanceof(File), z.string(), z.null()])
    .optional()
    .refine(
      (file) => {
        if (!(file instanceof File)) return true;
        return file.size <= 2 * 1024 * 1024;
      },
      { message: "Image must be less than 2MB" },
    )
    .refine(
      (file) => {
        if (!(file instanceof File)) return true;
        return file.type.startsWith("image/");
      },
      { message: "File must be an image" },
    ),
});
