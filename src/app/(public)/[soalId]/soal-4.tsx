
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
// Mengelompokkan data berdasarkan nama_siswa dan nilai_tahun
const groupData = (data) => {
    return data.reduce((acc, { nama_siswa, nilai_siswa, nilai_tahun }) => {
    if (!acc[nama_siswa]) acc[nama_siswa] = {};
    acc[nama_siswa][nilai_tahun] = nilai_siswa;
    return acc;
    }, {});
};

const groupedData = groupData(nilaiSiswa);

// Mendapatkan daftar tahun yang unik
const years = Array.from(
    new Set(nilaiSiswa.map((item) => item.nilai_tahun))
).sort((a, b) => a - b);

return {years, groupedData, };
};

export function Field4(){
    const { years, groupedData } = PivotTable();

    return (
        <div>
        <h1 className="text-xl font-medium mb-4 pb-4 border-b">Pivot Tabel Nilai Siswa</h1>
        <table border={1} cellPadding="10">
            <thead>
            <tr>
                <th>Nama Siswa</th>
                {years.map((year) => (
                <th key={year}>{year}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {Object.entries(groupedData).map(([nama_siswa, tahunData]) => (
                <tr key={nama_siswa}>
                <td>{nama_siswa}</td>
                {years.map((year) => (
                    <td key={year}>{tahunData[year] || '-'}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}



