import type { Theme } from './types'

/**
 * Curated palettes keep "surprise me" combinations wearable.
 * Rows run from the outer (tier 1) to the inner (tier 6) setting.
 */
export const THEMES: Theme[] = [
  {
    id: 'starlight',
    name: '星河流光',
    note: '白金与月光白珠，清透得像一条星河',
    center: ['diamond-round', 'diamond-oval'],
    rows: [
      ['diamond-oval', 'diamond-round'],
      ['diamond-pear', 'diamond-round'],
      ['pearl-white', 'diamond-round'],
      ['diamond-emerald', 'diamond-oval'],
      ['diamond-pear', 'diamond-round'],
      ['diamond-oval', 'diamond-round'],
    ],
  },
  {
    id: 'ruby-night',
    name: '红宝之夜',
    note: '一抹鸽血红，落在黑珍珠与碎钻之间',
    center: ['ruby-oval', 'diamond-round'],
    rows: [
      ['diamond-round', 'diamond-oval'],
      ['pearl-black', 'diamond-round'],
      ['ruby-oval', 'diamond-pear'],
      ['diamond-pear', 'diamond-round'],
      ['pearl-black', 'ruby-oval'],
      ['diamond-round', 'diamond-oval'],
    ],
  },
  {
    id: 'royal-blue',
    name: '皇家蓝调',
    note: '蓝宝石与钻石交错，像夜空里的宫廷',
    center: ['sapphire-oval', 'diamond-emerald'],
    rows: [
      ['diamond-oval', 'diamond-round'],
      ['sapphire-oval', 'diamond-round'],
      ['diamond-round', 'diamond-emerald'],
      ['sapphire-oval', 'diamond-pear'],
      ['pearl-white', 'diamond-round'],
      ['diamond-round', 'diamond-oval'],
    ],
  },
  {
    id: 'forest',
    name: '翡翠森林',
    note: '祖母绿与金叶，藏着一段安静的森林',
    center: ['emerald-cut', 'diamond-emerald'],
    rows: [
      ['citrine-pear', 'diamond-round'],
      ['diamond-round', 'diamond-oval'],
      ['emerald-cut', 'diamond-emerald'],
      ['pearl-gold', 'diamond-round'],
      ['charm-leaf', 'emerald-cut'],
      ['diamond-round', 'pearl-gold'],
    ],
  },
  {
    id: 'mauve-garden',
    name: '紫雾花园',
    note: '紫水晶、摩根石与金花，落进一场粉色薄雾',
    center: ['amethyst-round', 'morganite-round'],
    rows: [
      ['charm-flower', 'diamond-round'],
      ['morganite-round', 'diamond-round'],
      ['amethyst-round', 'morganite-round'],
      ['pearl-pink', 'diamond-round'],
      ['diamond-round', 'morganite-round'],
      ['amethyst-round', 'diamond-oval'],
    ],
  },
  {
    id: 'pearl-dawn',
    name: '珍珠晨曦',
    note: '温润珍珠与碎钻，像清晨第一束光',
    center: ['pearl-white', 'pearl-gold'],
    rows: [
      ['charm-star', 'diamond-round'],
      ['pearl-gold', 'diamond-round'],
      ['diamond-round', 'diamond-oval'],
      ['pearl-pink', 'pearl-white'],
      ['diamond-oval', 'diamond-round'],
      ['pearl-white', 'diamond-round'],
    ],
  },
  {
    id: 'black-tie',
    name: '黑领结',
    note: '黑珍珠、金蝶结与阶梯钻，克制又华丽',
    center: ['diamond-emerald', 'diamond-round'],
    rows: [
      ['charm-bow', 'diamond-round'],
      ['pearl-black', 'diamond-round'],
      ['diamond-emerald', 'diamond-oval'],
      ['charm-bow', 'diamond-round'],
      ['pearl-black', 'diamond-round'],
      ['diamond-emerald', 'diamond-oval'],
    ],
  },
]

export const THEME_BY_ID = new Map(THEMES.map((theme) => [theme.id, theme]))
