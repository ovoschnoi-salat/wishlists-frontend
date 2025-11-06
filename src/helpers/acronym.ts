export function usernameAndNameToAcronym(name: string|undefined, username: string): string {
  if (!name) {
    if (username.length > 0) {
      return username[0]
    } else {
      return ""
    }
  } else {
    let words = name.trim().split(" ")
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