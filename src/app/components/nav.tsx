'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { VercelLogo } from '@/client/components/icons';
import { Button } from '@/client/components/ui/button';

import {
  IconHome,
  IconLayoutSidebar,
  IconSettings,
  IconNumber2,
  IconNumber1,
  IconNumber3,
  IconNumber4,
  IconNumber5,
  IconNumber6,
  IconNumber7
} from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/client/components/ui/tooltip';

import type { Session } from 'next-auth';

export function NavItem({
  href,
  label,
  children,
  stretch,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  stretch?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(stretch);

  return (
    <Tooltip
      open={open}
      onOpenChange={() => {
        if (stretch) {
          setOpen(false);
        } else {
          setOpen(!open);
        }
      }}
    >
      <TooltipTrigger asChild>
        <Link
          href={href}
          data-stretch={stretch ? 'active' : ''}
          className={cn(
            'flex items-center gap-4 rounded-lg text-muted-foreground hover:text-foreground min-h-8 size-9 md:size-8 p-1.5 data-[stretch=active]:h-8 data-[stretch=active]:w-full transition-all duration-200',
            {
              'bg-accent text-black [&_*]:text-black': pathname === href,
            },
          )}
        >
          {children}
          <span
            className={cn(
              'font-medium line-clamp-1 [transition:opacity,transform_200ms_ease]',
              stretch
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0',
            )}
          >
            {label}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function DesktopNav({
  session,
  children,
}: {
  session?: Session | null;
  children?: React.ReactNode;
}) {
  const [stretch, setStretch] = React.useState(false);

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-[width] duration-200',
          stretch ? 'w-[200px]' : 'w-14',
        )}
      >
        <nav
          className={cn(
            'grid grid-flow-row pr-3 pl-3 gap-4 sm:py-5 transition-[padding] duration-200',
          )}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setStretch(!stretch)}
            className="mr-auto h-8 w-8"
          >
            <IconLayoutSidebar className="size-5" />
            <span className="sr-only hidden">aside-sizer</span>
          </Button>

          <NavItem href="/" label="Home" stretch={stretch}>
            <IconHome className="size-5 min-h-5 min-w-5" />
          </NavItem>

          {route.map((i, index) => (
            <NavItem key={index} stretch={stretch} href={i.href} label={i.title}>
              <div className='flex flex-row items-start'>
                <i.icon className="size-5 min-h-5 min-w-5" />
                {i.label && <span className='-ml-1 font-bold'>{i.label}</span>}
              </div>
            </NavItem>
          ))}

        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ml-auto mr-0.5"
              >
                <IconSettings className="size-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>

      <main
        className={cn(
          'flex min-h-screen flex-col bg-muted/40 transition-[padding] duration-200 w-full relative max-sm:pl-0',
          stretch ? 'pl-[200px]' : 'sm:pl-14',
        )}
      >
        {children}
      </main>
    </>
  );
}
// 
// 

const route = [
  {
    title: "Soal 1",
    href: '/soalno1',
    icon: IconNumber1,
  },
  {
    label: 'a',
    title: "Soal 2a",
    href: '/soalno2a',
    icon: IconNumber2,
  },
  {
    label: 'b',
    title: "Soal 2b",
    href: '/soalno2b',
    icon: IconNumber2,
  },
  {
    label: 'c',
    title: "Soal 2c",
    href: '/soalno2c',
    icon: IconNumber2,
  },
  {
    title: "Soal 3",
    href: '/soalno3',
    icon: IconNumber3,
  },
  {
    title: "Soal 4",
    href: '/soalno4',
    icon: IconNumber4,
  },
  {
    title: "Soal 5",
    href: '/soalno5',
    icon: IconNumber5,
  },
  {
    title: "Soal 6",
    href: '/soalno6',
    icon: IconNumber6,
  },
  {
    title: "Soal 7",
    href: '/soalno7',
    icon: IconNumber7,
  },
];
