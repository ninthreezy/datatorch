import React, { useState } from 'react'
import NextLink from 'next/link'
import {
  Box,
  BoxProps,
  chakra,
  Divider,
  Flex,
  Icon,
  Link,
  Tag,
  Text,
  useColorModeValue,
  useColorModeValue as mode
} from '@chakra-ui/react'
import { MdFeedback, MdGroupWork, MdHome, MdInsertChart } from 'react-icons/md'
import {
  FaLifeRing,
  FaDatabase,
  FaRocket,
  FaArchive,
  FaBrain,
  FaVial,
  FaTags,
  FaHdd,
  FaFolder,
  FaUsers,
  FaThumbtack,
  FaEdit,
  FaCog,
  FaBook,
  FaComment
} from 'react-icons/fa'

import { useSet } from 'react-use'
import { IconType } from 'react-icons/lib'
import { isDev } from '@/libs/utils/environment'
import { useProjectRoute } from '../useProjectRoute'
import { useScrollBarTheme } from '@/libs/hooks/useScrollbarTheme'

const projectPages: Record<
  string,
  { icon: IconType; to: string; beta?: boolean; exact?: boolean }
> = {
  Home: { icon: MdHome, to: '', exact: true },
  Dashboards: { icon: MdInsertChart, to: '/dashboards' },
  Members: { icon: FaUsers, to: '/members' },
  Discussion: { icon: FaComment, to: '/discussion' },
  Datasets: { icon: FaDatabase, to: '/datasets' },
  Jobs: { icon: MdGroupWork, to: '/jobs', beta: true },
  Issues: { icon: MdFeedback, to: '/issues' },
  'File Queries': { icon: FaFolder, to: '/file-queries' },
  Storage: { icon: FaHdd, to: '/storage' },
  Ontologies: { icon: FaTags, to: '/ontologies' },
  Articles: { icon: FaEdit, to: '/articles', beta: true },
  Pipelines: { icon: FaRocket, to: '/pipelines' },
  Artifacts: { icon: FaArchive, to: '/artifacts', beta: true },
  Models: { icon: FaBrain, to: '/models', beta: true },
  Experiments: { icon: FaVial, to: '/experiments', beta: true },
  Notebooks: { icon: FaBook, to: '/notebooks', beta: true },
  Settings: { icon: FaCog, to: '/settings' }
}
type ProjectPage = keyof typeof projectPages

const SidebarTitle: React.FC = () => {
  const { login, projectSlug } = useProjectRoute()
  return (
    <Box
      bgColor={mode('gray.200', 'gray.800')}
      rounded="md"
      paddingY="2"
      paddingX="3"
      marginBottom="2"
    >
      <Text fontSize="sm">{login}</Text>
      <chakra.h1 fontSize="lg" fontWeight="bold" letterSpacing="wide">
        {projectSlug}
      </chakra.h1>
    </Box>
  )
}

const SidebarSection: React.FC<{ title: string } & BoxProps> = ({
  title,
  children,
  ...props
}) => (
  <Box {...props} marginTop="4">
    <chakra.h3
      textTransform="uppercase"
      marginLeft="2"
      marginBottom="2"
      fontSize="xs"
      color="gray.500"
      letterSpacing="widest"
    >
      {title}
    </chakra.h3>
    {children}
  </Box>
)

type SidebarItemProps = {
  icon: JSX.Element
  isActive?: boolean
  pinnable?: boolean
  pinned?: boolean
  setPinned?: (pin: boolean) => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  isActive,
  children,
  pinnable,
  pinned,
  setPinned
}) => {
  const activeColor = useColorModeValue('gray.400', 'gray.700')
  const hoverColor = useColorModeValue('gray.400', 'gray.800')

  const pinnedColor = useColorModeValue('gray.600', 'gray.400')
  const nonPinnedColor = useColorModeValue('gray.300', 'gray.600')

  const [hovering, setHovering] = useState(false)

  return (
    <Flex
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      marginY="1"
      paddingY="1"
      paddingX="2"
      alignItems="center"
      rounded="md"
      cursor="pointer"
      bgColor={isActive && activeColor}
      _hover={{ bgColor: isActive ? activeColor : hoverColor }}
    >
      {icon}

      <Box marginLeft="2" flexGrow={1}>
        {children}
      </Box>

      {pinnable && (hovering || pinned) && (
        <Icon
          as={FaThumbtack}
          w={3}
          h={3}
          color={pinned ? pinnedColor : nonPinnedColor}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            setPinned(!pinned)
          }}
        />
      )}
    </Flex>
  )
}

