"use client";

import { useState, useCallback } from "react";
import { Zap } from "lucide-react";
import ProductFormPanel from "./ProductFormPanel";
import ResultPanel from "./ResultPanel";
import BatchImportModal from "./BatchImportModal";
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

export default function ProductWorkspace() {
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [referenceImages, setReferenceImages] = useState<UploadedImage[]>([]);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

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

  const handleBatchImport = useCallback(() => {
    setShowBatchModal(true);
  }, []);

  const handleQuickTest = useCallback(() => {
    setForm(DEMO_FORM);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(MOCK_RESULTS[DEMO_FORM.style]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">商品图文生成工作台</h2>
            <p className="text-xs text-gray-400">填写商品信息，AI 自动生成主图与营销文案</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickTest}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:shadow-md disabled:opacity-60"
            >
              <Zap className="h-3.5 w-3.5" />
              {loading ? "生成中..." : "一键测试"}
            </button>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-[440px] shrink-0 border-r border-gray-100 bg-white p-6 overflow-y-auto">
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
              onBatchImport={handleBatchImport}
              showBatchButton
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
      {showBatchModal && (
        <BatchImportModal onClose={() => setShowBatchModal(false)} />
      )}
    </>
  );
}
