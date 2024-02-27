export const convertAccountNr = (accountNr: string) => {
  switch (accountNr) {
    case '571617085':
      return 'private'
    case '102914974':
      return 'business'
    case '628664974':
      return 'savings'
    default:
      return 'UNKNOWN'
  }
}
