import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './sidebar'
import { TourProvider } from '@/components/tour/tour-provider'
import { ThemeProvider } from '@/components/theme/theme-provider'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock window.matchMedia for theme provider
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Subframe components
vi.mock('@/subframe/components/SidebarWithSections', () => ({
  SidebarWithSections: ({ children, header, footer }: { children: React.ReactNode; header: React.ReactNode; footer: React.ReactNode }) => (
    <div data-testid="sidebar">
      <div data-testid="sidebar-header">{header}</div>
      <div data-testid="sidebar-content">{children}</div>
      <div data-testid="sidebar-footer">{footer}</div>
    </div>
  ),
}))

// Add NavItem to the mock
vi.mock('@/subframe/components/SidebarWithSections', () => {
  const SidebarWithSections = ({ children, header, footer }: { children: React.ReactNode; header: React.ReactNode; footer: React.ReactNode }) => (
    <div data-testid="sidebar">
      <div data-testid="sidebar-header">{header}</div>
      <div data-testid="sidebar-content">{children}</div>
      <div data-testid="sidebar-footer">{footer}</div>
    </div>
  )
  const NavItem = ({ children, selected }: { children: React.ReactNode; icon?: React.ReactNode; selected?: boolean }) => (
    <div data-testid="nav-item" data-selected={selected}>{children}</div>
  )
  NavItem.displayName = 'SidebarWithSections.NavItem'
  SidebarWithSections.NavItem = NavItem
  return { SidebarWithSections }
})

vi.mock('@/subframe/components/Avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => <div data-testid="avatar">{children}</div>,
}))

vi.mock('@/subframe/components/IconButton', () => ({
  IconButton: ({ icon }: { icon: React.ReactNode }) => <button data-testid="icon-button">{icon}</button>,
}))

vi.mock('@subframe/core', () => ({
  FeatherLayoutDashboard: () => <span>DashboardIcon</span>,
  FeatherLayers: () => <span>LayersIcon</span>,
  FeatherTag: () => <span>TagIcon</span>,
  FeatherMegaphone: () => <span>MegaphoneIcon</span>,
  FeatherFlaskConical: () => <span>FlaskIcon</span>,
  FeatherRepeat: () => <span>RepeatIcon</span>,
  FeatherStore: () => <span>StoreIcon</span>,
  FeatherSettings: () => <span>SettingsIcon</span>,
  FeatherMoreVertical: () => <span>MoreIcon</span>,
  FeatherGlobe: () => <span>GlobeIcon</span>,
  FeatherChevronDown: () => <span>ChevronIcon</span>,
}))

const renderSidebar = () =>
  render(
    <ThemeProvider>
      <TourProvider>
        <Sidebar />
      </TourProvider>
    </ThemeProvider>
  )

describe('Sidebar', () => {
  it('renders the sidebar with logo', () => {
    renderSidebar()
    expect(screen.getByText('Dynamic Pricing')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    renderSidebar()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Experiments')).toBeInTheDocument()
  })

  it('renders user name in footer', () => {
    renderSidebar()
    expect(screen.getByText('Saurabh Singh')).toBeInTheDocument()
  })

  it('renders region selector', () => {
    renderSidebar()
    expect(screen.getByText('Germany')).toBeInTheDocument()
  })
})
