import Link from "next/link";
import PocketBase from "pocketbase";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getReports() {
  // const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', { cache: 'no-store' });
  // const data = await res.json();
  // return data?.items as any[];

  // Fetch data with Pocketbase
  const pb = new PocketBase("http://127.0.0.1:8090");

  const result = await pb
    .collection("support")
    .getList(1, 30, { cache: "no-store" });
  const data = result.items;
  return data as any[];
}

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <table className="w-full text-sm text-left text-gray-400 dark:text-gray-200">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nome
          </th>
          <th scope="col" className="px-6 py-3">
            Categoria
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Ação
          </th>
        </tr>
      </thead>
      <tbody>
        {reports?.map((report) => {
          return <Report key={report.id} report={report} />;
        })}
      </tbody>
    </table>
  );
}

function Report({ report }: any) {
  const { id, name, email, category, status, description, created } =
    report || {};

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="pl-3">
          <div className="text-base font-semibold">{name}</div>
          <div className="font-normal text-gray-500">{email}</div>
        </div>
      </th>
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            className={`${
              status === "pending"
                ? "badge-yellow"
                : status === "solved"
                ? "badge-green"
                : status === "canceled"
                ? "badge-red"
                : status === "analyzing"
                ? "badge-blue"
                : "badge-gray"
            }`}
          >
            {status === "pending"
              ? "Pendente"
              : status === "solved"
              ? "Resolvido"
              : status === "canceled"
              ? "Cancelado"
              : status === "analyzing"
              ? "Analisando"
              : "Não identificado"}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {/* Modal toggle */}
        <Link href={`/reports/${id}`} className="btn-icon btn-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </Link>
      </td>
    </tr>
  );
}
