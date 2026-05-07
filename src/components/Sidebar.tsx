"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  LayoutTemplate,
  Settings,
  Zap,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "首页", icon: LayoutDashboard },
  { href: "/products", label: "商品任务", icon: ShoppingBag },
  { href: "/templates", label: "模板库", icon: LayoutTemplate },
  { href: "/settings", label: "设置", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-gray-100 bg-white">
      <div className="flex h-14 items-center gap-2.5 border-b border-gray-100 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm shadow-blue-500/20">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-gray-900">
          AI 商品助手
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 px-4 py-4">
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-3">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-xs font-semibold text-blue-700">AI Powered</p>
            <p className="text-[10px] text-blue-400">GPT-4o 驱动</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
