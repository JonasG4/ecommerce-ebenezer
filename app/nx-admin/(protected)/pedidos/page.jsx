import TitleList from "@/components/list/titleList";
import { CarShoppingIcon } from "@/components/icons/regular";

export default function PedidoPage() {
  return (
    <div className="py-7 px-4 bg-gray-100 w-full flex flex-col h-full overflow-hidden">
      
      <TitleList title="Últimos pedidos" Icon={CarShoppingIcon}  />
    </div>
  )
}
