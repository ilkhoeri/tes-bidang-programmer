export function Field3() {
  // Mengonversi ke format JSON
  const jsonData = JSON.stringify(menuData, null, 2);

  return (
    <>
      <TableMenuOrder />

      <pre className="mt-8">data type</pre>
      <code className="rounded-lg p-4 bg-muted-foreground/50 font-mono text-wrap [white-space:break-spaces]">
        {String(dataType)}
      </code>

      <pre className="mt-8">data JSON</pre>
      <code className="rounded-lg p-4 bg-muted-foreground/50 font-mono text-wrap [white-space:break-spaces]">
        {String(jsonData)}
      </code>
    </>
  );
}

const dataType = `type MenuItem = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    service: {
      id: string;
      name: string;
      flavor: { id: string; name: string }[];
    }[];
  }[];
};
`;

type MenuItem = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    service: {
      id: string;
      name: string;
      flavor: { id: string; name: string }[];
    }[];
  }[];
};

const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'cake',
    category: [
      {
        id: '1-1',
        name: 'Donnut',
        service: [
          {
            id: '1-1-1',
            name: 'DineIn',
            flavor: [{ id: '1-1-1-1', name: 'Original' }],
          },
          {
            id: '1-1-2',
            name: 'Takeaway',
            flavor: [{ id: '1-1-2-1', name: 'Chocolate' }],
          },
          {
            id: '1-1-3',
            name: 'Basic',
            flavor: [
              { id: '1-1-3-1', name: 'Original' },
              { id: '1-1-3-2', name: 'Strowberry' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'bar',
    category: [
      {
        id: '2-1',
        name: 'Bar',
        service: [
          {
            id: '2-1-1',
            name: 'DineIn',
            flavor: [{ id: '2-1-1-1', name: 'Original' }],
          },
          {
            id: '2-1-2',
            name: 'Basic',
            flavor: [
              { id: '2-1-2-1', name: 'Chocolate' },
              { id: '2-1-2-2', name: 'Strowberry' },
            ],
          },
        ],
      },
    ],
  },
];

function TableMenuOrder() {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Order</th>
          <th className="border border-gray-300 px-4 py-2">Category</th>
          <th className="border border-gray-300 px-4 py-2">Service</th>
          <th className="border border-gray-300 px-4 py-2">Flavor</th>
        </tr>
      </thead>
      <tbody>
        {menuData.map((order) => {
          // Mengurutkan `type` berdasarkan nama
          const sortedTypes = order.category.sort((a, b) =>
            a.name.localeCompare(b.name),
          );

          return sortedTypes.map((type, typeIndex) =>
            type.service.map((service, serviceIndex) =>
              service.flavor.map((flavor, flavorIndex) => (
                <tr key={`${order.id}-${type.id}-${service.id}-${flavor.id}`}>
                  {/* Menampilkan kolom kategori hanya pada baris pertama dari setiap kategori */}
                  {typeIndex === 0 &&
                    serviceIndex === 0 &&
                    flavorIndex === 0 && (
                      <td
                        className="border border-gray-300 px-4 py-2"
                        rowSpan={order.category.reduce(
                          (count, t) =>
                            count +
                            t.service.reduce(
                              (svcCount, svc) => svcCount + svc.flavor.length,
                              0,
                            ),
                          0,
                        )}
                      >
                        {order.name}
                      </td>
                    )}

                  {/* Menampilkan kolom type hanya pada baris pertama dari setiap kelompok tipe yang sama */}
                  {serviceIndex === 0 && flavorIndex === 0 && (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={type.service.reduce(
                        (count, svc) => count + svc.flavor.length,
                        0,
                      )}
                    >
                      {type.name}
                    </td>
                  )}

                  {/* Kolom untuk service, hanya ditampilkan pada baris pertama dari setiap service */}
                  {flavorIndex === 0 && (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={service.flavor.length}
                    >
                      {service.name}
                    </td>
                  )}

                  {/* Kolom untuk flavor */}
                  <td className="border border-gray-300 px-4 py-2">
                    {flavor.name}
                  </td>
                </tr>
              )),
            ),
          );
        })}
      </tbody>
    </table>
  );
}
