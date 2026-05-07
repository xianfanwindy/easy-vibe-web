"use client";

import { useCallback, useState } from "react";
import { Upload, X, ImagePlus } from "lucide-react";
import type { UploadedImage } from "@/lib/mock-data";

interface Props {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  label?: string;
}

export default function ImageUploader({ images, onChange, label = "商品图片" }: Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newImages: UploadedImage[] = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .map((file) => ({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          file,
          preview: URL.createObjectURL(file),
        }));
      onChange([...images, ...newImages]);
    },
    [images, onChange]
  );

  const removeImage = useCallback(
    (id: string) => {
      const target = images.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      onChange(images.filter((img) => img.id !== id));
    },
    [images, onChange]
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 transition-colors cursor-pointer ${
          dragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className="h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-500">
          拖拽图片到此处，或 <span className="text-blue-500">点击上传</span>
        </p>
        <p className="text-xs text-gray-400">支持 JPG / PNG / WebP</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
            >
              <img
                src={img.preview}
                alt="upload"
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => removeImage(img.id)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-200 text-gray-400 transition-colors hover:border-blue-300 hover:text-blue-400"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.multiple = true;
              input.onchange = (e) =>
                handleFiles((e.target as HTMLInputElement).files);
              input.click();
            }}
          >
            <ImagePlus className="h-5 w-5" />
            <span className="text-xs">继续添加</span>
          </button>
        </div>
      )}
    </div>
  );
}
