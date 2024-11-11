import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/client/components/ui/tabs';
import { cn } from '@/shared/lib/utils';

type GenerateNumbers = {
  angka: number;
  teks: 'true' | 'false' | undefined;
}[];

const generateNumbers = (): GenerateNumbers => {
  let result: GenerateNumbers = [];
  for (let i = 1; i <= 200; i++) {
    if (i % 8 === 0) {
      result.push({ angka: i, teks: 'true' });
    } else if (i % 4 === 0 && i % 6 === 0) {
      result.push({ angka: i, teks: 'false' });
    } else {
      result.push({ angka: i, teks: undefined });
    }
  }
  return result;
};

const angkaList: GenerateNumbers = generateNumbers();

export function Field1() {
  return (
    <div className="rounded-lg text-sm font-medium p-4 bg-muted font-mono">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList className="first:[&_button]:rounded-l-sm first:[&_button]:rounded-r-none [&_button]:rounded-none last:[&_button]:rounded-r-sm [&_button]:border [&_button]:border-r-0 last:[&_button]:border-r">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="true">Habis dibagi 8</TabsTrigger>
            <TabsTrigger value="false">Habis dibagi 4 & 6</TabsTrigger>
            <TabsTrigger value="noconditions">Tidak ada kondisi</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <TableSection
            data={angkaList}
            caption="Angka Berulang dari 1 - 200."
          />
        </TabsContent>

        <TabsContent value="true">
          <TableSection
            data={angkaList}
            caption="Angka Berulang dari 1 - 200 yang habis dibagi 8."
            filterType="true"
          />
        </TabsContent>

        <TabsContent value="false">
          <TableSection
            data={angkaList}
            caption="Angka Berulang dari 1 - 200 yang habis dibagi 4 dan 6."
            filterType="false"
          />
        </TabsContent>

        <TabsContent value="noconditions">
          <TableSection
            data={angkaList.filter((i) => !i.teks)}
            caption="Angka Berulang 1 - 200 yang tidak habis dibagi (4 dan 6), dan 8."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TableSectionProps {
  data: GenerateNumbers;
  caption: string;
  filterType?: 'true' | 'false';
}

function TableSection({ data, caption, filterType }: TableSectionProps) {
  const filteredData = filterType
    ? data.filter((item) => item.teks === filterType)
    : data;

  return (
    <Table className="w-full max-w-[500px]">
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Numbers</TableHead>
          <TableHead>Result</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredData.map((item, index) => (
          <TableRow
            key={index}
            className={cn(
              item.teks === 'true' && 'bg-sky-200 hover:bg-sky-300/50',
              item.teks === 'false' && 'bg-red-200 hover:bg-red-300/50',
              !item.teks && 'opacity-50',
            )}
          >
            <TableCell>{item.angka}</TableCell>
            <TableCell className={cn({ italic: item.teks })}>
              {item.teks || 'undefined'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-center italic">
            {filteredData.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
