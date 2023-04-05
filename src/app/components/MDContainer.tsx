import {
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { type ReactElement, type ReactNode, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useLocation } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  path: string
}

function MarkdownLink (props: any): ReactElement {
  return (
    <Link href={props.href} target="_blank" underline="hover">
      {props.children}
    </Link>
  )
}

function MarkdownImage (props: any): ReactElement {
  const image: string = props.src
  if (props.node.tagName === 'img') {
    console.log(props)
    return (
      <img src={require(`../../static/${image}`)} alt={props.alt} width="100%" height="100%" />
    )
  }
  return <p>{props.children}</p>
}

function MarkdownTable (props: { children: ReactNode }): ReactElement {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        {props.children}
      </Table>
    </TableContainer>
  )
}

function MarkdownTableCell (props: { children: ReactNode }): ReactElement {
  return (
    <TableCell>
      {props.children}
      {/* <Typography>{props.children}</Typography> */}
    </TableCell>
  )
}

function MarkdownCode (props: any): ReactElement {
  console.log(props)

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!props.className) {
    return <Chip size="small" label={props.children?.toString()} />
  }

  const language = props.className.split('-')[1]
  return <SyntaxHighlighter
    language={language}
    style={oneDark}
    PreTag="div"
    showLineNumbers={true}
    >
    {props.children}
  </SyntaxHighlighter>
}

function MarkdownH1 (props: { children: ReactNode }): ReactElement {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: '2em',
          display: 'block',
          marginBlockStart: '0.67em',
          marginBlockEnd: '0.3em',
          fontWeight: 'bold',
          lineHeight: 1.25
        }}
      >
        {props.children}
      </Typography>
      <Divider />
    </>
  )
}

function MarkdownH2 (props: { children: ReactNode }): ReactElement {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: '1.5em',
          display: 'block',
          marginBlockStart: '0.83em',
          marginBlockEnd: '0.3em',
          fontWeight: 'bold',
          lineHeight: 1.25
        }}
      >
        {props.children}
      </Typography>
      <Divider />
    </>
  )
}

export default function MDContainer ({ path }: Props): ReactElement {
  const [content, setContent] = useState('')
  const { pathname } = useLocation()
  // eslint-disable-next-line
  useEffect(() => {
    fetch(path)
      .then(async (res) => await res.text())
      .then((text) => { setContent(text) })
  }, [path])

  useEffect(() => {
    let title = pathname.substring(1, pathname.length)
    title = title[0].toUpperCase() + title.substring(1)
    // eslint-disable-next-line
    document.title = `${process.env.REACT_APP_NAME!} | ${title}`
  }, [pathname])

  return (
    <Container>
      <ReactMarkdown
        // eslint-disable-next-line
        children={content}
        components={{
          code: MarkdownCode,
          a: MarkdownLink,
          // p: MarkdownParagraph,
          table: MarkdownTable,
          img: MarkdownImage,
          thead: TableHead,
          tbody: TableBody,
          th: MarkdownTableCell,
          tr: TableRow,
          td: MarkdownTableCell,
          tfoot: TableFooter,
          h1: MarkdownH1,
          h2: MarkdownH2
          // br: MarkdownBr,
        }}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
      />
    </Container>
  )
}
