import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <img
      src="/logo.png"
      alt="Suprvisr AI"
      style={{ height: '28px', width: 'auto' }}
    />
  ),
  project: {
    link: 'https://cumulus.suprvisr.ai',
    icon: (
      <span style={{
        fontSize: '0.8rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        color: '#FF6B4A',
        border: '1.5px solid #FF6B4A',
        borderRadius: '6px',
        padding: '3px 8px',
        display: 'inline-block'
      }}>
        Launch Cumulus ↗
      </span>
    )
  },
  docsRepositoryBase: 'https://github.com/suprvisr/docs',
  editLink: {
    content: null
  },
  feedback: {
    content: null,
    labels: 'feedback',
    useLink: () => 'https://cumulus.suprvisr.ai/feature-board'
  },
  head: (
    <>
      <link rel="icon" href="/favicon_io/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/favicon_io/apple-touch-icon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Documentation, guides, and support for Suprvisr AI." />
    </>
  ),
  footer: {
    component: null
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  }
}

export default config
