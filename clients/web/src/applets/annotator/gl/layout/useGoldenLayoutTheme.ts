import { useCssVars } from '@/libs/hooks/useCssVar'

export const useGoldenLayoutTheme = () => {
  useCssVars({
    'color-layout-base-bkgd': ['gray.200', 'gray.900'],
    'color-layout-active-tab-fore': ['gray.900', 'gray.900'],
    'color-layout-popin-icon-border-fore': ['gray.200', 'gray.800'],
    'color-layout-focused-tab-bkgd': ['gray.200', 'gray.800'],
    'color-layout-single-pane-content-bkgd': ['gray.50', 'gray.800'],
    'color-layout-target-indicator-outline-fore': ['gray.400', 'gray.400']
  })
}
