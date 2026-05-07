"use client";

import { useState } from "react";
import {
  Save,
  RotateCcw,
  Bell,
  Palette,
  FileText,
  Globe,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from "@/lib/mock-data";

interface SettingsState {
  defaultStyle: string;
  defaultCategory: string;
  autoGenerateTitle: boolean;
  autoGeneratePoints: boolean;
  autoGenerateCopy: boolean;
  imageCount: number;
  copyTone: string;
  copyLength: string;
  notifyOnComplete: boolean;
  notifyOnError: boolean;
  watermark: boolean;
  watermarkText: string;
  outputFormat: string;
  language: string;
}

const DEFAULT_SETTINGS: SettingsState = {
  defaultStyle: "简洁白底风",
  defaultCategory: "数码电子",
  autoGenerateTitle: true,
  autoGeneratePoints: true,
  autoGenerateCopy: true,
  imageCount: 3,
  copyTone: "专业",
  copyLength: "中等",
  notifyOnComplete: true,
  notifyOnError: true,
  watermark: false,
  watermarkText: "",
  outputFormat: "PNG",
  language: "中文",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setSaved(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">设置</h1>
          <p className="mt-1 text-sm text-gray-500">
            配置默认生成规则、图文风格偏好等基础参数
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            恢复默认
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all ${
              saved
                ? "bg-green-500 shadow-green-500/25"
                : "bg-blue-500 shadow-blue-500/25 hover:bg-blue-600"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                已保存
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                保存设置
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Palette className="h-4 w-4 text-blue-500" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              默认生成风格
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                默认风格
              </label>
              <select
                value={settings.defaultStyle}
                onChange={(e) => update("defaultStyle", e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                {STYLE_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                默认类别
              </label>
              <select
                value={settings.defaultCategory}
                onChange={(e) => update("defaultCategory", e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                主图数量
              </label>
              <select
                value={settings.imageCount}
                onChange={(e) =>
                  update("imageCount", Number(e.target.value))
                }
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value={1}>1 张</option>
                <option value={3}>3 张</option>
                <option value={5}>5 张</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
              <FileText className="h-4 w-4 text-indigo-500" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              文案生成规则
            </h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  文案语气
                </label>
                <select
                  value={settings.copyTone}
                  onChange={(e) => update("copyTone", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option>专业</option>
                  <option>活泼</option>
                  <option>高端</option>
                  <option>口语化</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  文案长度
                </label>
                <select
                  value={settings.copyLength}
                  onChange={(e) => update("copyLength", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option>简短</option>
                  <option>中等</option>
                  <option>详细</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  输出语言
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => update("language", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option>中文</option>
                  <option>英文</option>
                  <option>中英双语</option>
                </select>
              </div>
            </div>
            <div className="space-y-3 rounded-xl bg-gray-50 p-4">
              <ToggleRow
                label="自动生成商品标题"
                desc="AI 根据商品信息自动优化标题"
                checked={settings.autoGenerateTitle}
                onChange={(v) => update("autoGenerateTitle", v)}
              />
              <ToggleRow
                label="自动生成卖点列表"
                desc="提取核心卖点并组织成列表"
                checked={settings.autoGeneratePoints}
                onChange={(v) => update("autoGeneratePoints", v)}
              />
              <ToggleRow
                label="自动生成营销文案"
                desc="生成适用于各平台的营销短句"
                checked={settings.autoGenerateCopy}
                onChange={(v) => update("autoGenerateCopy", v)}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <Globe className="h-4 w-4 text-amber-500" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              输出设置
            </h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  图片输出格式
                </label>
                <select
                  value={settings.outputFormat}
                  onChange={(e) => update("outputFormat", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option>PNG</option>
                  <option>JPG</option>
                  <option>WebP</option>
                </select>
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <ToggleRow
                label="添加水印"
                desc="在生成的主图上添加品牌水印"
                checked={settings.watermark}
                onChange={(v) => update("watermark", v)}
              />
              {settings.watermark && (
                <div className="mt-3 ml-1">
                  <input
                    value={settings.watermarkText}
                    onChange={(e) => update("watermarkText", e.target.value)}
                    placeholder="输入水印文字，例如：品牌名"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
              <Bell className="h-4 w-4 text-green-500" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              通知设置
            </h2>
          </div>
          <div className="space-y-3 rounded-xl bg-gray-50 p-4">
            <ToggleRow
              label="生成完成通知"
              desc="任务完成时发送浏览器通知"
              checked={settings.notifyOnComplete}
              onChange={(v) => update("notifyOnComplete", v)}
            />
            <ToggleRow
              label="生成失败通知"
              desc="任务失败时发送浏览器通知"
              checked={settings.notifyOnError}
              onChange={(v) => update("notifyOnError", v)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-blue-500" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
