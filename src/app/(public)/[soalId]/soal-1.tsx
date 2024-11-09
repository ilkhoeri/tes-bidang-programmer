


export function Field1(){
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
    
      const angkaList = generateNumbers();

  return (
    <>
      <div className="rounded-lg text-sm font-medium p-4 bg-muted font-mono text-wrap [white-space:pre-line]">
        <h1>Angka Berulang dari 1 - 200</h1>
        <ul>
            {angkaList.map((item, index) => (
            <li key={index}>
                Angka: {item.angka} - {item.teks || 'Tidak ada kondisi'}
            </li>
            ))}
        </ul>
    </div>
    </>
  )
}

