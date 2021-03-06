import { useRouter } from 'next/router'

export const useProjectRoute = () => {
  const router = useRouter()
  const { login, projectSlug } = router.query
  const projectUrl = `/${login}/${projectSlug}`
  const projectSubUrl = router.pathname.replace('/[login]/[projectSlug]', '')
  return { login, projectSlug, projectUrl, projectSubUrl }
}
