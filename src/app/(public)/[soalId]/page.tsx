import { Field1 } from './soal-1';
import { Field2 } from './soal-2';
import { Field3 } from './soal-3';
import { Field4 } from './soal-4';
import { Field5 } from './soal-5';
import { Field6 } from './soal-6';
import { Field7 } from './soal-7';

export default async function soalIdPage({
  params,
}: {
  params: Promise<{ soalId: string }>;
}) {
  const soalId = (await params).soalId;

  // page soal no 1
  if (soalId === "soalno1") {
    return <Field1 />
  }
  // page soal no 2a
  if (soalId === "soalno2a") {
    return <Field2 field="a" />
  }
  // page soal no 2b
  if (soalId === "soalno2b") {
    return <Field2 field="b" />
  }
  // page soal no 2c
  if (soalId === "soalno2c") {
    return <Field2 field="c" />
  }
  // page soal no 3
  if (soalId === "soalno3") {
    return <Field3 />
  }
  // page soal no 4
  if (soalId === "soalno4") {
    return <Field4 />
  }
  // page soal no 5
  if (soalId === "soalno5") {
    return <Field5 />
  }
  // page soal no 6
  if (soalId === "soalno6a") {
    return <Field6 field="a" />
  }
  // page soal no 6
  if (soalId === "soalno6b") {
    return <Field6 field="b" />
  }
  // page soal no 7
  if (soalId === "soalno7") {
    return <Field7 />
  }

}
