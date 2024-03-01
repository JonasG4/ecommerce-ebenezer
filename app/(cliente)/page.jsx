"use client";
import { useState, useEffect, useRef } from "react";
import { AngleDownIcon } from "@/components/icons/light";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import CardProductV2 from "@/components/cards/CardProductV2";
import {
  CreditCardIcon,
  ShopIcon,
  TrunkFastIcon,
} from "@/components/icons/solid";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ShieldCheckIcon } from "@/components/icons/regular";
import CardProduct from "@/components/cards/CardProduct";
import { Inter, Montserrat } from "next/font/google";


const inter = Montserrat({
  display: "swap",
  optional: true,
  weights: [100, 200, 300, 400, 700],
  subsets: ["cyrillic-ext"],
});

export default function HomePage() {


  return (
    <main className="flex flex-col w-full items-center justify-center bg-gray-50">
      <div className="w-[90%] monitor:w-[1350px] overflow-hidden">
        <Slider />
        <section className="w-full grid grid-cols-[52%_48%] gap-2 desktop:grid-cols-[30%_30%_40%] p-[1px]">
          <Image
            src="/images/publicidad/rebaja2.jpg"
            width={400}
            height={150}
            alt="Envios a todo el pais Eben Ezer"
            className="object-cover w-full h-auto rounded-sm ring-1 ring-gray-300 shadow-md col-start-2 desktop:col-start-auto"
            priority
          />
          <Image
            src="/images/publicidad/rebajas4.png"
            width={400}
            height={150}
            alt="Envios a todo el pais Eben Ezer"
            className="object-cover w-full h-auto rounded-sm ring-1 ring-gray-300 shadow-md col-start-2"
            priority
          />
          <Image
            src="/images/publicidad/cocina-gsr-promo2.jpg"
            width={440}
            height={420}
            alt="Cocina para hornear"
            className="object-cover w-full h-auto rounded-sm shadow-md ring-1 ring-gray-300 row-span-2 row-start-1 desktop:row-start-auto"
            priority
          />
          <Image
            src="/images/publicidad/promo2-1.jpg"
            width={600}
            height={220}
            alt="Envios a todo el pais Eben Ezer"
            className="object-cover w-full h-auto rounded-sm ring-1 ring-gray-700/10 col-span-2 desktop:row-start-2 shadow-sm place-self-end"
            priority
          />
        </section>
      </div>

      <SomeProducts />

      <CategoriesList />

      <section className="w-full bg-yellow-100 h-[320px] laptop:h-[200px] flex items-center justify-center border-y border-yellow-800/70">
        <div className="w-[90%] grid grid-cols-2 laptop:grid-cols-4 gap-8 monitor:w-[1350px]">
          <article className="flex flex-col items-center gap-2 justify-center">
            <span className="w-[70px] h-[70px] rounded-full border border-double bg-yellow-50 shadow-md flex items-center justify-center border-yellow-800">
              <TrunkFastIcon className="w-[40px] fill-yellow-800" />
            </span>
            <h2 className="text-center">
              <span className="text-lg font-bold text-yellow-600">
                Envíos hasta tu hogar
              </span>
              <span className="text-gray-800 block leading-4 text-sm">
                {" "}
                disponibles en todo el país
              </span>
            </h2>
          </article>

          <article className="flex flex-col items-center gap-2  justify-center">
            <span className="w-[70px] h-[70px] rounded-full border border-double bg-yellow-50 shadow-md flex items-center justify-center border-yellow-800">
              <ShieldCheckIcon className="w-[40px] fill-yellow-800" />
            </span>
            <h2 className="text-center">
              <span className="text-lg font-bold text-yellow-600">
                Pago rápido y seguro
              </span>
              <span className="text-gray-800 block leading-4 text-sm">
                {" "}
                con un solo click
              </span>
            </h2>
          </article>

          <article className="flex flex-col items-center gap-2 justify-center">
            <span className="w-[70px] h-[70px] rounded-full border border-double bg-yellow-50 shadow-md flex items-center justify-center border-yellow-800">

              <CreditCardIcon className="w-[40px] fill-yellow-800" />
            </span>
            <h2 className="text-center">
              <span className="text-lg font-bold text-yellow-600">
                Paga con tarjeta
              </span>
              <span className="text-gray-800 block leading-4 text-sm">
                {" "}
                de crédito o débito
              </span>
            </h2>
          </article>

          <article className="flex flex-col items-center gap-2 justify-center">
            <span className="w-[70px] h-[70px] rounded-full border border-double bg-yellow-50 shadow-md flex items-center justify-center border-yellow-800">
              <ShopIcon className="w-[45px] fill-yellow-800" />
            </span>
            <h2 className="text-center">
              <span className="text-lg font-bold text-yellow-600">
                Recoge en sucursal
              </span>
              <span className="text-gray-800 block leading-4 text-sm">
                {" "}
                sin costo adicional (pickup)
              </span>
            </h2>
          </article>
        </div>
      </section>
    
      <SpecialOffers />

      <BrandsList />
    </main>
  );
}

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([
    "/images/publicidad/banner1.png",
    "/images/publicidad/banner3.png",
    "/images/publicidad/banner5.png",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === images.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="py-5 flex flex-col items-center relative group/slider">
      <Image
        src={images[current]}
        width={1400}
        height={300}
        priority
        alt="Productos comercial eben ezer"
        className="rounded-sm object-cover ring-1 ring-gray-700/10 max-h-[300px] w-full"
      />
      <div className="absolute flex gap-1 items-center justify-center bottom-7 bg-black bg-opacity-30 p-1.5 tablet:p-2 rounded-md shadow-md">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            className={`w-2 h-2 tablet:w-3 tablet:h-3 rounded-full focus:outline-none bg-gray-300 ${current === index ? "bg-opacity-80" : "bg-opacity-25"
              } duration-200 ease-in-out transition-colors`}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

const SomeProducts = () => {
  const [products, setProducts] = useState([]);
  const ref = useRef(null);

  const getData = async () => {
    const { data } = await axios.get("/api/public/products", {
      params: {
        categoria: "camas",
      }
    });
    setProducts(data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <section className="w-full bg-sky-100 mt-10">
      <div className="flex flex-col items-center justify-between w-[90%] monitor:w-[1350px] py-10 mx-auto">
        <h1 className="uppercase text-2xl font-bold text-sky-800">
          El mejor confort en camas y colchones
        </h1>
        <p className="text-sky-500">
          Duerma como nunca con nuestras camas y colchones de primera calidad
          ti
        </p>
        <div className="w-[120px] h-[2px] bg-yellow-500 my-4"></div>
        <div className="w-full flex items-center gap-2">
          <ChevronLeftIcon
            role="prev-slide-button"
            className="w-10 h-10 fill-indigo-800 cursor-pointer hover:fill-indigo-800/80"
            onClick={() => ref.current.scrollBy(-228, 0)}
          />
          <ul
            ref={ref}
            className="w-full grid grid-flow-col auto-cols-[220px] gap-x-2 place-items-center overflow-x-auto scrollbar-none px-[1px] py-4 scroll-smooth snap-start"
            style={{
              scrollSnapType: 'x mandatory'
            }}
          >
            {products.map((product, index) => (
              <CardProductV2 product={product} key={index} variant="outline" />
            ))}
          </ul>
          <ChevronRightIcon
            role="next-slide-button"
            className="w-10 h-10 fill-indigo-800 cursor-pointer hover:fill-indigo-800/80"
            onClick={() => ref.current.scrollBy(228, 0)}
          />
        </div>
      </div>
    </section>
  );
};

function SpecialOffers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/products/disccount");
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="w-full py-10 bg-zinc-900 flex justify-center">
      <div className="w-[90%] monitor:w-[1350px] flex flex-col desktop:flex-row items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <h1 className="text-4xl font-black text-yellow-500">
            ¡ESTÁS DE SUERTE!
          </h1>
          <h1 className="text-2xl font-extrabold text-zinc-50 uppercase text-center">
            Aprovecha las ofertas
            <span className="block text-5xl">limitadas</span>
          </h1>
        </div>
        {loading ? (
          <div className="mt-4 grid movile:grid-cols-1 tablet:grid-cols-4 place-items-center gap-4">
            {Array(4)
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className="relative w-[220px] h-[340px] bg-transparent skeleton-dark"
                ></li>
              ))}
          </div>
        ) : (
          <div className="w-full flex items-center overflow-hidden">
            <ChevronLeftIcon
              role="prev-slide-button"
              className="w-10 h-10 fill-gray-100 cursor-pointer hover:fill-gray-200"
              onClick={() => ref.current.scrollBy(-228, 0)}
            />
            <ul
              ref={ref}
              className="w-[calc(228px*4)] grid grid-flow-col auto-cols-[220px] gap-x-2 place-items-center overflow-x-auto scrollbar-none px-[1px] py-4 scroll-smooth snap-start"
              style={{
                scrollSnapType: 'x mandatory'
              }}
            >
              {products.map((product, index) => (
                <CardProductV2 key={index} product={product} />
              ))}
            </ul>
            <ChevronRightIcon
              role="next-slide-button"
              className="w-10 h-10 fill-gray-100 cursor-pointer hover:fill-gray-200"
              onClick={() => ref.current.scrollBy(228, 0)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

const CategoriesList = () => {
  return (
    <section className={`my-10 flex flex-col items-center justify-center w-[90%] monitor:w-[1350px] overflow-hidden ${inter.className}`}>
      <h1 className="uppercase text-2xl font-bold text-gray-800 text-center">
        Explora nuestras categorias
      </h1>
      <p className="text-gray-500 text-center">
        Encuentra los mejores productos para tu hogar
      </p>
      <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
      <ul className="p-4 flex flex-col tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-3 w-full">
        {/* LAVADORAS */}
        <li className={``}>
          <Link href={'/categorias/lavadoras'}
            className={`flex flex-col relative gap-3 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} break-words`}>
              Lavadoras
            </h1>
            <Image
              src={'/images/categorias/lavadoras.png'}
              className={`w-[180px] h-[165px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={165}
              alt={'lavadoras comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        {/* REFRIGERADORES */}
        <li className={`col-span-2`}>
          <Link href={'/categorias/refrigeradoras'}
            className={`flex flex-col tablet:flex-row relative gap-2 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-2xl tablet:text-4xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} break-words`}>
              Refrigeradoras
            </h1>
            <Image
              src={'/images/categorias/refrigeradores.png'}
              className={`w-[180px] h-[180px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={180}
              alt={'refrigeradoras comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        {/* CAMAS */}
        <li className={``}>
          <Link href={'/categorias/camas'}
            className={`flex flex-col relative gap-4 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} absolute top-2`}
              style={{ fontSize: "2rem" }}
            >
              Camas
            </h1>
            <Image
              src={'/images/categorias/camas.png'}
              className={`w-[180px] h-[160px]z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200 `}
              width={400}
              height={160}
              alt={'camas comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        {/* COCINAS */}
        <li className={``}>
          <Link href={'/categorias/cocinas'}
            className={`flex flex-col relative gap-3 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} break-words`}
            >Cocinas
            </h1>
            <Image
              src={'/images/categorias/cocinas.png'}
              className={`w-[180px] h-[165px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={165}
              alt={'cocinas comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        {/* Salas */}
        <li className={`col-span-2 relative`}>
          <Link href={'/categorias/salas'}
            className={`flex flex-col gap-4 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card overflow-hidden`}
          >
            <h1 className={`text-4xl tablet:text-[9rem] uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} absolute top-4 tablet:top-20`}
            >
              Salas
            </h1>
            <Image
              src={'/images/categorias/salas.png'}
              className={`w-[400px] h-[160px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200 absolute tablet:bottom-2 bg-transparent`}
              width={400}
              height={160}
              alt={'Salas comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        <li className={``}>
          <Link href={'/categorias/sillones'}
            className={`flex flex-col relative gap-2 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} break-words`}>
              Sillones
            </h1>
            <Image
              src={'/images/categorias/sillones.png'}
              className={`w-[180px] h-[180px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={180}
              alt={'Sillones comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        {/* Microondas */}
        <li className={``}>
          <Link href={'/categorias/microondas'}
            className={`flex flex-col relative gap-3 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 absolute top-2`}>
              Microondas
            </h1>
            <Image
              src={'/images/categorias/microondas.png'}
              className={`w-[180px] h-[165px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={165}
              alt={'Microondas comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        {/* TELEVISORES */}
        <li className={`tablet:row-start-1 laptop:row-start-2 desktop:row-start-auto`}>
          <Link href={'/categorias/televisores'}
            className={`flex flex-col relative gap-3 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} break-words`}>
              Televisores
            </h1>
            <Image
              src={'/images/categorias/televisores.png'}
              className={`w-[200px] h-[165px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={165}
              alt={'televisores comercial eben ezer'}
              priority
            />
          </Link>
        </li>
        {/* LICUADORAS */}
        <li className={``}>
          <Link href={'/categorias/licuadoras'}
            className={`flex flex-col relative gap-2 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} break-words`}>
              Licuadoras
            </h1>
            <Image
              src={'/images/categorias/licuadoras.png'}
              className={`w-[180px] h-[180px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={180}
              alt={'Licuadoras comercial eben ezer'}
              priority
            />
          </Link>
        </li>

        {/* MOLINOS */}
        <li className={``}>
          <Link href={'/categorias/molinos'}
            className={`flex flex-col relative gap-2 items-center justify-center w-full h-[250px] hover:shadow-md ring-1 ring-gray-700/10 hover:ring-red-200 ease-in-out duration-200 bg-gray-100 group/card`}
          >
            <h1 className={`text-3xl uppercase font-black text-red-800/30 px-4 py-1 ${inter.className} break-words`}>
              Molinos
            </h1>
            <Image
              src={'/images/categorias/molino.png'}
              className={`w-[180px] h-[180px] z-10 object-contain group-hover/card:scale-110 ease-in-out duration-200`}
              width={400}
              height={180}
              alt={'Molinos comercial eben ezer'}
              priority
            />
          </Link>
        </li>
      </ul>
      <Link href={"/categorias"} className="text-center bg-transparent text-red-800 ring-1 ring-red-800 rounded-full mt-4 px-4 py-2 text-sm mb-2 hover:bg-red-800 hover:text-white duration-200 ease-in-out">Ver todas las categorías</Link>
    </section>
  );
};

const BrandsList = () => {
  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    const { data } = await axios.get("/api/brands");
    setBrands(data);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className="my-10 flex flex-col items-center justify-center">
      <h1 className="mt-10 uppercase text-2xl font-bold text-gray-700">
        CONOCE NUESTRAS MARCAS
      </h1>
      <p className="text-gray-500">
        Sellos de calidad que nos respaldan, conoce las marcas que tenemos para
        ti
      </p>
      <div className="w-[120px] h-[2px] bg-red-300 my-4"></div>
      <div className="grid grid-rows-2 grid-flow-col gap-8 my-4">
        {brands.map((brand, index) => (
          <div
            className="flex flex-col items-center justify-center"
            key={index}
          >
            <Image
              src={`${process.env.AWS_BUCKET_URL}${brand.imagen}`}
              width={120}
              height={100}
              placeholder="blur"
              blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
              alt="Marca SAMSUNG"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
