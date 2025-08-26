'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useAuth } from '../../Context/AuthContext';
import { useContext } from 'react';
import { Icons } from '../../components/icons';
import { LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useSidebar } from '../../hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';

// 070389494 60
// Removing DashboardNavProps interface

export function DashboardNav({ items, setOpen, isMobileNav = false }) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
//   const {Logout} = useAuth();

  if (!items?.length) {
    return null;
  }


  return (
    <nav className="grid items-start gap-2">
    <TooltipProvider>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={item.disabled ? '/' : item.href}
                  className={cn(
                    'flex items-center gap-2 overflow-hidden rounded-full p-2 text-sm text-gray-500 font-medium hover:bg-green/30 hover:text-accent-foreground',
                    path === item.href ? 'bg-green text-white' : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {isMobileNav || (!isMinimized && !isMobileNav) ? (
                    <span className="mr-2 truncate">{item.title}</span>
                  ) : (
                    ''
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                align="center"
                side="right"
                sideOffset={8}
                className={!isMinimized ? 'hidden' : 'inline-block'}
              >
                {item.title}
              </TooltipContent>
            </Tooltip>
          )
        );
      })}
      {/* Add Logout Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex items-center gap-2 overflow-hidden rounded-full p-2 text-sm font-medium text-red hover:bg-red/30 hover:text-red/40"
            // onClick={Logout} 
          >
            <LogOut className="h-5 w-5" />
            {isMobileNav || (!isMinimized && !isMobileNav) ? (
              <span className="mr-2 truncate">Logout</span>
            ) : (
              ''
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent align="center" side="right" sideOffset={8} className={!isMinimized ? 'hidden' : 'inline-block'} >
          Logout
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </nav>
  );
}
