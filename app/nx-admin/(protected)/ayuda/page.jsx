export default function page() {
  return (
    <div>
      <div class="flex flex-col col-span-2 text-gray-700 gap-2">
        <p class="text-sm font-semibold">Descripción</p>
        <div class="p-2 rounded-md shadow-md ring-1 ring-gray-100 bg-white prose list-disc">
          <h3>
            <strong>ESPECIFICACIONES GENERALES</strong>
          </h3>
          <ul>
            <li>
              <strong>Tecnología </strong>Impeller
            </li>
            <li>
              <strong>Frecuencia </strong>60 Hz
            </li>
            <li>
              <strong>Numero de programas </strong>10
            </li>
            <li>
              <strong>Nombre del fabricante y/o importador </strong>Whirlpool
            </li>
            <li>
              <strong>Voltaje </strong>110 V
            </li>
            <li>
              <strong>Potencia </strong>693 W
            </li>
            <li>
              <strong>Capacidad de agua por ciclo </strong>88 Litros
            </li>
          </ul>
          <table
            border="1"
            // style="border-collapse: collapse; width: 17.2393%; height: 97.969px;"
          >
            <colgroup>
              <col style={{ width: "38.1673%" }} />
              <col style={{ width: "61.8327%" }} />
            </colgroup>
            <tbody>
              <tr style={{ height: "19.5938px" }}>
                <td colspan="2" style={{ height: "19.5938px" }}>
                  <strong>Dimensiones Métricas</strong>
                </td>
              </tr>
              <tr style={{ height: "19.5938px" }}>
                <td tyle={{ height: "19.5938px" }}>Alto</td>
                <td style={{ height: "19.5938px" }}>114cm</td>
              </tr>
              {/* <tr style="height: 19.5938px;">
                <td style="height: 19.5938px;">Ancho</td>
                <td style="height: 19.5938px;">64cm</td>
              </tr> */}
              {/* <tr style="height: 19.5938px;">
                <td style="height: 19.5938px;">Profundidad</td>
                <td style="height: 19.5938px;">67cm</td>
              </tr>
              <tr style="height: 19.5938px;">
                <td style="height: 19.5938px;">Peso</td>
                <td style="height: 19.5938px;">41.2 Kg</td>
              </tr> */}
            </tbody>
          </table>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}
