import { currentUser } from '@/shared/lib/account';
import { Tabs, TabsContent } from '@/client/components/ui/tabs';

export default async function Page(props: {
  searchParams: Promise<{ q: string; tab: string }>;
}) {
  const session = await currentUser();
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const tab = searchParams.tab ?? 0;

  return (
    <Tabs defaultValue="all">
      <TabsContent value="all">
        
      </TabsContent>
    </Tabs>
  );
}
