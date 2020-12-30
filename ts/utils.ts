import * as UTF8 from './utf8'

export function stringToByte(str: string): number[] {
  if (typeof str !== 'string') {
    return str
  }

  str = UTF8.encode(str)

  const bytes: number[] = []
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i))
  }

  return bytes
}

export function byteToString(bytes: number[]): string {
  if (typeof bytes === 'string') {
    return bytes
  }

  const arr: string[] = []
  for (let i = 0; i < bytes.length; i++) {
    arr.push(String.fromCharCode(bytes[i]))
  }

  return UTF8.decode(arr.join(''))
}

export function hexString2Bytes(str: string): number[] {
  if (str.length % 2 != 0) {
    return []
  }

  const arrBytes = []
  for (let i = 0; i < str.length / 2; i++) {
    const s = str.substr(i * 2, 2)
    const v = parseInt(s, 16)
    arrBytes.push(v)
  }
  return arrBytes
}

export function bytes2HexString(arrBytes: number[]): string {
  let str = ''
  for (let i = 0; i < arrBytes.length; i++) {
    let tmp
    const num = arrBytes[i]
    if (num < 0) {
      //此处填坑，当byte因为符号位导致数值为负时候，需要对数据进行处理
      tmp = (255 + num + 1).toString(16)
    } else {
      tmp = num.toString(16)
    }
    if (tmp.length == 1) {
      tmp = '0' + tmp
    }
    str += tmp
  }
  return str
}
