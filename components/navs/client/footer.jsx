import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/icons/regular";
import { MasterCardIcon, SSLIcon, TiktokIcon, VisaCardIcon } from "@/components/icons/solid";
export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center bg-red-900 py-5">
      <div className="grid laptop:grid-cols-[40%_60%] gap-5 w-[90%] pb-3">
        <section className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2 items-center">
            <h5 className="text-white font-semibold uppercase">Pagos seguros</h5>
            <div className="flex gap-3 justify-center">
              <VisaCardIcon className="w-10 h-10 fill-white" />
              <MasterCardIcon className="w-10 h-10 fill-white" />
              <SSLIcon className="w-10 h-10 fill-white" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white text-xs">NIT: 1217-030321-101-0 <span className="mx-1"> | </span> Tel: 7308-3972</p>
            <p className="text-white text-xs">4ta calle oriente, #408, Barrio el centro, San Miguel</p>
            <p className="text-white text-xs">Copyright © 2023 Todos los derechos están reservados</p>
          </div>
          <div className="flex flex-col items-center gap-2 laptop:row-start-2 desktop:row-auto">
            <p className="text-white text-xs">Sigue en contacto con nosotros</p>
            <div className="flex items-center gap-8">
              <Link href="https://www.facebook.com/ComercialEbenEzerCM">
                <FacebookIcon width={15} className="fill-white" />
              </Link>
              <Link href="https://www.instagram.com/comercialebenezer_casamatriz/">
                <InstagramIcon width={25} className="fill-white" />
              </Link>
              <Link href="https://wa.me/+50377304543">
                <WhatsappIcon width={25} className="fill-white" />
              </Link>
              <Link href="https://www.tiktok.com/@comercialeben_ezer">
                <TiktokIcon width={25} className="fill-white" />
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-y-5 tablet:grid-cols-3 row-start-1 laptop:row-auto mb-4 laptop:mb-0">
          <div className="flex flex-col">
            <h1 className="uppercase text-red-100 font-bold text-sm mb-3">
              Accesos Directos
            </h1>
            <div className="flex flex-col gap-3 text-white">
              <Link href="/preguntas-frecuentes" className="hover:underline text-sm">
                Inicio
              </Link>
              <Link href="/marcas" className="hover:underline text-sm">
                Marcas
              </Link>
              <Link href="/categorias" className="hover:underline text-sm">
                Categorías
              </Link>
              <Link href="/promociones" className="hover:underline text-sm">
                Promociones
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="uppercase text-red-100 font-bold text-sm mb-3">
              Conócenos
            </h1>
            <div className="flex flex-col gap-3 text-white">
              <Link href="/sobre-nosotros" className="hover:underline text-sm">
                Quienes somos
              </Link>
              <Link href="/sobre-nosotros#mision" className="hover:underline text-sm">
                Misión y Visión
              </Link>
              <Link href="/sucursales" className="hover:underline text-sm">
                Sucursales
              </Link>
              <Link href="/sucursales#casa1" className="hover:underline text-sm">
                Encuéntranos
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="uppercase text-red-100 font-bold text-sm mb-3">
              Servicio al cliente
            </h1>
            <div className="flex flex-col gap-3 text-white">
              <Link href="/preguntas-frecuentes" className="hover:underline text-sm">
                Preguntas frecuentes
              </Link>
              <Link href="/politicas-de-privacidad" className="hover:underline text-sm">
                Políticas de privacidad
              </Link>
              <Link href="/terminos-y-condiciones" className="hover:underline text-sm">
                Términos y condiciones
              </Link>
              <Link href="/devolucion" className="hover:underline text-sm">
                Cambios y devoluciones
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
