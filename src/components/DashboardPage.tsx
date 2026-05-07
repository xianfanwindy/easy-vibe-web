"use client";

import {
  ShoppingBag,
  LayoutTemplate,
  CheckCircle2,
  Clock,
  Loader2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import { MOCK_TASKS, MOCK_TEMPLATES } from "@/lib/mock-data";

const completed = MOCK_TASKS.filter((t) => t.status === "已完成").length;
const processing = MOCK_TASKS.filter((t) => t.status === "生成中").length;
const pending = MOCK_TASKS.filter((t) => t.status === "待生成").length;
const total = MOCK_TASKS.length;
const favTemplates = MOCK_TEMPLATES.filter((t) => t.favorite).length;

const STATS = [
  {
    label: "总任务数",
    value: total,
    icon: ShoppingBag,
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    label: "已完成",
    value: completed,
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600",
    iconBg: "bg-green-100",
  },
  {
    label: "生成中",
    value: processing,
    icon: Loader2,
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    label: "待处理",
    value: pending,
    icon: Clock,
    color: "bg-gray-50 text-gray-600",
    iconBg: "bg-gray-100",
  },
];

export default function DashboardPage() {
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          欢迎回来
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          这里是你 AI 商品助手的工作台概览
        </p>
      </div>

      <div className="mb-8 grid grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {s.label}
                </span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.iconBg}`}
                >
                  <Icon className={`h-[18px] w-[18px] ${s.color.split(" ")[1]}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold text-gray-900">
              整体进度
            </span>
          </div>
          <span className="text-sm font-bold text-blue-600">
            {progressPct}%
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-3 flex gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            已完成 {completed}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            生成中 {processing}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            待处理 {pending}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">最近任务</h3>
            <Link
              href="/products"
              className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
            >
              查看全部 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_TASKS.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {task.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {task.brand} · {task.category}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    task.status === "已完成"
                      ? "bg-green-50 text-green-600"
                      : task.status === "生成中"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              收藏模板
              <span className="ml-1.5 text-xs font-normal text-gray-400">
                {favTemplates} 个
              </span>
            </h3>
            <Link
              href="/templates"
              className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600"
            >
              模板库 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {MOCK_TEMPLATES.filter((t) => t.favorite)
              .slice(0, 4)
              .map((tpl) => (
                <div
                  key={tpl.id}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div
                    className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${tpl.gradient}`}
                  >
                    <Sparkles className="h-8 w-8 text-gray-300" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-3 py-2 pt-6">
                    <p className="text-xs font-medium text-white">
                      {tpl.name}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/30"
        >
          <Sparkles className="h-4 w-4" />
          开始创建新任务
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/30"
        >
          <Zap className="h-4 w-4" />
          一键测试全流程
        </Link>
        <Link
          href="/products/new"
          className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition-all hover:bg-green-100"
        >
          <FileSpreadsheet className="h-4 w-4" />
          批量导入测试
        </Link>
      </div>
    </div>
  );
}
