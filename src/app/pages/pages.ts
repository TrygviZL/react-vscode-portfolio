export interface Page {
  index: number
  name: string
  route: string
}

export type PageFolders = Record<string, Page[]>

export const pages: PageFolders = {
  about: [
    { index: 0, name: 'overview.md', route: '/overview' },
    { index: 1, name: 'skills.md', route: '/skills' },
    { index: 2, name: 'experience.md', route: '/experience' },
    { index: 3, name: 'education.md', route: '/education' },
    { index: 4, name: 'projects.md', route: '/projects' }
  ],
  blog: [
    { index: 6, name: 'my-vim-setup.md', route: '/my-vim-setup' }
  ]
}
