import React, { useCallback, useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  className?: string;
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  className,
  placeholder = "Upload Image",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof value === "string") {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onChange(file);
    },
    [onChange],
  );

  const removeFile = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div className="group relative flex size-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition-colors hover:border-primary/50 hover:bg-white/10">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="size-full rounded-xl object-cover p-1"
          />
        ) : (
          <label className="flex size-full cursor-pointer flex-col items-center justify-center">
            <Upload className="mb-2 size-6 text-muted-foreground group-hover:text-primary" />
            <span className="text-xs text-muted-foreground group-hover:text-primary">
              {placeholder}
            </span>
            <input
              type="file"
              onChange={onFileChange}
              accept="image/*"
              className="hidden"
            />
          </label>
        )}
      </div>
      {preview && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={removeFile}
          className="size-8 rounded-lg border-white/10 hover:bg-white/10"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
