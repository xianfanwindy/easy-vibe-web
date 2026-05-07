"use client";

import { useState } from "react";
import {
  Heart,
  Search,
  Grid3X3,
  List,
  Copy,
  Eye,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { MOCK_TEMPLATES, STYLE_OPTIONS } from "@/lib/mock-data";
import type { TemplateItem } from "@/lib/mock-data";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<TemplateItem[]>(MOCK_TEMPLATES);
  const [search, setSearch] = useState("");
  const [styleFilter, setStyleFilter] = useState<string>("全部");
  const [favOnly, setFavOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleFav = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    );
  };

  const filtered = templates.filter((t) => {
    const matchSearch = t.name.includes(search) || t.category.includes(search);
    const matchStyle = styleFilter === "全部" || t.style === styleFilter;
    const matchFav = !favOnly || t.favorite;
    return matchSearch && matchStyle && matchFav;
  });

  const favCount = templates.filter((t) => t.favorite).length;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">模板库</h1>
          <p className="mt-1 text-sm text-gray-500">
            查看与管理收藏的图文模板，快速复用到新任务
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Heart className="h-4 w-4 text-pink-500" />
          已收藏 {favCount} 个模板
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索模板名称、类别..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select
          value={styleFilter}
          onChange={(e) => setStyleFilter(e.target.value)}
          className="appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option>全部</option>
          {STYLE_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={() => setFavOnly(!favOnly)}
          className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
            favOnly
              ? "border-pink-200 bg-pink-50 text-pink-600"
              : "border-gray-200 bg-white text-gray-600 hover:border-pink-200 hover:bg-pink-50/40"
          }`}
        >
          <Heart
            className={`h-3.5 w-3.5 ${favOnly ? "fill-pink-500 text-pink-500" : ""}`}
          />
          仅看收藏
        </button>

        <div className="ml-auto flex gap-1 rounded-lg bg-gray-100 p-0.5">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
              viewMode === "grid"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Grid3X3 className="h-3 w-3" />
            网格
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
              viewMode === "list"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <List className="h-3 w-3" />
            列表
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${tpl.gradient}`}
              >
                <Sparkles className="h-10 w-10 text-gray-300" />
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {tpl.tag}
                </span>
                <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-white">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-white">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {tpl.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                      {tpl.category}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {tpl.style}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <BarChart3 className="h-3 w-3" />
                    {tpl.usageCount}
                  </span>
                  <button
                    onClick={() => toggleFav(tpl.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-pink-50"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        tpl.favorite
                          ? "fill-pink-500 text-pink-500"
                          : "text-gray-300 hover:text-pink-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={`flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tpl.gradient}`}
              >
                <Sparkles className="h-5 w-5 text-gray-300" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">{tpl.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{tpl.style}</span>
                  <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
                    {tpl.tag}
                  </span>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <BarChart3 className="h-3 w-3" />
                使用 {tpl.usageCount} 次
              </span>
              <div className="flex items-center gap-1.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleFav(tpl.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-pink-50"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      tpl.favorite
                        ? "fill-pink-500 text-pink-500"
                        : "text-gray-300 hover:text-pink-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Sparkles className="mb-3 h-10 w-10 text-gray-200" />
          <p className="text-sm font-medium text-gray-500">没有找到匹配的模板</p>
          <p className="text-xs text-gray-400">尝试调整筛选条件</p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        共 {filtered.length} 个模板
      </div>
    </div>
  );
}
