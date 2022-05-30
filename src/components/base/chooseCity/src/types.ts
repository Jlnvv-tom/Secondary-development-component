export interface City {
  id: number,
  // 拼音
  spell: string,
  // 名字
  name: string
}

export interface Province {
  name: string,
  data: string[],
  id?: string
}