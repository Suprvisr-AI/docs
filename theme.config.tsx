import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { AuthWidget } from '@/components/AuthWidget'

const config: DocsThemeConfig = {
  logo: React.createElement('img', {
    src: '/logo.png',
    alt: 'Suprvisr AI',
    style: { height: '28px', width: 'auto' }
  }),
  project: {
    link: 'https://cumulus.suprvisr.ai',
    icon: React.createElement('span', {
      style: {
        fontSize: '0.8rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        color: '#FF6B4A',
        border: '1.5px solid #FF6B4A',
        borderRadius: '6px',
        padding: '3px 8px',
        display: 'inline-block'
      }
    }, 'Launch Cumulus \u2197')
  },
  docsRepositoryBase: 'https://github.com/Suprvisr-AI/docs',
  editLink: { content: null },
  feedback: {
    content: null,
    labels: 'feedback',
    useLink: () => 'https://cumulus.suprvisr.ai/feature-board'
  },
  head: React.createElement(React.Fragment, null,
    React.createElement('link', { rel: 'icon', href: '/favicon_io/favicon.ico' }),
    React.createElement('link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon_io/favicon-32x32.png' }),
    React.createElement('link', { rel: 'apple-touch-icon', href: '/favicon_io/apple-touch-icon.png' }),
    React.createElement('meta', { name: 'description', content: 'Documentation, guides, and support for Suprvisr AI.' })
  ),
  navbar: {
    extraContent: React.createElement(AuthWidget)
  },
  footer: { component: null },
  sidebar: { defaultMenuCollapseLevel: 1 }
}

export default config
