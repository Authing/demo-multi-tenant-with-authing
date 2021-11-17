export function getBase64(
  img: Blob,
  callback: (r: string | ArrayBuffer | null) => void
) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
