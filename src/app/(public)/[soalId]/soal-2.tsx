

export async function Field2({ field }: { field: "a" | "b" | "c"}){
    const data = await (await fetch('https://pastebin.com/raw/0zG5AQzL'))
    return (
        <div className="rounded-lg p-4 bg-muted font-mono text-wrap [white-space:pre-line]">
            {String(data)}
        </div>
    )
}

// 2a
import { Injectable } from '@nestjs/common';

interface Item {
  id: number;
  name: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [
    { id: 1, name: 'Meja' },
    { id: 2, name: 'Kursi' },
    { id: 3, name: 'Pintu' },
    { id: 4, name: 'Lemari' },
    { id: 5, name: 'Dipan' },
    { id: 6, name: 'Bed' },
    { id: 7, name: 'Jendela' },
    { id: 8, name: 'Televisi' }
  ];

  // Fungsi untuk menangani parameter array
  processItems(paramArray: string[]): any {
    const result: any[] = [];

    paramArray.forEach((param) => {
      const item = this.items.find((i) => i.name === param);

      if (item) {
        // (2) Kembalikan boolean jika ditemukan
        result.push({ [param]: true });
      } else {
        // (1) Jika tidak ditemukan, tambah item baru dan kembalikan data
        const newItem = { id: this.items.length + 1, name: param };
        this.items.push(newItem);
        result.push({ [param]: newItem });
      }
    });

    // (3) Menampilkan key (id) dari data array jika ditemukan
    const keys = this.items
      .filter((i) => paramArray.includes(i.name))
      .map((i) => i.id);

    if (keys.length > 0) {
      result.push({ keys });
    }

    return result;
  }
}

// soal 2b
import { Controller, Get, Query } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('process')
  processItems(@Query('names') names: string[]): any {
    // Memanggil method untuk memproses parameter array
    return this.itemsService.processItems(names);
  }
}

// soal 2c
import { Module } from '@nestjs/common';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
