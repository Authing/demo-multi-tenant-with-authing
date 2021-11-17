export const getTenantDomain = () => {
  const firstDomain = window.location.hostname.split('.')[0]
  const lastDomain = window.location.hostname.split('.').slice(-1)[0]

  if (firstDomain === lastDomain) {
    return null
  }

  return firstDomain
}
