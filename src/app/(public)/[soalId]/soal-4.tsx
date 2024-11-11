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

// Data nilai siswa yang disediakan
const nilaiSiswa = [
  { nama_siswa: 'Ram', nilai_siswa: 90, nilai_tahun: 2010 },
  { nama_siswa: 'Neena', nilai_siswa: 80, nilai_tahun: 2010 },
  { nama_siswa: 'John', nilai_siswa: 70, nilai_tahun: 2010 },
  { nama_siswa: 'Ram', nilai_siswa: 90, nilai_tahun: 2011 },
  { nama_siswa: 'Neena', nilai_siswa: 85, nilai_tahun: 2011 },
  { nama_siswa: 'John', nilai_siswa: 65, nilai_tahun: 2011 },
  { nama_siswa: 'Ram', nilai_siswa: 80, nilai_tahun: 2012 },
  { nama_siswa: 'Neena', nilai_siswa: 80, nilai_tahun: 2012 },
  { nama_siswa: 'John', nilai_siswa: 90, nilai_tahun: 2012 },
];

function PivotTable() {
  const groupData = (data: typeof nilaiSiswa) => {
    return data.reduce(
      (
        acc: Record<string, Record<number, number>>,
        { nama_siswa, nilai_siswa, nilai_tahun },
      ) => {
        if (!acc[nama_siswa]) acc[nama_siswa] = {};
        acc[nama_siswa][nilai_tahun] = nilai_siswa;
        return acc;
      },
      {},
    );
  };

  const groupedData = groupData(nilaiSiswa);

  const years = Array.from(
    new Set(nilaiSiswa.map((item) => item.nilai_tahun)),
  ).sort((a, b) => a - b);

  return { years, groupedData };
}

function calculateAverage(scores: Record<number, number>): number {
  const values = Object.values(scores);
  const sum = values.reduce((acc, score) => acc + score, 0);
  return values.length > 0 ? sum / values.length : 0;
}

export function Field4() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 pb-4 border-b">
        Pivot Tabel Nilai Siswa
      </h1>

      <Tabs defaultValue="pivot">
        <div className="flex items-center">
          <TabsList className="first:[&_button]:rounded-l-sm first:[&_button]:rounded-r-none [&_button]:rounded-none last:[&_button]:rounded-r-sm [&_button]:border [&_button]:border-r-0 last:[&_button]:border-r">
            <TabsTrigger value="pivot">Pivot</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pivot">
          <PivotTableSection />
        </TabsContent>

        <TabsContent value="all"></TabsContent>
      </Tabs>
    </div>
  );
}

function PivotTableSection() {
  const { years, groupedData } = PivotTable();
  return (
    <Table className="w-full max-w-[500px]">
      <TableCaption>Pivot Tabel Nilai Siswa</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Siswa</TableHead>
          {years.map((year) => (
            <TableHead key={year}>{year}</TableHead>
          ))}
          <TableHead>Rata-Rata</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.entries(groupedData).map(([nama_siswa, tahunData]) => (
          <TableRow key={nama_siswa}>
            <TableCell>{nama_siswa}</TableCell>
            {years.map((year) => (
              <TableCell key={year}>{tahunData[year] || '-'}</TableCell>
            ))}
            <TableCell>{calculateAverage(tahunData).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow className="bg-muted [&_*]:font-semibold">
          <TableCell>Total</TableCell>
          <TableCell colSpan={years.length + 1} className="text-center">
            {Object.keys(groupedData).length} Siswa
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
