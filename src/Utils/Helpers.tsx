export const centerEllipsis = (address: string, remaining: number = 6) => {
  if (address.length <= remaining * 2) {
    return address
  }
  return `${address.substr(0, remaining)}...${address.substr(
    address.length - remaining,
    remaining,
  )}`
}

export const testLocalStorage = () => {
  try {
    localStorage.setItem("test", "test")
    localStorage.removeItem("test")
    return true
  } catch (e) {
    return false
  }
}
