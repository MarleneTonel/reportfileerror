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
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
        <Link href={`/reports/${id}`} className="btn btn-primary">
          Editar
        </Link>
      </td>
    </tr>
  );
}
