import Card from "../../../components/Card";
import Label from "../../../components/Label";
import PocketBase from "pocketbase";

async function getReport(reportId: string) {
  //   const res = await fetch(
  //     `http://127.0.0.1:8090/api/collections/support/records/${reportId}`,
  //     {
  //       next: { revalidate: 10 }
  //     }
  //   );

  // Fetch data with Pocketbase
  const pb = new PocketBase("http://127.0.0.1:8090");
  const res = await pb
    .collection("support")
    .getOne(`${reportId}`, { next: { revalidate: 60 } });
  return res;
}

export default async function ReportPage({ params }: any) {
  const report = await getReport(params.id);

  return (
    <div className="flex justify-center">
      <Card>
        <div className="mb-4">
          <div className="flex justify-between mb-[-4px]">
            <h3 className="text-lg font-semibold">{report.category}</h3>

            <div className="flex items-center">
              <div
                className={`${
                  report.status === "pending"
                    ? "badge-yellow"
                    : report.status === "solved"
                    ? "badge-green"
                    : report.status === "canceled"
                    ? "badge-red"
                    : report.status === "analyzing"
                    ? "badge-blue"
                    : "badge-gray"
                }`}
              >
                {report.status === "pending"
                  ? "Pendente"
                  : report.status === "solved"
                  ? "Resolvido"
                  : report.status === "canceled"
                  ? "Cancelado"
                  : report.status === "analyzing"
                  ? "Analisando"
                  : "Não identificado"}
              </div>
            </div>
          </div>

          <small className="font-normal text-gray-500">
            Criado em: {report.created}
          </small>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-sm text-gray-500">
            Nome
          </label>
          <p>{report.name}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-sm text-gray-500">
            Email
          </label>
          <p>{report.email}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-sm text-gray-500">
            Arquivo
          </label>
          {report.file ? <p>{report.file}</p> : <p>Sem arquivo</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-sm text-gray-500">
            Descrição
          </label>
          <p>{report.description}</p>
        </div>

        <div>
          <button className="btn btn-danger">Cancelar</button>
        </div>
      </Card>
    </div>
  );
}
