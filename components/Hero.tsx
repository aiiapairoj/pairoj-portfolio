import Link from "next/link";

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-12 sm:py-16 border-b border-neutral-200 dark:border-neutral-800">
      <p className="text-sm font-medium text-blue-600 mb-3">นักพัฒนา · นักวิจัยความปลอดภัย · AI Automation</p>
      <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
        สวัสดีครับ ผมไพโรจน์
      </h1>
      <p className="mt-5 text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
        ผมสร้างเว็บแอปด้วย <strong>PHP/MySQL</strong> และ <strong>Next.js</strong> ออกแบบระบบให้ปลอดภัยตามแนวทาง <strong>OWASP</strong>
        และเชื่อมต่อกับ <strong>AI Automation</strong> เพื่อให้ทำงานซ้ำ ๆ ได้น้อยลง — มีผลงานโอเพนซอร์ส 29 โปรเจกต์บน GitHub
        เปิดให้ AI agents และมนุษย์ทุกคนนำไปใช้งานได้.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          ดูโปรเจกต์ทั้งหมด
        </Link>
        <Link
          href="/about/"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-5 py-2.5 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        >
          เกี่ยวกับผม
        </Link>
      </div>
    </section>
  );
}
