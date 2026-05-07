"use client";

import { useState, useCallback } from "react";
import { Sparkles, Zap } from "lucide-react";
import ProductFormPanel from "./ProductFormPanel";
import ResultPanel from "./ResultPanel";
import type {
  ProductForm,
  UploadedImage,
  GeneratedResult,
} from "@/lib/mock-data";
import {
  EMPTY_FORM,
  DEMO_FORM,
  MOCK_RESULTS,
} from "@/lib/mock-data";

export default function Home() {
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [referenceImages, setReferenceImages] = useState<UploadedImage[]>([]);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(() => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(MOCK_RESULTS[form.style]);
      setLoading(false);
    }, 2000);
  }, [form.style]);

  const handleReset = useCallback(() => {
    setForm(EMPTY_FORM);
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    referenceImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setReferenceImages([]);
    setResult(null);
    setLoading(false);
  }, [images, referenceImages]);

  const handleLoadDemo = useCallback(() => {
    setForm(DEMO_FORM);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm shadow-blue-500/20">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-gray-900">
            AI 电商主图与文案生成工具
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-xs font-medium text-blue-600">AI Powered</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[420px] shrink-0 border-r border-gray-100 bg-white p-6">
          <ProductFormPanel
            form={form}
            images={images}
            referenceImages={referenceImages}
            loading={loading}
            onFormChange={setForm}
            onImagesChange={setImages}
            onReferenceImagesChange={setReferenceImages}
            onGenerate={handleGenerate}
            onReset={handleReset}
            onLoadDemo={handleLoadDemo}
          />
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <ResultPanel
            result={result}
            loading={loading}
            style={form.style}
            brand={form.brand}
            name={form.name}
            price={form.price}
          />
        </main>
      </div>
    </div>
  );
}
