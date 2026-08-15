import { MealDay, ShopItem } from './types';

export const WEEKLY_BUDGET = 23000;

export const meals: MealDay[] = [
  { day: '月曜日', items: [{icon:'🌅',text:'ご飯 + 卵焼き + 味噌汁',price:400},{icon:'☀️',text:'ご飯 + 鶏肉炒め',price:600},{icon:'🌙',text:'鯖の塩焼き + 野菜',price:700}]},
  { day: '火曜日', items: [{icon:'🌅',text:'パン + ゆで卵 + 牛乳',price:350},{icon:'☀️',text:'うどん + 豚肉野菜炒め',price:550},{icon:'🌙',text:'豆腐の照り焼き + サラダ',price:600}]},
  { day: '水曜日', items: [{icon:'🌅',text:'ご飯 + 納豆 + 味噌汁',price:350},{icon:'☀️',text:'牛カルビ炒め + キムチ',price:800},{icon:'🌙',text:'サーモン刺身 + 巻き寿司',price:850}]},
  { day: '木曜日', items: [{icon:'🌅',text:'パン + ヨーグルト + バナナ',price:300},{icon:'☀️',text:'チャーハン + 卵 + 鶏肉',price:500},{icon:'🌙',text:'鶏照り焼き + 味噌汁',price:650}]},
  { day: '金曜日', items: [{icon:'🌅',text:'ご飯 + 卵 + 海苔',price:350},{icon:'☀️',text:'そうめん + 鶏ささみ',price:500},{icon:'🌙',text:'塩鮭 + 焼き野菜',price:750}]},
  { day: '土曜日', items: [{icon:'🌅',text:'パンケーキ + フルーツ',price:400},{icon:'☀️',text:'ご飯 + スペアリブ',price:750},{icon:'🌙',text:'鍋 (鶏+野菜+豆腐+きのこ)',price:900}]},
  { day: '日曜日', items: [{icon:'🌅',text:'パン + 目玉焼き + 牛乳',price:400},{icon:'☀️',text:'カレーライス',price:600},{icon:'🌙',text:'プルコギ + キムチ + サラダ',price:850}]},
];

export const shopMain: ShopItem[] = [
  {name:'お米 (1.5kg)',qty:'1.5kg',price:600},{name:'鶏もも肉',qty:'800g',price:1200},{name:'鶏むね肉',qty:'400g',price:400},
  {name:'豚肉ロース',qty:'600g',price:1200},{name:'牛肉',qty:'400g',price:2000},{name:'鯖・あじ',qty:'3尾',price:750},
  {name:'サーモン',qty:'3切',price:1200},{name:'卵 (10個)',qty:'2パック',price:500},{name:'豆腐',qty:'4丁',price:320},
  {name:'牛乳 1L',qty:'2本',price:400},{name:'ヨーグルト',qty:'2個',price:400},{name:'チーズ',qty:'1個',price:200},
  {name:'食パン',qty:'2袋',price:300},{name:'うどん/そうめん',qty:'4袋',price:400},{name:'青菜/ほうれん草',qty:'3束',price:600},
  {name:'トマト+きゅうり',qty:'1袋',price:250},{name:'玉ねぎ・人参・じゃがいも',qty:'1セット',price:400},
  {name:'きのこ',qty:'2袋',price:300},{name:'季節の果物',qty:'5個',price:750},{name:'バナナ',qty:'1房',price:150},
  {name:'納豆',qty:'3パック',price:240},{name:'味噌・醤油',qty:'1',price:300}
];

export const shopSup: ShopItem[] = [
  {name:'肉・魚 追加',qty:'1',price:2000},{name:'野菜 追加',qty:'1',price:1000},
  {name:'果物 追加',qty:'1',price:600},{name:'牛乳+卵+ヨーグルト',qty:'1',price:700},
  {name:'お菓子',qty:'1',price:1000},{name:'予備',qty:'1',price:1700}
];

export const amazonItems: ShopItem[] = [
  {name:'森山A2牛乳 200ml×12',qty:'',price:2712},{name:'森永ミルク生活GOLD',qty:'',price:3789},
  {name:'アーモンド効果×24',qty:'',price:2812},{name:'い・ろ・は・す×24',qty:'',price:1900},
  {name:'GREEN DA・KA・RA×24',qty:'',price:1913},{name:'リステリン 1000ml',qty:'',price:988},
  {name:'NMN 400mg 30粒',qty:'',price:980},{name:'レノア ハピネス',qty:'',price:882},
  {name:'ForBack 薬用石鹸',qty:'',price:715}
];

export const CAT_COLORS: Record<string, string> = {
  'Thịt, cá, hải sản': '#E94560', 'Rau củ quả': '#00B894', 'Sữa, trứng, đậu': '#FDCB6E',
  'Gạo, mì, bánh mì': '#E17055', 'Gia vị, dầu ăn': '#6C5CE7', 'Snack, đồ uống': '#FD79A8',
  'Trái cây': '#00CEC9', 'Đồ khô, đồ hộp': '#636E72', 'Khác': '#B2BEC3'
};

export const CAT_NAMES = Object.keys(CAT_COLORS);