import type {
  CategoryMeta,
  Material,
  MaterialCategory,
  MaterialColors,
} from './types'

export const CATEGORIES: CategoryMeta[] = [
  { id: 'diamond', label: '钻石', latin: 'DIAMOND' },
  { id: 'gem', label: '宝石', latin: 'GEMSTONE' },
  { id: 'pearl', label: '珍珠', latin: 'PEARL' },
  { id: 'charm', label: '配件', latin: 'DETAIL' },
]

const diamond: MaterialColors = {
  light: '#f8fcff',
  mid: '#d9e9f7',
  dark: '#8ba6c0',
  rim: '#ffffff',
}

const ruby: MaterialColors = {
  light: '#ff8da0',
  mid: '#c91e40',
  dark: '#68071e',
  rim: '#ffc4ce',
}

const sapphire: MaterialColors = {
  light: '#8bb2ff',
  mid: '#2550bd',
  dark: '#071d61',
  rim: '#c9dcff',
}

const emerald: MaterialColors = {
  light: '#7be4b8',
  mid: '#0d8058',
  dark: '#023827',
  rim: '#c2f9e2',
}

const amethyst: MaterialColors = {
  light: '#d8acff',
  mid: '#7c39ba',
  dark: '#2e0b56',
  rim: '#efd8ff',
}

const citrine: MaterialColors = {
  light: '#ffe596',
  mid: '#d69a19',
  dark: '#714500',
  rim: '#fff4cd',
}

const morganite: MaterialColors = {
  light: '#ffdce1',
  mid: '#df8b9d',
  dark: '#7c3444',
  rim: '#fff1f3',
}

const pearlWhite: MaterialColors = {
  light: '#fffef8',
  mid: '#e7e2d6',
  dark: '#a8a398',
  rim: '#ffffff',
}

const pearlGold: MaterialColors = {
  light: '#fff5d4',
  mid: '#f2ce83',
  dark: '#a97833',
  rim: '#fff9e5',
}

const pearlPink: MaterialColors = {
  light: '#fff4f5',
  mid: '#f0c2ca',
  dark: '#a9737d',
  rim: '#fffafb',
}

const pearlBlack: MaterialColors = {
  light: '#c9d9d4',
  mid: '#455d5e',
  dark: '#0c1a1c',
  rim: '#eef5f1',
}

const gold: MaterialColors = {
  light: '#fff1b8',
  mid: '#d7ae58',
  dark: '#79511a',
  rim: '#fff8dd',
}

export const MATERIALS: Material[] = [
  // Diamonds
  {
    id: 'diamond-round',
    name: '璀璨圆钻',
    category: 'diamond',
    shape: 'round',
    colors: diamond,
    description: '明亮式切工，火彩干净而耀眼',
  },
  {
    id: 'diamond-oval',
    name: '椭圆钻',
    category: 'diamond',
    shape: 'oval',
    colors: diamond,
    description: '修长的椭圆轮廓，衬得颈线更优雅',
  },
  {
    id: 'diamond-pear',
    name: '水滴钻',
    category: 'diamond',
    shape: 'pear',
    colors: diamond,
    description: '一颗悬垂的水滴，像月光的末端',
  },
  {
    id: 'diamond-emerald',
    name: '阶梯钻',
    category: 'diamond',
    shape: 'emerald',
    colors: diamond,
    description: '几何阶梯切工，利落又通透',
  },

  // Coloured gemstones
  {
    id: 'ruby-oval',
    name: '鸽血红宝',
    category: 'gem',
    shape: 'oval',
    colors: ruby,
    description: '浓郁炽热的红，是全场唯一的焦点',
  },
  {
    id: 'sapphire-oval',
    name: '皇家蓝宝',
    category: 'gem',
    shape: 'oval',
    colors: sapphire,
    description: '深邃的皇家蓝，自带贵族气场',
  },
  {
    id: 'emerald-cut',
    name: '祖母绿',
    category: 'gem',
    shape: 'emerald',
    colors: emerald,
    description: '哥伦比亚色调，像一潭安静的森林',
  },
  {
    id: 'amethyst-round',
    name: '紫水晶',
    category: 'gem',
    shape: 'round',
    colors: amethyst,
    description: '带一点雾感的紫，温柔又神秘',
  },
  {
    id: 'citrine-pear',
    name: '黄水晶',
    category: 'gem',
    shape: 'pear',
    colors: citrine,
    description: '暖金色的光，像被阳光晒透',
  },
  {
    id: 'morganite-round',
    name: '摩根石',
    category: 'gem',
    shape: 'round',
    colors: morganite,
    description: '柔和的樱花粉，适合温柔的主角',
  },

  // Pearls
  {
    id: 'pearl-white',
    name: '月光白珠',
    category: 'pearl',
    shape: 'pearl',
    colors: pearlWhite,
    description: '细腻珠光，像月光落在颈间',
  },
  {
    id: 'pearl-gold',
    name: '南洋金珠',
    category: 'pearl',
    shape: 'pearl',
    colors: pearlGold,
    description: '暖金色珠光，低调而丰盈',
  },
  {
    id: 'pearl-pink',
    name: '樱花粉珠',
    category: 'pearl',
    shape: 'pearl',
    colors: pearlPink,
    description: '淡淡的粉色晕光，轻盈又浪漫',
  },
  {
    id: 'pearl-black',
    name: '大溪地黑珠',
    category: 'pearl',
    shape: 'pearl',
    colors: pearlBlack,
    description: '孔雀绿暗光，是神秘感的来源',
  },

  // Gold details
  {
    id: 'charm-star',
    name: '金星坠',
    category: 'charm',
    shape: 'star',
    colors: gold,
    description: '一枚小小的幸运星，点亮整条项链',
  },
  {
    id: 'charm-flower',
    name: '金花坠',
    category: 'charm',
    shape: 'flower',
    colors: gold,
    description: '手工雕琢的金色花朵，复古又轻盈',
  },
  {
    id: 'charm-bow',
    name: '金蝶结',
    category: 'charm',
    shape: 'bow',
    colors: gold,
    description: '缎带般的金蝶结，藏着一点俏皮',
  },
  {
    id: 'charm-leaf',
    name: '金叶坠',
    category: 'charm',
    shape: 'leaf',
    colors: gold,
    description: '叶脉清晰的立体金叶，自然又生动',
  },
]

export const MATERIALS_BY_ID = new Map(
  MATERIALS.map((material) => [material.id, material]),
)

export const MATERIALS_BY_CATEGORY = CATEGORIES.reduce(
  (groups, category) => {
    groups[category.id] = MATERIALS.filter(
      (material) => material.category === category.id,
    )
    return groups
  },
  {} as Record<MaterialCategory, Material[]>,
)

export function getMaterial(id: string | undefined): Material | undefined {
  return id ? MATERIALS_BY_ID.get(id) : undefined
}
