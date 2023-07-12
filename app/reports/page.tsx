async function getReports() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/support/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
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
  const { id, name, email, category, description, created } = report || {};

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
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>{" "}
          Pendente
        </div>
      </td>
      <td className="px-6 py-4">
        {/* Modal toggle */}
        <a
          href="#"
          type="button"
          data-modal-target="editUserModal"
          data-modal-show="editUserModal"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Editar
        </a>
      </td>
    </tr>
  );
}
