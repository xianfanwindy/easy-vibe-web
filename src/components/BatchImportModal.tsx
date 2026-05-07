"use client";

import { useState } from "react";
import {
  X,
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  Loader2,
  Download,
  ChevronRight,
} from "lucide-react";
import { BATCH_TEST_DATA, MOCK_RESULTS } from "@/lib/mock-data";
import type { ProductForm, GeneratedResult } from "@/lib/mock-data";

interface Props {
  onClose: () => void;
}

type Step = "upload" | "preview" | "generating" | "done";

interface BatchItem extends ProductForm {
  status: "pending" | "generating" | "done";
  result?: GeneratedResult;
}

export default function BatchImportModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>("upload");
  const [items, setItems] = useState<BatchItem[]>([]);
  const [progress, setProgress] = useState(0);

  const handleLoadTestData = () => {
    setItems(
      BATCH_TEST_DATA.map((d) => ({
        ...d,
        status: "pending" as const,
      }))
    );
    setStep("preview");
  };

  const handleFileUpload = () => {
    handleLoadTestData();
  };

  const handleStartGenerate = () => {
    setStep("generating");
    setProgress(0);

    let idx = 0;
    const total = items.length;

    const tick = () => {
      if (idx >= total) {
        setStep("done");
        return;
      }

      setItems((prev) =>
        prev.map((item, i) =>
          i === idx ? { ...item, status: "generating" as const } : item
        )
      );

      setTimeout(() => {
        setItems((prev) =>
          prev.map((item, i) =>
            i === idx
              ? {
                  ...item,
                  status: "done" as const,
                  result: MOCK_RESULTS[item.style],
                }
              : item
          )
        );
        idx++;
        setProgress(Math.round((idx / total) * 100));
        setTimeout(tick, 500);
      }, 1500);
    };

    tick();
  };

  const doneCount = items.filter((i) => i.status === "done").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative flex max-h-[85vh] w-[720px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                批量导入商品
              </h2>
              <p className="text-xs text-gray-400">
                通过 Excel 导入或加载测试数据，批量生成图文草稿
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-gray-50 px-6 py-3">
          {(["upload", "preview", "generating", "done"] as Step[]).map(
            (s, i) => {
              const labels = ["上传素材", "确认数据", "批量生成", "完成"];
              const isActive =
                ["upload", "preview", "generating", "done"].indexOf(step) >= i;
              const isCurrent = step === s;
              return (
                <div key={s} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
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
                    {labels[i]}
                  </span>
                </div>
              );
            }
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === "upload" && (
            <div className="space-y-4">
              <div
                onClick={handleFileUpload}
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 p-10 transition-all hover:border-blue-300 hover:bg-blue-50/30"
              >
                <Upload className="h-10 w-10 text-gray-300" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    点击上传 Excel 文件
                  </p>
                  <p className="text-xs text-gray-400">
                    支持 .xlsx / .csv 格式
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-gray-400">或</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <button
                onClick={handleLoadTestData}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-100"
              >
                <Download className="h-4 w-4" />
                加载测试数据（3条商品）
              </button>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="mb-2 text-xs font-semibold text-gray-600">
                  Excel 模板格式
                </p>
                <div className="overflow-x-auto text-xs text-gray-500">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-2 py-1.5 text-left font-medium">
                          商品名称
                        </th>
                        <th className="px-2 py-1.5 text-left font-medium">
                          类别
                        </th>
                        <th className="px-2 py-1.5 text-left font-medium">
                          品牌
                        </th>
                        <th className="px-2 py-1.5 text-left font-medium">
                          价格
                        </th>
                        <th className="px-2 py-1.5 text-left font-medium">
                          卖点
                        </th>
                        <th className="px-2 py-1.5 text-left font-medium">
                          材质
                        </th>
                        <th className="px-2 py-1.5 text-left font-medium">
                          尺寸
                        </th>
                        <th className="px-2 py-1.5 text-left font-medium">
                          颜色
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-1.5 text-gray-400">
                          智能蓝牙耳机
                        </td>
                        <td className="px-2 py-1.5 text-gray-400">数码电子</td>
                        <td className="px-2 py-1.5 text-gray-400">SoundX</td>
                        <td className="px-2 py-1.5 text-gray-400">299</td>
                        <td className="px-2 py-1.5 text-gray-400">
                          降噪45dB;续航40h
                        </td>
                        <td className="px-2 py-1.5 text-gray-400">ABS+硅胶</td>
                        <td className="px-2 py-1.5 text-gray-400">单只5g</td>
                        <td className="px-2 py-1.5 text-gray-400">黑色</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  已加载 <span className="font-bold text-gray-900">{items.length}</span>{" "}
                  条商品数据，请确认后开始批量生成
                </p>
                <button
                  onClick={() => {
                    setItems([]);
                    setStep("upload");
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  清空重选
                </button>
              </div>
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.brand} · {item.category} · ¥{item.price}
                        {item.material && ` · ${item.material}`}
                        {item.color && ` · ${item.color}`}
                      </p>
                    </div>
                    <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                      {item.style}
                    </span>
                    {item.saveToAssetLibrary && (
                      <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-500">
                        存入素材库
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "generating" && (
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    批量生成中...
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {doneCount}/{items.length}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3"
                  >
                    {item.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : item.status === "generating" ? (
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-200" />
                    )}
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {item.status === "done"
                        ? "已完成"
                        : item.status === "generating"
                          ? "生成中..."
                          : "等待中"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="space-y-5">
              <div className="flex flex-col items-center py-4">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <CheckCircle2 className="h-7 w-7 text-green-500" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  批量生成完成
                </p>
                <p className="text-sm text-gray-400">
                  共 {items.length} 个商品的图文草稿已生成
                </p>
              </div>

              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-gray-100 bg-white p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">
                        {item.style}
                      </span>
                    </div>
                    {item.result && (
                      <div className="ml-6 space-y-1">
                        <p className="text-xs text-gray-600 line-clamp-1">
                          <span className="font-medium">标题：</span>
                          {item.result.title}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          <span className="font-medium">卖点：</span>
                          {item.result.sellingPoints.slice(0, 2).join("；")}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
                >
                  关闭
                </button>
                <button
                  onClick={() => {
                    setItems([]);
                    setStep("upload");
                  }}
                  className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600"
                >
                  继续导入下一批
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
