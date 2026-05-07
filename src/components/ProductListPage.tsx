"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Loader2,
  Eye,
  Trash2,
  RefreshCw,
  Zap,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import { MOCK_TASKS, STYLE_OPTIONS } from "@/lib/mock-data";
import type { ProductTask } from "@/lib/mock-data";
import BatchImportModal from "./BatchImportModal";

export default function ProductListPage() {
  const [tasks, setTasks] = useState<ProductTask[]>(MOCK_TASKS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("全部");
  const [styleFilter, setStyleFilter] = useState<string>("全部");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [testStep, setTestStep] = useState(0);

  const filtered = tasks.filter((t) => {
    const matchSearch =
      t.name.includes(search) ||
      t.brand.includes(search) ||
      t.category.includes(search);
    const matchStatus =
      statusFilter === "全部" || t.status === statusFilter;
    const matchStyle = styleFilter === "全部" || t.style === styleFilter;
    return matchSearch && matchStatus && matchStyle;
  });

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setMenuOpen(null);
  };

  const retryTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "生成中" as const } : t))
    );
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "已完成" as const } : t
        )
      );
    }, 2000);
    setMenuOpen(null);
  };

  const statusIcon = (s: ProductTask["status"]) => {
    if (s === "已完成")
      return <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />;
    if (s === "生成中")
      return <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500" />;
    return <Clock className="h-3.5 w-3.5 text-gray-400" />;
  };

  const runFullFlowTest = () => {
    setTestRunning(true);
    setTestStep(1);
    const steps = [
      { delay: 1200, next: 2 },
      { delay: 1800, next: 3 },
      { delay: 1500, next: 4 },
      { delay: 1000, next: 5 },
    ];
    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        setTasks((prev) =>
          prev.map((t) =>
            t.status === "待生成" ? { ...t, status: "已完成" as const } : t
          )
        );
        setTimeout(() => {
          setTestRunning(false);
          setTestStep(0);
        }, 1500);
        return;
      }
      setTimeout(() => {
        setTestStep(steps[i].next);
        if (i === 1) {
          setTasks((prev) =>
            prev.map((t) =>
              t.status === "待生成"
                ? { ...t, status: "生成中" as const }
                : t
            )
          );
        }
        i++;
        tick();
      }, steps[i].delay);
    };
    tick();
  };

  const TEST_STEPS = [
    "加载测试数据",
    "解析商品信息",
    "AI 生成主图与文案",
    "保存到素材库",
    "完成",
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">商品任务列表</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理所有商品的主图与文案生成任务
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowBatchModal(true)}
            className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition-all hover:bg-green-100"
          >
            <FileSpreadsheet className="h-4 w-4" />
            批量导入
          </button>
          <button
            onClick={runFullFlowTest}
            disabled={testRunning}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/30 disabled:opacity-60"
          >
            <Zap className="h-4 w-4" />
            {testRunning ? "测试中..." : "一键测试全流程"}
          </button>
          <Link
            href="/products/new"
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            新建任务
          </Link>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索商品名、品牌、类别..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option>全部</option>
          <option>已完成</option>
          <option>生成中</option>
          <option>待生成</option>
        </select>
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
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                商品
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                类别
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                风格
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                价格
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                状态
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                创建时间
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((task) => (
              <tr
                key={task.id}
                className="group transition-colors hover:bg-gray-50/50"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-900">
                    {task.name}
                  </p>
                  <p className="text-xs text-gray-400">{task.brand}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {task.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-600">
                  {task.style}
                </td>
                <td className="px-5 py-4 text-sm font-medium text-gray-900">
                  ¥{task.price}
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                    {statusIcon(task.status)}
                    {task.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-400">
                  {task.createdAt}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === task.id ? null : task.id)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {menuOpen === task.id && (
                      <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">
                          <Eye className="h-3.5 w-3.5" />
                          查看结果
                        </button>
                        <button
                          onClick={() => retryTask(task.id)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          重新生成
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          删除
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Filter className="mb-3 h-10 w-10 text-gray-200" />
            <p className="text-sm font-medium text-gray-500">
              没有找到匹配的任务
            </p>
            <p className="text-xs text-gray-400">
              尝试调整筛选条件或创建新任务
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        共 {filtered.length} 条任务
      </div>

      {testRunning && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-xl">
            {TEST_STEPS.map((label, i) => {
              const stepIdx = i + 1;
              const isActive = testStep >= stepIdx;
              const isCurrent = testStep === stepIdx;
              return (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <div
                      className={`h-px w-6 ${
                        isActive ? "bg-blue-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                  <div className="flex items-center gap-1.5">
                    {testStep > stepIdx ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-200" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        isCurrent
                          ? "text-blue-600"
                          : isActive
                            ? "text-gray-700"
                            : "text-gray-300"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showBatchModal && (
        <BatchImportModal onClose={() => setShowBatchModal(false)} />
      )}
    </div>
  );
}
