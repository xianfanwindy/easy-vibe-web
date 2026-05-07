"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Tag,
  Sparkles,
  LayoutGrid,
  Layers,
} from "lucide-react";
import type { GeneratedResult } from "@/lib/mock-data";

interface Props {
  result: GeneratedResult | null;
  loading: boolean;
  style: string;
  brand?: string;
  name?: string;
  price?: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-blue-200 hover:text-blue-500"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-500" />
          <span className="text-green-500">已复制</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          复制
        </>
      )}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50">
        <Sparkles className="h-10 w-10 text-blue-300" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">
        等待 AI 创作
      </h3>
      <p className="max-w-sm text-sm text-gray-400">
        在左侧填写商品信息并上传图片，点击「生成内容」即可获得 AI
        智能生成的主图方案与营销文案
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative mb-8">
        <div className="h-20 w-20 animate-pulse rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100" />
        <Sparkles className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-bounce text-blue-500" />
      </div>
      <p className="mb-2 text-base font-semibold text-gray-700">
        AI 正在创作中...
      </p>
      <p className="text-sm text-gray-400">正在生成主图方案与营销文案</p>
      <div className="mt-6 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function ImageCard({
  image,
  index,
  brand,
  name,
  price,
}: {
  image: GeneratedResult["mainImages"][number];
  index: number;
  brand: string;
  name: string;
  price: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      <div
        className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${image.gradient}`}
      >
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {image.tag}
        </span>
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <ImageIcon className="h-12 w-12 text-gray-300" />
          <p className="text-xs font-medium text-gray-400">
            {image.layout}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8">
          <p className="text-xs font-medium text-white/80">{brand}</p>
          <p className="line-clamp-1 text-sm font-bold text-white">{name}</p>
          {price && (
            <p className="mt-1 text-xs font-semibold text-yellow-300">
              ¥{price}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-xs font-medium text-gray-500">
          主图方案 {index + 1}
        </span>
        <span className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] text-gray-400">
          1:1
        </span>
      </div>
    </div>
  );
}

export default function ResultPanel({ result, loading, style, brand = "", name = "", price = "" }: Props) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  if (loading) return <LoadingState />;
  if (!result) return <EmptyState />;

  const prev = () =>
    setCarouselIndex((i) =>
      i === 0 ? result.mainImages.length - 1 : i - 1
    );
  const next = () =>
    setCarouselIndex((i) =>
      i === result.mainImages.length - 1 ? 0 : i + 1
    );

  return (
    <div className="flex h-full flex-col space-y-6 overflow-y-auto">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
              <Layers className="h-3.5 w-3.5 text-blue-500" />
            </div>
            <h2 className="text-base font-bold text-gray-900">主图预览</h2>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-500">
              {style}
            </span>
          </div>
          <div className="flex gap-1 rounded-lg bg-gray-100 p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LayoutGrid className="h-3 w-3" />
              网格
            </button>
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === "carousel"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ImageIcon className="h-3 w-3" />
              轮播
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-3 gap-4">
            {result.mainImages.map((img, idx) => (
              <ImageCard
                key={img.id}
                image={img}
                index={idx}
                brand={brand}
                name={name}
                price={price}
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            <ImageCard
              image={result.mainImages[carouselIndex]}
              index={carouselIndex}
              brand={brand}
              name={name}
              price={price}
            />
            <button
              onClick={prev}
              className="absolute left-2 top-1/3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-all hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-all hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="mt-3 flex justify-center gap-1.5">
              {result.mainImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === carouselIndex
                      ? "w-6 bg-blue-500"
                      : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
            <Tag className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">AI 文案</h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              商品标题
            </span>
            <div className="flex gap-1.5">
              <CopyButton text={result.title} />
              <button className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-blue-200 hover:text-blue-500">
                <RefreshCw className="h-3 w-3" />
                重新生成
              </button>
            </div>
          </div>
          <p className="text-sm font-semibold leading-relaxed text-gray-800">
            {result.title}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              商品卖点
            </span>
            <div className="flex gap-1.5">
              <CopyButton text={result.sellingPoints.join("\n")} />
              <button className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-blue-200 hover:text-blue-500">
                <RefreshCw className="h-3 w-3" />
                重新生成
              </button>
            </div>
          </div>
          <ul className="space-y-2">
            {result.sellingPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-500">
                  {idx + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              营销文案
            </span>
            <div className="flex gap-1.5">
              <CopyButton text={result.marketingCopy.join("\n\n")} />
              <button className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-blue-200 hover:text-blue-500">
                <RefreshCw className="h-3 w-3" />
                重新生成
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {result.marketingCopy.map((copy, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-gray-50 p-3.5 text-sm leading-relaxed text-gray-700"
              >
                {copy}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
