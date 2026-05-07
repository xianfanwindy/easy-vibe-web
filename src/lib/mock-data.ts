export interface ProductForm {
  name: string;
  sellingPoints: string;
  category: string;
  price: string;
  brand: string;
  targetUser: string;
  style: "简洁白底风" | "电商促销风" | "小红书风";
  material: string;
  size: string;
  color: string;
  referenceLinks: string;
  saveToAssetLibrary: boolean;
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export interface GeneratedResult {
  mainImages: MainImage[];
  title: string;
  sellingPoints: string[];
  marketingCopy: string[];
}

export interface MainImage {
  id: number;
  gradient: string;
  tag: string;
  layout: string;
}

export interface ProductTask {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: string;
  style: ProductForm["style"];
  status: "待生成" | "生成中" | "已完成";
  createdAt: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  style: ProductForm["style"];
  gradient: string;
  tag: string;
  favorite: boolean;
  usageCount: number;
}

export const CATEGORY_OPTIONS = [
  "数码电子",
  "服饰鞋包",
  "美妆护肤",
  "食品生鲜",
  "家居日用",
  "母婴玩具",
  "运动户外",
  "图书文具",
];

export const STYLE_OPTIONS: ProductForm["style"][] = [
  "简洁白底风",
  "电商促销风",
  "小红书风",
];

export const EMPTY_FORM: ProductForm = {
  name: "",
  sellingPoints: "",
  category: "",
  price: "",
  brand: "",
  targetUser: "",
  style: "简洁白底风",
  material: "",
  size: "",
  color: "",
  referenceLinks: "",
  saveToAssetLibrary: true,
};

export const DEMO_FORM: ProductForm = {
  name: "智能降噪蓝牙耳机 Pro Max",
  sellingPoints:
    "主动降噪深度45dB\n蓝牙5.3低延迟\n单次续航40小时\nHi-Res金标认证\nIPX5防水等级",
  category: "数码电子",
  price: "299",
  brand: "SoundX",
  targetUser: "18-35岁音乐爱好者/通勤上班族",
  style: "简洁白底风",
  material: "ABS+硅胶",
  size: "单只约5g",
  color: "星空黑 / 冰晶白",
  referenceLinks: "https://example.com/hot-earbuds-2026",
  saveToAssetLibrary: true,
};

export const BATCH_TEST_DATA: ProductForm[] = [
  {
    name: "智能降噪蓝牙耳机 Pro Max",
    sellingPoints: "主动降噪45dB\n蓝牙5.3低延迟\n续航40小时",
    category: "数码电子",
    price: "299",
    brand: "SoundX",
    targetUser: "18-35岁通勤上班族",
    style: "简洁白底风",
    material: "ABS+硅胶",
    size: "单只约5g",
    color: "星空黑",
    referenceLinks: "",
    saveToAssetLibrary: true,
  },
  {
    name: "夏季冰丝防晒衣女款",
    sellingPoints: "UPF50+防晒\n冰丝凉感面料\n轻薄透气可收纳",
    category: "服饰鞋包",
    price: "79",
    brand: "SunnyWear",
    targetUser: "20-40岁户外女性",
    style: "小红书风",
    material: "冰丝涤纶",
    size: "S/M/L/XL",
    color: "薄荷绿 / 樱花粉",
    referenceLinks: "",
    saveToAssetLibrary: true,
  },
  {
    name: "多功能空气炸锅5L",
    sellingPoints: "5L大容量\n无油低脂\n12种预设菜单",
    category: "家居日用",
    price: "259",
    brand: "CookPro",
    targetUser: "家庭主妇/租房青年",
    style: "电商促销风",
    material: "不锈钢+PP",
    size: "320×280×330mm",
    color: "奶油白",
    referenceLinks: "",
    saveToAssetLibrary: false,
  },
];

export const MOCK_TASKS: ProductTask[] = [
  {
    id: "t1",
    name: "智能降噪蓝牙耳机 Pro Max",
    category: "数码电子",
    brand: "SoundX",
    price: "299",
    style: "简洁白底风",
    status: "已完成",
    createdAt: "2026-05-06 14:30",
  },
  {
    id: "t2",
    name: "夏季新款防晒衣女",
    category: "服饰鞋包",
    brand: "SunnyWear",
    price: "89",
    style: "小红书风",
    status: "已完成",
    createdAt: "2026-05-06 10:15",
  },
  {
    id: "t3",
    name: "精华液抗皱紧致套装",
    category: "美妆护肤",
    brand: "GlowLab",
    price: "168",
    style: "电商促销风",
    status: "已完成",
    createdAt: "2026-05-05 16:45",
  },
  {
    id: "t4",
    name: "儿童益智积木套装",
    category: "母婴玩具",
    brand: "FunBrick",
    price: "59",
    style: "电商促销风",
    status: "生成中",
    createdAt: "2026-05-05 09:20",
  },
  {
    id: "t5",
    name: "运动瑜伽裤高腰提臀",
    category: "运动户外",
    brand: "FlexFit",
    price: "129",
    style: "小红书风",
    status: "待生成",
    createdAt: "2026-05-04 20:10",
  },
  {
    id: "t6",
    name: "家用空气炸锅大容量",
    category: "家居日用",
    brand: "CookPro",
    price: "259",
    style: "简洁白底风",
    status: "待生成",
    createdAt: "2026-05-04 11:30",
  },
  {
    id: "t7",
    name: "有机坚果混合礼盒",
    category: "食品生鲜",
    brand: "NutriBox",
    price: "98",
    style: "电商促销风",
    status: "已完成",
    createdAt: "2026-05-03 15:00",
  },
  {
    id: "t8",
    name: "便携式蓝牙音箱户外版",
    category: "数码电子",
    brand: "BoomSound",
    price: "199",
    style: "简洁白底风",
    status: "已完成",
    createdAt: "2026-05-03 08:45",
  },
];

export const MOCK_TEMPLATES: TemplateItem[] = [
  {
    id: "tpl1",
    name: "极简白底产品居中",
    category: "数码电子",
    style: "简洁白底风",
    gradient: "from-gray-100 to-white",
    tag: "爆款推荐",
    favorite: true,
    usageCount: 128,
  },
  {
    id: "tpl2",
    name: "极简左侧产品右侧文字",
    category: "通用",
    style: "简洁白底风",
    gradient: "from-slate-50 to-gray-100",
    tag: "品质之选",
    favorite: false,
    usageCount: 86,
  },
  {
    id: "tpl3",
    name: "红色促销爆炸贴",
    category: "服饰鞋包",
    style: "电商促销风",
    gradient: "from-red-500 to-orange-400",
    tag: "限时秒杀",
    favorite: true,
    usageCount: 234,
  },
  {
    id: "tpl4",
    name: "黄红对角促销构图",
    category: "食品生鲜",
    style: "电商促销风",
    gradient: "from-yellow-400 to-red-500",
    tag: "买一送一",
    favorite: false,
    usageCount: 167,
  },
  {
    id: "tpl5",
    name: "少女粉柔光手写风",
    category: "美妆护肤",
    style: "小红书风",
    gradient: "from-pink-200 to-rose-100",
    tag: "必入好物",
    favorite: true,
    usageCount: 312,
  },
  {
    id: "tpl6",
    name: "杂志排版氛围感",
    category: "服饰鞋包",
    style: "小红书风",
    gradient: "from-purple-200 to-pink-100",
    tag: "亲测好用",
    favorite: false,
    usageCount: 198,
  },
  {
    id: "tpl7",
    name: "ins风暖色贴纸装饰",
    category: "家居日用",
    style: "小红书风",
    gradient: "from-rose-100 to-amber-100",
    tag: "颜值担当",
    favorite: true,
    usageCount: 145,
  },
  {
    id: "tpl8",
    name: "橙粉渐变倒计时促销",
    category: "母婴玩具",
    style: "电商促销风",
    gradient: "from-orange-500 to-pink-500",
    tag: "今日特价",
    favorite: false,
    usageCount: 98,
  },
  {
    id: "tpl9",
    name: "极简特写底部信息栏",
    category: "数码电子",
    style: "简洁白底风",
    gradient: "from-zinc-50 to-gray-50",
    tag: "限时特惠",
    favorite: false,
    usageCount: 76,
  },
];

export const MOCK_RESULTS: Record<ProductForm["style"], GeneratedResult> = {
  "简洁白底风": {
    mainImages: [
      {
        id: 1,
        gradient: "from-gray-100 to-white",
        tag: "爆款推荐",
        layout: "产品居中 · 白色背景 · 顶部标签",
      },
      {
        id: 2,
        gradient: "from-slate-50 to-gray-100",
        tag: "品质之选",
        layout: "产品左侧 · 文字右侧 · 极简排版",
      },
      {
        id: 3,
        gradient: "from-zinc-50 to-gray-50",
        tag: "限时特惠",
        layout: "产品特写 · 底部信息栏 · 干净留白",
      },
    ],
    title:
      "SoundX 智能降噪蓝牙耳机 Pro Max | Hi-Res金标认证 45dB主动降噪 40小时超长续航",
    sellingPoints: [
      "45dB 深度主动降噪，地铁公交也能沉浸听歌",
      "蓝牙 5.3 芯片，游戏低延迟不卡顿",
      "单次 40 小时续航，一周一充无焦虑",
      "Hi-Res 金标认证，还原录音棚级音质",
      "IPX5 防水，运动出汗不担心",
      "人体工学设计，久戴不胀痛",
    ],
    marketingCopy: [
      "戴上它，世界为你安静 — 45dB深度降噪，一键开启私人音乐厅",
      "一周只充一次电的蓝牙耳机，到底有多爽？",
      "「耳朵怀孕了」—— 10万+用户的评价，Hi-Res音质不是说说而已",
      "通勤党的救星！降噪+长续航+佩戴舒适，三合一的完美选择",
    ],
  },
  "电商促销风": {
    mainImages: [
      {
        id: 1,
        gradient: "from-red-500 to-orange-400",
        tag: "限时秒杀",
        layout: "爆炸贴纸 · 价格突出 · 红色主调",
      },
      {
        id: 2,
        gradient: "from-yellow-400 to-red-500",
        tag: "买一送一",
        layout: "对角构图 · 促销标签 · 视觉冲击",
      },
      {
        id: 3,
        gradient: "from-orange-500 to-pink-500",
        tag: "今日特价",
        layout: "满屏铺底 · 倒计时 · 紧迫感",
      },
    ],
    title:
      "🔥【限时疯抢】SoundX降噪蓝牙耳机 45dB深度降噪+40h续航 官方直降200元",
    sellingPoints: [
      "💰 日常价499 今日到手仅299！直降200元",
      "🎧 45dB旗舰级降噪 通勤出行必备神器",
      "⚡ 40小时超长续航 告别电量焦虑",
      "🏆 Hi-Res金标认证 万元级音质体验",
      "💧 IPX5防水等级 运动健身放心用",
      "📦 下单即送耳机收纳盒+备用耳塞",
    ],
    marketingCopy: [
      "🚀 爆款返场！上次3分钟售罄的降噪耳机又来了，这次手速要快！",
      "💸 299元买到499的体验，错过这波再等半年！",
      "📢 30天无理由退换 | 正品保障 | 顺丰包邮 —— 你还在犹豫什么？",
      "🔥 已售50000+ 好评率99.6% | 闭眼入不踩雷",
    ],
  },
  "小红书风": {
    mainImages: [
      {
        id: 1,
        gradient: "from-pink-200 to-rose-100",
        tag: "必入好物",
        layout: "少女粉调 · 柔光滤镜 · 手写风格",
      },
      {
        id: 2,
        gradient: "from-purple-200 to-pink-100",
        tag: "亲测好用",
        layout: "杂志排版 · 氛围感 · 生活场景",
      },
      {
        id: 3,
        gradient: "from-rose-100 to-amber-100",
        tag: "颜值担当",
        layout: "ins风 · 暖色调 · 贴纸装饰",
      },
    ],
    title:
      "姐妹们！这个降噪耳机也太绝了吧😭 戴上就是私人音乐厅🎵",
    sellingPoints: [
      "🌟 颜值超高！磨砂质感拿在手里很高级",
      "🔇 降噪效果真的绝了！地铁上完全听不到外面的声音",
      "🔋 续航40小时！出差一周都不用充电",
      "🎵 音质很能打！听歌跟在现场一样",
      "💦 防水！跑步出汗完全不用担心",
      "☁️ 久戴不痛！通宵追剧耳朵都不累",
    ],
    marketingCopy: [
      "姐妹们冲！这个耳机我已经回购第3个了，送给闺蜜都夸好！🎧💕",
      "用了一周真实感受：降噪yyds！坐地铁终于不用开最大音量了😭",
      "男朋友送的礼物开箱🎁 这个音质我以为自己在演唱会现场！",
      "小红书10w+收藏的耳机到底值不值？亲测告诉你：闭眼入就对了！✨",
    ],
  },
};