const BetaTag: React.FC = ({ children }) => {
  return (
    <Tag
      size="sm"
      variant="subtle"
      colorScheme="purple"
      marginLeft="2"
      marginTop="0.5"
    >
      {children}
    </Tag>
  )
}

const ProjectPage: React.FC<
  { name: ProjectPage } & Omit<SidebarItemProps, 'icon'>
> = ({ name, ...props }) => {
  const { projectUrl } = useProjectRoute()
  const { to, icon, beta } = projectPages[name]
  const projectPage = `${projectUrl}${to}`
  return (
    <NextLink href={projectPage}>
      <Link textDecoration="none !important">
        <SidebarItem {...props} icon={<Icon as={icon} />}>
          {name}
          {beta && <BetaTag>Beta</BetaTag>}
        </SidebarItem>
      </Link>
    </NextLink>
  )
}

const SidebarPinnedSection: React.FC = ({ children }) => (
  <SidebarSection title="Pinned" marginBottom="3">
    <Box
      border="1px"
      borderColor={mode('gray.200', 'gray.700')}
      rounded="md"
      paddingX="1"
    >
      {children}
    </Box>
  </SidebarSection>
)

const SidebarPagesContainer: React.FC = ({ children }) => {
  const scrollbarCss = useScrollBarTheme({ scrollbarWidth: 'thin' })
  return (
    <>
      <Divider />
      <Box flexGrow={1} overflow="auto" css={scrollbarCss}>
        {children}
      </Box>
      <Divider />
    </>
  )
}

const ProjectSidebarContainer: React.FC = ({ children }) => (
  <Flex
    backgroundColor={mode('gray.100', 'gray.800')}
    flexDirection="column"
    padding="2"
    width={{ base: null, md: '14em' }}
  >
    {children}
  </Flex>
)

export const ProjectSidebar: React.FC = () => {
  const [pinned, { toggle }] = useSet<string>(new Set([]))
  const { projectSubUrl } = useProjectRoute()
  const pages = Object.entries(projectPages).map(([name, page]) => ({
    name,
    ...page
  }))

  const activePage = pages.find(page =>
    page.exact ? projectSubUrl === page.to : projectSubUrl.startsWith(page.to)
  )

  const ProjectPagePinnable: React.FC<{ name: ProjectPage }> = ({ name }) => (
    <ProjectPage
      isActive={name === activePage?.name}
      name={name}
      pinned={pinned.has(name)}
      setPinned={() => toggle(name)}
      pinnable
    />
  )

  return (
    <ProjectSidebarContainer>
      <Box flexShrink={0}>
        <SidebarTitle />
        {pinned.size !== 0 && (
          <SidebarPinnedSection>
            {Array.from(pinned.keys()).map(s => (
              <ProjectPage key={s} name={s} isActive={s === activePage?.name} />
            ))}
          </SidebarPinnedSection>
        )}
      </Box>
      <SidebarPagesContainer>
        <Box>
          <ProjectPagePinnable name="Home" />
          {isDev() && <ProjectPagePinnable name="Discussion" />}
          {isDev() && <ProjectPagePinnable name="Dashboards" />}
          <ProjectPagePinnable name="Members" />
        </Box>

        <SidebarSection title="Data">
          <ProjectPagePinnable name="Datasets" />
          <ProjectPagePinnable name="Jobs" />
          <ProjectPagePinnable name="Issues" />
          {isDev() && <ProjectPagePinnable name="File Queries" />}
          <ProjectPagePinnable name="Storage" />
          <ProjectPagePinnable name="Ontologies" />
        </SidebarSection>

        <SidebarSection title="Workspace">
          <ProjectPagePinnable name="Pipelines" />
          {isDev() && <ProjectPagePinnable name="Articles" />}
          <ProjectPagePinnable name="Artifacts" />
          {isDev() && <ProjectPagePinnable name="Models" />}
          {isDev() && <ProjectPagePinnable name="Experiments" />}
          {isDev() && <ProjectPagePinnable name="Notebooks" />}
        </SidebarSection>
      </SidebarPagesContainer>
      <Box marginTop="1" flexShrink={0}>
        <ProjectPagePinnable name="Settings" />
        <SidebarItem icon={<Icon as={FaLifeRing} />}>
          Help &amp; Support
        </SidebarItem>
      </Box>
    </ProjectSidebarContainer>
  )
}
