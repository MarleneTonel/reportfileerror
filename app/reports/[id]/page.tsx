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
    .getOne(`${reportId}`, { next: { revalidate: 10 } });
  return res;
}

export default async function ReportPage({ params }: any) {
  const report = await getReport(params.id);

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-[-4px]">{report.category}</h3>
        <small className="font-normal text-gray-500">
          Criado em: {report.created}
        </small>
      </div>

      <div className="mb-4">
        <Label>Nome</Label>
        <p>{report.name}</p>
      </div>

      <div className="mb-4">
        <Label>Email</Label>
        <p>{report.email}</p>
      </div>

      <div className="mb-4">
        <Label>Descrição</Label>
        <p>{report.description}</p>
      </div>
    </Card>
  );
}
