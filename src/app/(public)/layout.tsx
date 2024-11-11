import Providers from '../components/providers';
import { auth } from '@/shared/lib/auth';
import { User } from '../components/user';
import { SearchInput } from '../components/search';
import { Analytics } from '@vercel/analytics/react';
import { DesktopNav } from '../components/nav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <Providers>
      <DesktopNav session={session}>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:[&_form]:ml-auto">
            <SearchInput className="pl-8 md:w-[200px] lg:w-[336px]" />
            <User />
          </header>

          <div className="grid flex-1 items-start gap-2 pl-14 pr-4 sm:pr-8 md:pr-10 lg:pr-14 py-4 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </div>
        </div>
        <Analytics />
      </DesktopNav>
    </Providers>
  );
}
