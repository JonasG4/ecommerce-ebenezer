import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

export default function page() {
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
                        Términos y condiciones del servicio
                    </span>
                </div>
                <section className="text-base text-gray-700 [&_p]:text-gray-600">
                    <h1 className="text-lg font-extrabold my-4 uppercase underline">Términos y condiciones del servicio</h1>
                    <div className='grid grid-cols-2 text-justify gap-6'>
                        {/* COLUMNA #1 */}
                        <div>
                            <h2 className="font-bold uppercase">Términos legales</h2>
                            <ol className='list-decimal list-inside flex flex-col gap-3'>
                                <li>
                                    <h5 className='inline font-medium underline'>Restricción de uso</h5>
                                    <p>
                                        Todo el contenido de este sitio es propiedad intelectual de Comercial Eben-Ezer. El mismo no puede ser copiado, duplicado, transmitido, vendido, publicado, distribuido o explotado de ninguna manera para própositos comerciales, con la excepción de descargas de imagenes por parte del usuario para el uso y refencia personal.
                                    </p>
                                    <br />
                                    <p>
                                        El uso indebido y sin autorización de nuestro contenido e imágenes constituye una violación de los derechos del registro de a propiedad intelectual.
                                    </p>
                                </li>
                                <li>
                                    <h2 className="inline font-medium underline">Pedidos</h2>
                                    <p>
                                        Todos los precios mostrados en el sitio web son en la moneda de uso legal en El Salvador que es el Dollar de Estados Unidos.
                                    </p>
                                    <br />
                                    <p>
                                        El pedido puede ser entregado en un plazo de 7 días hábiles que empieza el día después de realizado la compra o se puede programar una fecha en un acuerdo previo con el cliente por cualesquiera de los medio de contacto porporcionado. En caso de necesitar realizar un cambio en su pedido ya sea para agregar o eliminar productos le sugerimos cancelar el pedido y realizar uno nuevo.
                                    </p>
                                    <br />
                                    <p>
                                        Los pedidos cuentan con 5 posibles estados:
                                    </p>
                                    <ul className='list-disc list-inside mt-2 ml-2 [&_li]:marker:w-[7px]'>
                                        <li><p className='inline'><b>Pendiente: </b>Todos los pedidos que ingresan tendrán este estado hasta ser revisados.</p></li>
                                        <li><p className='inline'><b>Procesando: </b>Sucede cuando el pago ha sido revisado y aprobado por el banco.</p></li>
                                        <li><p className='inline'><b>Enviado: </b>Cuando el producto ha sido enviado a la dirección indicada en el pedido.</p></li>
                                        <li><p className='inline'><b>Cancelado: </b>Sucede cuando el pedido ha sido cancelado.</p></li>
                                        <li><p className='inline'><b>Entregado: </b>Cuando el pedido ha sido entregado al cliente exitosamente.</p></li>
                                    </ul>
                                    <br />
                                    <p>
                                        Nos reservamos el derecho de rechazar, cancelar o restringir las cantidades de cualquier pedido sin explicar los motivos, lo cual se notificará por medio de correo electrónico basado en la dirección que se indicó en el pedido.
                                    </p>
                                    <br />
                                    <p>
                                        En caso que decida cancelar el pedido previo a la entrega consulte nuestros términos en <Link href={"/devoluciones"} className='text-red-800 underline'>Cambios y devoluciones</Link>
                                    </p>
                                </li>
                                <li>
                                    <h5 className='inline font-medium underline'>Envíos a domicilio</h5>
                                    <p>
                                        Nuestro pedidos dentro de un plazo que considere las siguientes condiciones:
                                    </p>
                                    <ul className='list-disc list-inside ml-2 mt-2'>
                                        <li><p className='inline'>El plazo de entrega y costos de envío varían de la dirección de envío.</p></li>
                                        <li><p className='inline'>En caso de no llegar a un acuerdo se podrá realizar la devolución, puede consultar nuestros términos en <Link href={"/devoluciones"} className='text-red-800 underline'>Cambios y devoluciones</Link></p></li>
                                        <li><p className='inline'>Si no es posible realizar la entrega en el domicilio establecido por el cliente se podrá coordinar la entrega en un punto acordados por ambas partes.</p></li>
                                        <li><p className='inline'>En caso de que la cantidad de productos pedidos supere la cantidad de carga máxima se dividirá la carga en diferentes envíos acordando las fechas con el cliente.</p></li>
                                    </ul>
                                </li>
                                <li>
                                    <h5 className='inline font-medium underline'>Disponibilidad de productos</h5>
                                    <p>
                                        El catálogo de productos mostrados en nuestro sitio está sujeto a la disponibilidad en las bodegas, y en algunos casos podrían no actualizarse las existencia al momento de la compra.
                                    </p>
                                    <br />
                                    <p>
                                        En caso de que el producto elegido no se encontrara en existencia se le notificará al cliente por medio de los contactos proporcionados por el cliente, para ofrecerle las siguientes alternativas:
                                    </p>
                                    <ol className='list-decimal list-inside mt-2 ml-2'>
                                        <li><p className='inline'>Esperar hasta el abastecimiento de inventario de ese producto.</p></li>
                                        <li><p className='inline'>Si el producto está descontinuado, es decir que ya no entrará más al inventario, se ofrecerá al cliente opciones de producto sustitutos, similares y/o relacionados. Si este es de mayor valor el cliente tiene la opción de dar la diferencia de dinero por adquirir otro producto.</p></li>
                                    </ol>
                                    <br />
                                    <p>
                                        Si las opciones anteriores no satisfacen las expectativas del cliente, o no s recibe una respuesta en un lapso de 5 días hábiles, se hará efectiva la devolución total a la forma de pago original de compra.
                                    </p>
                                </li>
                            </ol>
                        </div>

                        {/* COLUMNA #2 */}
                        <div>
                            <h2 className="font-bold uppercase">Condiciones generales</h2>
                            <p>
                                Todas las formas de pago están sujetas a verificación y autorización de los bancos emisores y a Comercial Eben-Ezer. Las transacciones únicamente deberá ser realizada por el titular del medio de pago.
                            </p>
                            <br />
                            <p>
                                Nuestro portal no puede negar la venta cuando el banco emisor ha autorizado la transacción y los datos registrados en nuestro sistema de venta coincidan con los del registro, por ende, queda fuera de la responsabilidad de Comercial Eben-Ezer el uso y manejo de tarjetas de créditos y/o débitos robadas.
                            </p>
                            <br />
                            <p>
                                En el sitio web <i>comercial-ebenezer.com</i> no se cobran recargos de ninguna comisión o cobro extra por pagar en el sitio web.
                            </p>
                            <br />
                            <p>
                                El procesamiento de los pedidos está sujeto a la confirmación de datos del cliente, por tanto, nos reservamos el derecho de rechazar cualquier pedido cuando no se logre confirmar algún dato del cliente.
                            </p>
                            <br />
                            <ol start={5} className='list-decimal list-inside [&_li]:marker:w-[7px]' role='list'>
                                <li>
                                    <h5 className='inline font-medium underline'>Métodos de pago y condiciones de uso</h5>
                                    <p>
                                        Se cuentan con los siguientes métodos de pago:
                                    </p>
                                    <ul className='list-disc list-inside ml-2 mt-2'>
                                        <li>
                                            <b className='inline'>Tarjetas de crédito y débito</b>
                                            <p>
                                                Este método de pago aplica para recoger en tienda y envío a domicilio.
                                            </p>
                                        </li>
                                        <li>
                                            <b className='inline'>Pago en efectivo</b>
                                            <p>
                                                Esta forma de pago aplica únicamente para opción de recoger en tienda, ya que es necesario el apoyo de un asesor para el cliente realice el pago y se entregue el pedido. No aplica opción envío a domicilio.
                                            </p>
                                        </li>
                                        <li>
                                            <b className='inline'>Transferencia bancaria</b>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vero in odit obcaecati quo. Accusamus sapiente maxime exercitationem! Porro fuga asperiores magnam hic quibusdam rerum inventore natus dolor delectus dolores?
                                            </p>
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
