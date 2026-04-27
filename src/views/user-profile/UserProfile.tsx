import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Camera, Mail, Phone, User, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { profileSchema } from "@/validations/auth-schema";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const { user, updateProfile, isLoading, error: authError } = useAuthStore();
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.profile_image || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageSrc: string | undefined =
    previewImage ?? (user?.profile_image ? user.profile_image : undefined);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    setPreviewImage(user?.profile_image ?? null);

    reset({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB.");
      return;
    }

    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setSelectedFile(file);
  };

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      if (selectedFile) formData.append("profile_image", selectedFile);

      await updateProfile(formData);
      toast.success("Profile updated successfully!");
      setSelectedFile(null);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          authError ||
          "Failed to update profile. Please try again.",
      );
    }
  };

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          User Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Update your personal details and account settings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Profile Photo */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">
                Profile Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-0 pb-8">
              <div className="relative">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-background shadow-md ring-1 ring-border group transition-all duration-300 hover:ring-primary/40">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary text-5xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Overlay on hover for selection */}
                  <div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="text-white w-8 h-8" />
                  </div>
                </div>

                <Button
                  type="button"
                  size="icon"
                  variant="default"
                  className="absolute bottom-1 right-1 h-10 w-10 rounded-full shadow-lg border-2 border-background bg-primary hover:bg-primary/90"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-foreground">
                  {user?.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field className="sm:col-span-2">
                    <FieldLabel className="text-sm font-semibold mb-1.5">
                      Full Name
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...register("name")}
                        placeholder="John Doe"
                      />
                    </InputGroup>
                    {errors.name && (
                      <FieldError className="mt-1.5">
                        {errors.name.message}
                      </FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-semibold mb-1.5">
                      Email Address
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Mail />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...register("email")}
                        placeholder="john@example.com"
                      />
                    </InputGroup>
                    {errors.email && (
                      <FieldError className="mt-1.5">
                        {errors.email.message}
                      </FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-semibold mb-1.5">
                      Phone Number
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Phone />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...register("phone")}
                        placeholder="+1 234 567 890"
                      />
                    </InputGroup>
                    {errors.phone && (
                      <FieldError className="mt-1.5">
                        {errors.phone.message}
                      </FieldError>
                    )}
                  </Field>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      setPreviewImage(user?.profile_image ?? null);
                      setSelectedFile(null);
                    }}
                    disabled={isLoading || (!isDirty && !selectedFile)}
                  >
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || (!isDirty && !selectedFile)}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
