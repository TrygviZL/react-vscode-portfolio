import * as React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { VscMarkdown } from 'react-icons/vsc'
import { type Page } from '../pages/pages'

interface Props {
  pages: Page[]
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  currentComponent: string
  setCurrentComponent: React.Dispatch<React.SetStateAction<string>>
  visiblePageIndexs: number[]
  setVisiblePageIndexs: React.Dispatch<React.SetStateAction<number[]>>
}

export default function AppTree ({
  pages,
  selectedIndex,
  setSelectedIndex,
  currentComponent,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs
}: Props): React.ReactElement {
  const navigate = useNavigate()
  const theme = useTheme()
  // const [selectedIndex, setSelectedIndex] = useState(-1);
  const { pathname } = useLocation()

  // eslint-disable-next-line
  const page: Page = pages.find((x) => x.route === pathname)!

  useEffect(() => {
    // eslint-disable-next-line
    if (page) {
      setSelectedIndex(page.index)
    }
  }, [page, setSelectedIndex])

  function renderTreeItemBgColor (index: number): string {
    if (theme.palette.mode === 'dark') {
      return selectedIndex === index ? 'rgba(144,202,249,0.16)' : '#252527'
    } else {
      return selectedIndex === index ? '#295fbf' : '#f3f3f3'
    }
  }

  function renderTreeItemColor (index: number): string {
    if (theme.palette.mode === 'dark') {
      return selectedIndex === index && currentComponent === 'tree'
        ? 'white'
        : '#bdc3cf'
    } else {
      return selectedIndex === index ? '#e2ffff' : '#69665f'
    }
  }

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ minWidth: 220 }}
      defaultExpanded={['-1', '-2']}
      // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem
        nodeId="-1"
        label="About"
        color="#bdc3cf"
        onClick={() => {
          navigate('/')
          setSelectedIndex(-1)
        }}
      >
        {pages.map(({ index, name, route }) => (
          <TreeItem
            key={index}
            nodeId={index.toString()}
            label={name}
            sx={{
              color: renderTreeItemColor(index),
              backgroundColor: renderTreeItemBgColor(index),
              '&& .Mui-selected': {
                backgroundColor: renderTreeItemBgColor(index)
              }
            }}
            icon={<VscMarkdown color="#6997d5" />}
            onClick={() => {
              if (!visiblePageIndexs.includes(index)) {
                const newIndexs = [...visiblePageIndexs, index]
                setVisiblePageIndexs(newIndexs)
              }
              navigate(route)
              setSelectedIndex(index)
              setCurrentComponent('tree')
            }}
          />
        ))}
      </TreeItem>
      <TreeItem
        nodeId="-2"
        label="Blog Posts"
        color="#bdc3cf"
        onClick={() => {
          navigate('/')
          setSelectedIndex(-2)
        }}
      >
        {pages.map(({ index, name, route }) => (
          <TreeItem
            key={index}
            nodeId={index.toString()}
            label={name}
            sx={{
              color: renderTreeItemColor(index),
              backgroundColor: renderTreeItemBgColor(index),
              '&& .Mui-selected': {
                backgroundColor: renderTreeItemBgColor(index)
              }
            }}
            icon={<VscMarkdown color="#6997d5" />}
            onClick={() => {
              if (!visiblePageIndexs.includes(index)) {
                const newIndexs = [...visiblePageIndexs, index]
                setVisiblePageIndexs(newIndexs)
              }
              navigate(route)
              setSelectedIndex(index)
              setCurrentComponent('tree')
            }}
          />
        ))}
      </TreeItem>
    </TreeView>
  )
}
