export default function OfficeInfoComponent() {
  return (
    <div className="flex flex-col justify-evenly">
      <div className="font-light text-2xl tracking-wider">
        <h1>Офісна інформація</h1>
      </div>
      <div className="flex flex-col justify-between">
        <p>
          <span className="text-gray-800 font-bold">Office Hours:</span> Mon-Friday 8am - 10pm
        </p>
        <p>
          <span className="text-gray-800 font-bold">Address:</span> Igbalangao, Bugasong, Antique
        </p>
        <div>
          <p>
            <span className="text-gray-800 font-bold">Tell:</span> 123-456-7890
          </p>
          <p>
            <span className="text-gray-800 font-bold">Fax:</span> 123-456-7890
          </p>
        </div>
      </div>
    </div>
  );
}
