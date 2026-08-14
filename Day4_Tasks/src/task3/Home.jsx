export default function Home() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-sm">
      <h1 className="text-3xl font-bold mb-3 text-slate-900">
        Welcome to Home
      </h1>
      <p className="text-slate-600">
        This page is rendered dynamically inside the MainLayout component.
      </p>
    </div>
  );
}
