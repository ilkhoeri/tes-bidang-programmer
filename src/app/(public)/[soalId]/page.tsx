import { Field1 } from './soal-1';
import { Field2 } from './soal-2';
import { Field3 } from './soal-3';
import { Field4 } from './soal-4';
import { Field5 } from './soal-5';
import { Field6 } from './soal-6';
import { Field7 } from './soal-7';

const fieldMapping: Record<string, JSX.Element> = {
  soalno1: <Field1 />,
  soalno2a: <Field2 field="a" />,
  soalno2b: <Field2 field="b" />,
  soalno2c: <Field2 field="c" />,
  soalno3: <Field3 />,
  soalno4: <Field4 />,
  soalno5: <Field5 />,
  soalno6: <Field6 />,
  soalno7: <Field7 />,
};

export default async function soalIdPage({
  params,
}: {
  params: Promise<{ soalId: string }>;
}) {
  const soalId = (await params).soalId;
  return fieldMapping[soalId] || <p>Soal tidak ditemukan</p>;
}
