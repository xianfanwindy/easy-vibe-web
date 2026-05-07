"use client";

import { RotateCcw, Sparkles, BookOpen, FileSpreadsheet, Link2, Save, Upload } from "lucide-react";
import type { ProductForm as FormType } from "@/lib/mock-data";
import { CATEGORY_OPTIONS, STYLE_OPTIONS } from "@/lib/mock-data";
import ImageUploader from "./ImageUploader";
import type { UploadedImage } from "@/lib/mock-data";

interface Props {
  form: FormType;
  images: UploadedImage[];
  referenceImages: UploadedImage[];
  loading: boolean;
  onFormChange: (form: FormType) => void;
  onImagesChange: (images: UploadedImage[]) => void;
  onReferenceImagesChange: (images: UploadedImage[]) => void;
  onGenerate: () => void;
  onReset: () => void;
  onLoadDemo: () => void;
  onBatchImport?: () => void;
  showBatchButton?: boolean;
}

export default function ProductFormPanel({
  form,
  images,
  referenceImages,
  loading,
  onFormChange,
  onImagesChange,
  onReferenceImagesChange,
  onGenerate,
  onReset,
  onLoadDemo,
  onBatchImport,
  showBatchButton = true,
}: Props) {
  const set = (key: keyof FormType, value: string | boolean) =>
    onFormChange({ ...form, [key]: value });

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-gray-900">商品信息</h1>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            商品名称 <span className="text-red-400">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="例如：智能降噪蓝牙耳机"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            商品卖点
          </label>
          <textarea
            value={form.sellingPoints}
            onChange={(e) => set("sellingPoints", e.target.value)}
            placeholder="每行一个卖点，例如：&#10;主动降噪45dB&#10;续航40小时"
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              商品类别
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">请选择类别</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              商品价格 (¥)
            </label>
            <input
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="299"
              type="number"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              品牌名称
            </label>
            <input
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="品牌名"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              目标用户
            </label>
            <input
              value={form.targetUser}
              onChange={(e) => set("targetUser", e.target.value)}
              placeholder="例如：18-35岁女性"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              材质
            </label>
            <input
              value={form.material}
              onChange={(e) => set("material", e.target.value)}
              placeholder="例如：ABS+硅胶"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              尺寸
            </label>
            <input
              value={form.size}
              onChange={(e) => set("size", e.target.value)}
              placeholder="例如：M/L/XL"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              颜色
            </label>
            <input
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
              placeholder="例如：黑色 / 白色"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            风格选择
          </label>
          <div className="grid grid-cols-3 gap-2">
            {STYLE_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => set("style", s)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                  form.style === s
                    ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ImageUploader images={images} onChange={onImagesChange} label="商品主图（白底图/场景图）" />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            参考素材（历史爆款截图 / 参考图）
          </label>
          <ImageUploader images={referenceImages} onChange={onReferenceImagesChange} />
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <Link2 className="h-3.5 w-3.5" />
              参考链接（可选）
            </label>
            <input
              value={form.referenceLinks}
              onChange={(e) => set("referenceLinks", e.target.value)}
              placeholder="粘贴爆款链接或参考页面URL"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Save className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">保存到素材库</p>
              <p className="text-xs text-gray-400">下次可直接复用该商品素材</p>
            </div>
          </div>
          <button
            onClick={() => set("saveToAssetLibrary", !form.saveToAssetLibrary)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              form.saveToAssetLibrary ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                form.saveToAssetLibrary ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-gray-100 pt-5">
        <button
          onClick={onGenerate}
          disabled={loading || !form.name.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              AI 生成中...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              生成内容
            </>
          )}
        </button>
        <div className="flex gap-2.5">
          <button
            onClick={onReset}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            重置
          </button>
          <button
            onClick={onLoadDemo}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
          >
            <BookOpen className="h-3.5 w-3.5" />
            加载示例
          </button>
          {showBatchButton && onBatchImport && (
            <button
              onClick={onBatchImport}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 transition-all hover:bg-green-100"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              批量导入
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
