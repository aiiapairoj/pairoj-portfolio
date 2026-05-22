import Link from "next/link";

export const metadata = { title: "ไม่พบหน้าที่ค้นหา" };

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <p className="text-sm text-blue-600 font-medium">404</p>
      <h1 className="mt-2 text-4xl font-bold">ไม่พบหน้าที่คุณค้นหา</h1>
      <p className="mt-3 text-neutral-600">หน้านี้อาจถูกย้าย หรือยังไม่เคยมีอยู่</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-blue-600 text-white px-5 py-2.5">
        กลับหน้าแรก
      </Link>
    </section>
  );
}
