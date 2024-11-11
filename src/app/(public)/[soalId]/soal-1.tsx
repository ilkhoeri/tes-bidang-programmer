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
import { cn } from '@/shared/lib/utils';

export function Field1() {
  type GenerateNumbers = { angka: number; teks: 'true' | 'false' }[];

  const generateNumbers = () => {
    let result = [];
    for (let i = 1; i <= 200; i++) {
      if (i % 8 === 0) {
        result.push({ angka: i, teks: 'true' });
      } else if (i % 4 === 0 && i % 6 === 0) {
        result.push({ angka: i, teks: 'false' });
      } else {
        result.push({ angka: i, teks: '' });
      }
    }
    return result;
  };

  const angkaList: GenerateNumbers = generateNumbers();

  return (
    <>
      <div className="rounded-lg text-sm font-medium p-4 bg-muted font-mono">
        <Table className="w-full max-w-[500px]">
          <TableCaption>Angka Berulang dari 1 - 200.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Numbers</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {angkaList.map((item, index) => (
              <TableRow
                key={index}
                className={cn(
                  item.teks === 'true' && 'bg-sky-200 hover:bg-sky-300/50',
                  item.teks === 'false' && 'bg-red-200 hover:bg-red-300/50',
                  !item.teks && 'opacity-50',
                )}
              >
                <TableCell>{item.angka}</TableCell>
                <TableCell
                  className={cn({
                    italic: item.teks,
                  })}
                >
                  {item.teks || 'Tidak ada kondisi'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                <div className="w-full gap-1 flex flex-col italic">
                  <span className="bg-sky-200 hover:bg-sky-300/50 rounded-sm text-center">
                    true: {angkaList.filter((i) => i.teks === 'true').length}
                  </span>
                  <span className="bg-red-200 hover:bg-red-300/50 rounded-sm text-center">
                    false: {angkaList.filter((i) => i.teks === 'false').length}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
