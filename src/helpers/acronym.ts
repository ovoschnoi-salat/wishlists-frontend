export function getAcronymFromNameOrUsername(name: string | undefined, username: string | undefined): string {
  if (!name || name.trim().length === 0) {
    if (!username || username.trim().length === 0) {
      return "";
    }
    return username.trim()[0]
  } else {
    const words = name.trim().split(" ")
    let acronym = words.map(value => {
      if (value.length > 0) {
        return value[0]
      }
      return ""
    }).join("")
    if (acronym.length > 2) {
      acronym = acronym.substring(0, 2)
    }
    return acronym.toUpperCase()
  }
}