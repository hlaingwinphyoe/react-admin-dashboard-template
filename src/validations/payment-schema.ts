import { z } from "zod";

export const paymentAccountFormSchema = z.object({
  payment_type_id: z.string().min(1, "Payment type is required"),
  account_name: z.string().min(1, "Account name is required"),
  account_number: z.string().min(1, "Account number is required"),
  qr_code: z
    .union([z.instanceof(File), z.string(), z.null()])
    .optional()
    .refine(
      (file) => {
        if (!(file instanceof File)) return true;
        return file.size <= 2 * 1024 * 1024;
      },
      { message: "Max size is 2MB" },
    )
    .refine(
      (file) => {
        if (!(file instanceof File)) return true;
        return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      },
      { message: "Only JPG, PNG, WEBP allowed" },
    ),
  note: z.string().optional(),
  priority: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type PaymentAccountFormValues = z.infer<typeof paymentAccountFormSchema>;
