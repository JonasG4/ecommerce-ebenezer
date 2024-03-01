import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full flex flex-col items-center py-5">
            <div className="w-[80%]">
                <div className="flex gap-2 py-2">
                    <Link
                        href={"/"}
                        className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
                    >
                        Inicio
                    </Link>
                    <ChevronRightIcon className="fill-gray-700 w-4" />
                    <span className="text-sm text-red-800">
                        Politicas de privacidad
                    </span>
                </div>
                <section className="text-sm text-gray-700 [&_p]:text-gray-500">
                    <h1 className="text-lg font-extrabold my-4 uppercase underline">Políticas de privacidad</h1>
                    <p>
                        Estas politicas de privacidad están dispuestas por <b>Comercial Eben Ezer</b> con cede en la 4ta calle oriente y 7ave norte, Casa 402, San Miguel, San Miguel. Estamos comprometidos a proteger y preservar la privacidad de nuestros clientes cuando visitan nuestro sitio web o se comunican por los medios sociales porporcionados.
                    </p>
                    <br />
                    <p>
                        Estas politicas establecen cómo procesamos los datos personales que recopilamos de nuestros clientes o que usted nos proporcionas a través de nuestro sitio web y redes sociales. Aseguramos que mantendremos su información segura y cumpliremos plenamente con todas las leyes y regulaciones aplicables de Protección de Datos de El Salvador. Lea atentamente lo siguiente para comprender qué sucede con los datos personales que usted eliges proporcionarnos o que recopilamos de usted cuando visitas nuestro sitio web. Al enviar la información, usted acepta y consiente las prácticas descritas en esta política. <br />
                    </p>
                    <br />
 
                    <h3 className="uppercase font-bold mb-3 underline">Tipos de información que podemos recopilar de usted</h3>
                    <p className="text-sm text-gray-600">
                        Podemos recopilar, almacear y utilizar los siguientes tipos de información personal sobre las personas que visitan y utilizan nuestro sitio web y sitios de redes sociales:
                    </p>
                    <br />
                    <p>
                        <b>Información que usted nos proporciona.</b> Puede proporcionarnos información sobre usted complentado formularios en nuestro sitio web o redes sociales. Esto incluye información que usted proporciona cuando envía un formulario de contacto/consulta. La información que nos proporciona puede incluir, entre otros, sus nombres y apellidos, dirección de domicilio, correo electrónico, número de teléfono y foto de perfil.
                    </p>
                    <br />

                    <h3 className="uppercase font-bold mb-3 underline">Cómo usamos la información que recopilamos</h3>
                    <p>Usamos la información de la siguientes maneras:</p>
                    <br />
                    <p><b>Información que nos proporcionas.</b> Usaremos esta información para:</p>
                    <ol role="lista">
                        <li>Proporcionarte información y/o servicio que nos solicites</li>
                        <li>Contactarte para brindarte la información que solicitaste</li>
                    </ol>
                    <br />

                    <h3 className="uppercase font-bold mb-3 underline">Divulgación de su información</h3>
                    <p>
                        Cualquier información que nos proporciones se nos enviará directamente por correo electrónico o se almacenará en un servidor seguro.
                    </p>
                    <br />
                    <p>Nosotros no rentamos, ni vendemos o compartimos información personal sobre ti a ninguna otra persona o compañias no afiliadas.</p>
                    <br />
                    <p>Haremos todos los esfuerzos razonables para garantizar que sus datos personales no se divulguen a instituciones y autoridades regionales/nacionales a menos que lo exija la ley u otras regulaciones.</p>
                    <br />
                    <p>Lamentablemente, la transmisión de información a través de Internet no es completamente segura. Aunque haremos todo lo posible para proteger sus datos personales, no podemos garantizar la seguridad de sus datos transmitidos a nuestro sitio; cualquier transmisión es bajo su propio riesgo. Una vez que hayamos recibido su información,
                        Utilizaremos procedimientos estrictos y funciones de seguridad para intentar evitar el acceso no autorizado.</p>
                    <br />

                    <h3 className="uppercase font-bold mb-3 underline">Tus derechos - Acceso a tu información personal</h3>
                    <p>
                        Tiene derecho a asegurarse de que sus datos personales se procesen legalmente (“Derecho de Acceso del Sujeto”). Su derecho de acceso como sujeto puede ejercerse de acuerdo con las leyes y regulaciones de protección de datos. Cualquier solicitud de acceso a un sujeto deberá realizarse por escrito al (+503) 7725-6663.
                        Le facilitaremos sus datos personales dentro de los plazos legales. Para permitirnos rastrear cualquiera de sus datos personales que podamos tener, es posible que necesitemos solicitarle más información. Si se queja sobre cómo hemos utilizado su información, tiene derecho a presentar una queja ante la Oficina del Comisionado de Información (ICO).
                    </p>
                    <br />

                    <h3 className="uppercase font-bold mb-3 underline">Cambios en nuestras politicas de privacidad</h3>
                    <p>
                        Cualquier cambio que podamos realizar en nuestra política de privacidad en el futuro se publicará en esta página y, cuando corresponda, se le notificará por correo electrónico. Vuelva a consultar con frecuencia para ver actualizaciones o cambios en nuestra política de privacidad.
                    </p>
                    <br />

                    <h3 className="uppercase font-bold mb-3 underline">Contactos</h3>
                    <p>
                        Las preguntas, comentarios y solicitudes con respecto a esta política de privacidad son bienvenidos y deben dirigirse a Jonas García [garciajonas899@gmail.com]
                    </p>
                </section>
            </div>
        </div>
    )
} 
