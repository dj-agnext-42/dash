"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Truck,
  Shield,
  ClipboardCheck,
  DollarSign,
  Users,
  BarChart3,
  Boxes,
  Building2,
  ChevronRight,
  Menu,
} from 'lucide-react';

const dashboards = [
  {
    name: 'Agency Operations',
    icon: Truck,
    href: '/dashboard/operations',
    description: 'Monitor transportation efficiency',
  },
  {
    name: 'Governance',
    icon: Shield,
    href: '/dashboard/governance',
    description: 'Track regulatory compliance',
  },
  {
    name: 'Compliance',
    icon: ClipboardCheck,
    href: '/dashboard/compliance',
    description: 'Quality and compliance tracking',
  },
  {
    name: 'Payments',
    icon: DollarSign,
    href: '/dashboard/payments',
    description: 'Financial transactions',
  },
  {
    name: 'Samples CRM',
    icon: Users,
    href: '/dashboard/samples-crm',
    description: 'Customer quality tracking',
  },
  {
    name: 'Financing',
    icon: BarChart3,
    href: '/dashboard/financing',
    description: 'Operational efficiency metrics',
  },
  {
    name: 'RM Performance',
    icon: Boxes,
    href: '/dashboard/rm-performance',
    description: 'Raw material performance',
  },
  {
    name: 'Supplier KYC',
    icon: Building2,
    href: '/dashboard/supplier-kyc',
    description: 'Supplier compliance tracking',
  },
];

export default function SideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (pathname === href) return true;
    if (pathname?.startsWith(href + '/')) return true;
    return false;
  };

  return (
    <div
      className={cn(
        'flex flex-col border-r bg-gray-50/40 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center border-b px-3">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Trident Dashboards</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'h-8 w-8 rounded-md hover:bg-gray-100',
            isCollapsed ? 'mx-auto' : 'ml-auto'
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="h-4 w-4 mx-auto" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-3">
        {dashboards.map((dashboard) => {
          const isActive = isActiveRoute(dashboard.href);
          const Icon = dashboard.icon;

          return (
            <Link
              key={dashboard.href}
              href={dashboard.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
              title={isCollapsed ? dashboard.name : undefined}
            >
              <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-blue-600')} />
              {!isCollapsed && (
                <div className="flex-1">
                  <div>{dashboard.name}</div>
                  <div className="text-xs text-gray-500">{dashboard.description}</div>
                </div>
              )}
              {!isCollapsed && isActive && (
                <ChevronRight className="h-4 w-4 text-blue-600" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2">
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-900">Need Help?</div>
              <div className="text-xs text-blue-700">View documentation</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 