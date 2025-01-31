import {
  Box,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { type ReactElement, useEffect } from 'react'
import logo from '../../static/favicon.jpg'
import { useLocation } from 'react-router-dom'
import { links } from './links'

interface Props {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function Home ({ setSelectedIndex }: Props): ReactElement {
  const { pathname } = useLocation()
  useEffect(() => {
    setSelectedIndex(-1)
  }, [setSelectedIndex])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.title = process.env.REACT_APP_NAME!
  }, [pathname])

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 20px - 33px)' }}
    >
      <Grid item xs={3}>
        <Stack direction={{ xs: 'column', sm: 'row-reverse' }} spacing={2}>
          <Box display="flex" sx={{ justifyContent: 'center' }}>
            <img style={{ borderRadius: '50%' }} src={logo} width="200px" alt="logo" />
          </Box>
          <Box>
            <Grid
              display="flex"
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              <Typography variant="h3">Trygvi Z. Laksafoss</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              <Typography variant="subtitle1" gutterBottom>
                All thing data and cloud
                {/* Better an{' '}
                <Box fontWeight="fontWeightMedium" display="inline">
                  oops
                </Box>{' '}
                than a{' '}
                <Box fontWeight="fontWeightMedium" display="inline">
                  what if
                </Box> */}
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              <Stack direction="row" spacing={0.4}>
                {links.map((link) => (
                  <Tooltip key={link.index} title={link.title} arrow>
                    <Link
                      target="_blank"
                      href={link.href}
                      underline="none"
                      color="inherit"
                    >
                      <IconButton color="inherit">{link.icon}</IconButton>
                    </Link>
                  </Tooltip>
                ))}
              </Stack>
            </Grid>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
