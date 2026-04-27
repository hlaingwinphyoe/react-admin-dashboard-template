import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentAccount, PaymentType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { ImageUpload } from "@/components/shared/ImageUpload";
import {
  paymentAccountFormSchema,
  type PaymentAccountFormValues,
} from "@/validations/payment-schema";

interface PaymentAccountFormProps {
  initialData?: PaymentAccount | null;
  paymentTypes: PaymentType[];
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PaymentAccountForm = ({
  initialData,
  paymentTypes,
  onSubmit,
  onCancel,
  isLoading,
}: PaymentAccountFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentAccountFormValues>({
    resolver: zodResolver(paymentAccountFormSchema),
    defaultValues: {
      payment_type_id: initialData?.payment_type_id.toString() || "",
      account_name: initialData?.account_name || "",
      account_number: initialData?.account_number || "",
      note: initialData?.note || "",
      qr_code: initialData?.qr_code || null,
    },
  });

  const qrCodeValue = watch("qr_code");

  const onFormSubmit = (values: PaymentAccountFormValues) => {
    const formData = new FormData();
    formData.append("payment_type_id", values.payment_type_id);
    formData.append("account_name", values.account_name);
    formData.append("account_number", values.account_number);

    if (values.note) formData.append("note", values.note);

    if (values.qr_code instanceof File) {
      formData.append("qr_code", values.qr_code);
    } else if (values.qr_code === null) {
      formData.append("qr_code", "");
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel>Payment Type</FieldLabel>
          <NativeSelect
            {...register("payment_type_id")}
            id="payment_type_id"
            className="rounded-xl"
          >
            <option value="">Select Payment Type</option>
            {paymentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </NativeSelect>
          {errors.payment_type_id && (
            <FieldError>{errors.payment_type_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Account Name</FieldLabel>
          <Input
            {...register("account_name")}
            id="account_name"
            placeholder="e.g. Kyaw Kyaw"
            className="rounded-xl"
          />
          {errors.account_name && (
            <FieldError>{errors.account_name.message}</FieldError>
          )}
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel>Account Number</FieldLabel>
          <Input
            {...register("account_number")}
            id="account_number"
            placeholder="e.g. 1234567890"
            className="rounded-xl"
          />
          {errors.account_number && (
            <FieldError>{errors.account_number.message}</FieldError>
          )}
        </Field>
      </div>

      <Field>
        <FieldLabel>Note (Optional)</FieldLabel>
        <Textarea
          {...register("note")}
          id="note"
          placeholder="Additional information..."
          className="rounded-xl"
        />
        {errors.note && <FieldError>{errors.note.message}</FieldError>}
      </Field>

      {/* QR Code */}
      <Field>
        <FieldLabel>QR Code (Optional)</FieldLabel>
        <ImageUpload
          value={qrCodeValue}
          onChange={(file) => setValue("qr_code", file, { shouldDirty: true })}
          placeholder="Upload QR"
        />
        {errors.qr_code && <FieldError>{errors.qr_code.message}</FieldError>}
      </Field>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-xl"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="rounded-xl px-8">
          {isLoading
            ? "Saving..."
            : initialData
              ? "Update Account"
              : "Create Account"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentAccountForm;
