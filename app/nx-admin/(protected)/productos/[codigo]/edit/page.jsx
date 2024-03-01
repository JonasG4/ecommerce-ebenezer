"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputNumber,
  RichTextEditor,
  InputSelect2,
  DropDown,
} from "@/components/forms/inputs";
import { formatPrice, pricePercent } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import ButtonsForm from "@/components/forms/buttonsForm";
import Loading from "@/app/nx-admin/(protected)/productos/[codigo]/edit/loading";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { notification } from "@/components/toast";
import Zoom from "@/components/modals/Zoom";
import NotFound from "@/app/nx-admin/(protected)/not-found"

export default function EditPage({ params: { codigo } }) {
  const router = useRouter();
  const toast = new notification();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingData, setLoadingData] = useState(false);
  const [isLoadingTags, setLoadingTags] = useState(false);
  const [isProductExist, setProductExist] = useState(false);

  const [product, updateProduct] = useState({
    nombre: "",
    precio: 19.99,
    porcentaje_descuento: 0,
    id_categoria: "",
    id_subcategoria: "",
    portada: "",
    id_marca: "",
    stock: 0,
    estado: "",
  });

  const [descripcion, setDescripcion] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState({
    nombre: "",
    categoria: "",
  });

  const [validations, setValidations] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    id_categoria: "",
    id_subcategoria: "",
    porcentaje_descuento: "",
    id_marca: "",
    stock: "",
    estado: "",
  });

  const getCategories = async () => {
    const { data: categoriesData } = await axios.get("/api/categories");
    setCategories(categoriesData);
  };

  const getProduct = async () => {
    setLoading(true);
    const { data: productData } = await axios
      .get(`/api/products/${codigo}`)
      .finally(() => setLoading(false));

    if (productData) setProductExist(true)

    updateProduct(productData);
    setDescripcion(productData?.descripcion);
    setSubcategories({
      nombre: productData?.subcategoria?.nombre,
      categoria: productData?.categoria?.nombre,
    });
    setImages(productData?.imagenes);
  };

  const getImages = async () => {
    await axios
      .get("/api/products/images", {
        params: {
          id_producto: product.id_producto,
        },
      })
      .then((res) => {
        setImages(res.data);
      });
  };

  const getBrands = async () => {
    const { data: brandsData } = await axios.get("/api/brands");
    setBrands(brandsData);
  };

  const getTags = () => {
    setLoadingTags(true);
    getCategories();
    getBrands();
    setLoadingTags(false);
  };

  useEffect(() => {
    getProduct();
    getTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    try {
      const { data: productData } = await axios
        .put(`/api/products/${codigo}`, {
          nombre: product.nombre,
          descripcion: descripcion,
          precio: product.precio,
          porcentaje_descuento: product.porcentaje_descuento,
          id_categoria: product.id_categoria,
          id_subcategoria: product.id_subcategoria,
          id_marca: product.id_marca,
          stock: product.stock,
          estado: product.estado,
        })
        .finally(() => setLoadingData(false));
      if (productData) {
        router.push("/nx-admin/productos");
        toast.success("Se ha actualizado con éxito", "Producto actualizado")
      }
    } catch (error) {
      setLoadingData(false);
      if (error.response.status === 400) {
        setValidations(error.response.data);
      }
    }
  };

  const handleProduct = (e) => {
    const { value, type, name } = e.target;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));

    setValidations((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSelect = (option) => {
    updateProduct((prevState) => ({
      ...prevState,
      id_subcategoria: option.subcategoria.id_subcategoria,
      id_categoria: option.categoria.id_categoria,
    }));

    setSubcategories({
      nombre: option.subcategoria.nombre,
      categoria: option.categoria.nombre,
    });
  };

  const handleInputnumber = (e) => {
    const { value, name } = e.target;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: formatPrice(value),
    }));
  };

  const handleInputPercent = (e) => {
    const { value, name } = e.target;
    if (isNaN(value) || value > 100) return;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const updateCover = (cover) => {
    updateProduct({
      ...product,
      portada: cover,
    });
  };


  return (
    <div className="w-full h-full flex flex-col bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      {isLoading && <Loading />}
      {!isLoading && !isProductExist && <NotFound />}

      {isProductExist && (
        <section
          className={`p-7 flex flex-col gap-4 ${isLoading ? "hidden" : ""} ${isLoadingData ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}
        >
          <div
            className={`w-full flex items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10`}
          >
            <TitleForm title={"Editar Producto"} subtitle={product.nombre} />
            <ButtonsForm
              title="Guardar"
              isLoadingData={isLoadingData}
              typeForm="edit"
              form={"f-productos"}
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-full h-[1px] bg-slate-700/20"></div>
            <p className="text-sm text-indigo-500 whitespace-nowrap font-semibold">
              Información del producto
            </p>
            <div className="w-full h-[1px] bg-slate-700/20"></div>
          </div>

          <form
            onSubmit={handleSubmit}
            id="f-productos"
            autoComplete="off"
            className={`flex flex-col gap-4`}
          >
            <div
              className={`grid grid-cols-1 laptop:grid-cols-2 h-full bg-gray-50 gap-x-6 px-2 ${isLoadingData &&
                "pointer-events-none opacity-50 cursor-not-allowed"
                }`}
            >
              <InputText
                label="Nombre"
                subtitle="Maximo 100 caracteres"
                placeholder="Ej: Lavadora LG 10kg"
                name="nombre"
                type="text"
                value={product.nombre}
                onChange={handleProduct}
                errMessage={validations.nombre}
              />
              <DropDown
                label="Marca"
                name="id_marca"
                subtitle="Selecciona una marca para tu producto"
                isLoading={isLoadingTags}
                value={product.id_marca}
                options={brands}
                onChange={handleProduct}
                errMessage={validations.id_marca}
              />
              <div className="row-span-3">
                <RichTextEditor
                  label="Descripción"
                  subtitle="Agrega las especificaciones del producto"
                  value={descripcion}
                  onChange={setDescripcion}
                  errMessage={validations.descripcion}
                />
              </div>
              <InputSelect2
                label="Categoría"
                name="categoria"
                subtitle="Divide tus productos en categorías"
                value={subcategories}
                isLoading={isLoadingTags}
                options={categories}
                onChange={handleSelect}
                errMessage={validations.id_categoria}
              />
              <div className="grid grid-cols-2 gap-4 relative">
                <InputNumber
                  label="Precio Regular"
                  name="precio"
                  subtitle="Precio de tu producto"
                  leftSymbol="$"
                  step={1}
                  onChange={handleInputnumber}
                  value={product.precio}
                  errMessage={validations.precio}
                />
                <InputNumber
                  label="Stock"
                  subtitle="Cantidad de productos disponibles"
                  name="stock"
                  value={product.stock}
                  onChange={handleProduct}
                  errMessage={validations.stock}
                />
              </div>
              <div className="flex gap-4 relative">
                <InputNumber
                  label="Descuento"
                  name="porcentaje_descuento"
                  subtitle="Porcentaje de descuento de tu producto"
                  leftSymbol="%"
                  step={1}
                  allowNull={true}
                  limit={100}
                  onChange={handleInputPercent}
                  value={product.porcentaje_descuento}
                  errMessage={validations.porcentaje_descuento}
                />
                <aside className="flex flex-col px-4">
                  <h4 className="text-sm whitespace-nowrap text-gray-600 font-bold">Precio con descuento</h4>
                  <p className="text-xs text-gray-500">Se mostrará en la tienda</p>
                  <div className="flex flex-col justify-between p-2 rounded-md ring-1 ring-gray-800/10 bg-white shadow-md mt-2">
                    <p className="text-xl text-gray-800 font-bold text-center">
                      ${formatPrice(pricePercent(product.precio, product.porcentaje_descuento))}
                    </p>
                  </div>
                </aside>
              </div>
              <DropDown
                label="Estado"
                name="estado"
                value={product.estado}
                subtitle="Selecciona el estado de tu producto"
                wSearch={false}
                options={[
                  {
                    estado: "ARCHIVADO",
                    nombre: "Archivado",
                    descripcion:
                      "El producto no se mostrará a los clientes y no estará disponible para pedidos",
                  },
                  {
                    estado: "PUBLICADO",
                    nombre: "Publicado",
                    descripcion:
                      "El producto se publicará y será visible para los clientes",
                  },
                ]}
                onChange={handleProduct}
                errMessage={validations.estado}
              />
            </div>
          </form>

          <div className="w-full flex gap-2 items-center">
            <div className="w-full h-[1px] bg-slate-700/20"></div>
            <p className="text-sm text-indigo-500 whitespace-nowrap font-semibold">
              Fotos del producto
            </p>
            <div className="w-full h-[1px] bg-slate-700/20"></div>
          </div>

          <InputCustomFiles
            label="Galeria"
            productCode={codigo}
            subtitle="Agrega o cambia las imagenes de tu producto"
            cover={product.portada}
            setCover={updateCover}
            images={images}
            updateImages={getImages}
          />
        </section>
      )}
    </div>
  );
}

const InputCustomFiles = ({
  label,
  subtitle,
  cover,
  setCover,
  images = [],
  updateImages,
}) => {
  const Portada = images.find((image) => image.source === cover);
  const toast = new notification();

  const handleChangeImage = async (newFile, image) => {
    const formData = new FormData();
    formData.append("newImage", newFile);
    formData.append("image", image.source);
    formData.append("id_producto", Portada.id_producto_imagen);

    try {
      await axios.patch(
        `/api/products/images/${image.id_producto_imagen}`,
        formData
      );

      toast.success("Se ha actualizado con éxito", "Imagen actualizada");
      updateImages();
    } catch (error) {
      toast.error(
        "No se ha podido cambiar. Intenta de nuevo",
        "Error al cambiar imagen"
      );
    }
  };

  const handleDeleteImage = async (id_producto_imagen) => {
    try {
      await axios.delete(`/api/products/images/${id_producto_imagen}`);
      toast.success("Se ha eliminado con éxito", "Imagen eliminada");
      updateImages();
    } catch (error) {
      toast.error(
        "No se ha podido eliminar. Intenta de nuevo",
        "Error al borrar imagen"
      );
    }
  };

  const handleSaveImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("id_producto", Portada.id_producto);

    try {
      await axios.post(`/api/products/images`, formData);
      toast.success("Se ha subido con éxito", "Imagen agregada");
      updateImages();
    } catch (error) {
      toast.error(
        "No se ha podido agregar. Intenta de nuevo",
        "Error al agregar imagen"
      );
    }
  };

  const handleChangeCover = async (newFile, image) => {
    const { id_producto, id_producto_imagen, source } = image;

    const formData = new FormData();
    formData.append("newImage", newFile);
    formData.append("image", source);
    formData.append("id_producto", id_producto);

    try {
      const { data } = await axios.patch(
        `/api/products/images/${id_producto_imagen}`,
        formData
      );

      await axios.patch("/api/products/images/update-cover", {
        portada: data.source,
        id_producto,
      });

      setCover(data.source);
      updateImages();
      toast.success("Portada actualizada con éxito", "Portada actualizada");
    } catch (error) {
      toast.error("Se ha subido con éxito");
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center gap-2 px-4 py-2 bg-white ring-1 ring-slate-700/10 shadow-md rounded-md">
      <div className="text-center">
        <h5 className="text-base text-gray-600 font-bold">
          {label}
          <span className="font-normal ml-2">{`(${images?.length}/5)`}</span>{" "}
        </h5>
        <p className={`text-xs text-gray-400 ${!subtitle && "hidden"}`}>
          {subtitle}
        </p>
      </div>

      <div className="flex gap-4 py-2">
        {/* PORTADA */}
        <CardImage
          image={Portada}
          index={1}
          onSave={handleChangeCover}
          outline={true}
        />

        {/* SEPARADOR */}
        <div className="flex flex-col gap-1 items-center">
          <div className="w-[1px] h-full bg-indigo-500"></div>
          <h5
            style={{
              writingMode: "vertical-rl",
            }}
            className="text-xs uppercase font-bold text-indigo-500"
          >
            Portada
          </h5>
          <div className="w-[1px] h-full bg-indigo-500"></div>
        </div>

        {/* IMAGENES */}
        {Array(5)
          .fill()
          .map((_, index) => {
            if (images[index]?.source === cover) return null;
            return (
              <div key={index} className="flex">
                {images[index] === undefined ? (
                  <EmptyImage index={index + 1} onSave={handleSaveImage} />
                ) : (
                  <CardImage
                    image={images[index]}
                    index={index}
                    onSave={handleChangeImage}
                    onDelete={handleDeleteImage}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const CardImage = ({
  index,
  image,
  outline = false,
  onSave,
  onDelete = null,
}) => {
  const InputRef = useRef(null);
  const ModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = new notification();

  const handleImage = (e) => {
    const { files } = e.target;
    if (files.length === 0) return;
    setLoading(true);
    onSave(files[0], image).finally(() => {
      setLoading(false);
    });
    InputRef.current.value = "";
  };

  const handleDelete = () => {
    setLoading(true);
    onDelete(image.id_producto_imagen).finally(() => {
      setLoading(false);
    });
    setIsOpen(false);
  };

  return (
    <div
      className={`relative ring-1 bg-slate-50 rounded-md 
        ${outline ? "ring-indigo-400" : "ring-slate-700/20"} 
        ${isLoading && "opacity-50 animate-pulse pointer-events-none"}
        flex flex-col justify-between gap-2`}
    >
      <Image
        src={`${process.env.AWS_BUCKET_URL + image?.source}`}
        alt="Imagen de portada"
        width={140}
        height={140}
        className={`w-[140px] h-[140px] object-contain mix-blend-multiply`}
      />
      <div
        className={`absolute z-50 inset-0 flex justify-center items-center ${!isLoading && "hidden"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-6 h-6 text-gray-200 animate-spin fill-indigo-400"
        >
          <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-2 py-1 rounded-b-md border-t border-slate-700/10">
        <span
          data-before="Zoom"
          className="relative flex items-center justify-center text-slate-400 cursor-pointer hover:text-indigo-600 botom-tooltip before:content-[attr(data-before)]"
        >
          <Zoom
            className="w-4 h-4 text-slate-400 hover:text-indigo-500"
            src={`${process.env.AWS_BUCKET_URL}${image?.source}`}
          />
        </span>
        <span
          data-before="Cambiar foto"
          className="relative flex items-center justify-center text-slate-400 cursor-pointer hover:text-indigo-600 botom-tooltip before:content-[attr(data-before)]"
        >
          <PhotoIcon
            className="w-4 h-4 text-slate-400 hover:text-indigo-500"
            onClick={() => InputRef.current.click()}
          />
        </span>
        {onDelete && (
          <span
            data-before="Eliminar foto"
            className="relative botom-tooltip before:content-[attr(data-before)] flex justify-center"
          >
            <TrashIcon
              className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-500"
              onClick={() => setIsOpen(true)}
            />
          </span>
        )}

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-[1000] flex items-center justify-center"
            ref={ModalRef}
          >
            <div className="w-[420px] bg-white rounded-md flex flex-col justify-between">
              <h1 className="text-base font-bold text-slate-700 px-4 py-2">
                ¿Desea eliminarla?
              </h1>
              <div className="bg-slate-50">
                <p className="px-3 py-2 text-sm text-slate-50 bg-red-500 flex gap-2 items-center">
                  <ExclamationCircleIcon className="w-6 text-white" />
                  Esta acción es irreversible, no podrá recuperar esta imagen
                </p>
                <Image
                  src={`${process.env.AWS_BUCKET_URL + image?.source}`}
                  alt="Imagen de portada"
                  width={140}
                  height={140}
                  className="w-[140px] h-[140px] object-contain mix-blend-multiply mx-auto my-2"
                />
              </div>
              <div className="flex justify-end gap-2 px-4 py-3 border-t border-slate-700/10">
                <button
                  type="button"
                  className="py-1 px-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="py-1 px-2 ring-1 text-slate-600 ring-slate-700/30 hover:ring-slate-700/50 rounded-md text-sm"
                  onClick={handleDelete}
                >
                  Si, eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <input
        type="file"
        id={`photofile-${index}`}
        className="hidden"
        ref={InputRef}
        onChange={handleImage}
        accept="image/*"
      />
    </div>
  );
};

const EmptyImage = ({ index, onSave }) => {
  const UploadRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { files } = event.target;
    if (!files[0]) return;
    setLoading(true);
    onSave(files[0]).finally(() => setLoading(false));
  };

  return (
    <div className="relative flex">
      <div
        data-after={index}
        className={`flex flex-col bg-slate-50 ${isLoading && "opacity-50 pointer-events-none animate-pulse"
          } w-[120px] relative items-center my-2 justify-center gap-2 border border-dashed rounded-md border-slate-700/10 after:content-[attr(data-after)] after:absolute after:z-50 after:text-5xl after:top-0 after:left-2 after:text-slate-700/20 hover:after:text-indigo-500/60 after:font-extrabold cursor-pointer hover:border-indigo-400 hover:bg-indigo-100 group/upload`}
        onClick={() => UploadRef.current.click()}
      >
        <PhotoIcon className="w-4 h-4 text-slate-700/50 group-hover/upload:text-indigo-400" />
        <span className="text-xs text-slate-700/50 group-hover/upload:text-indigo-500">
          Subir imagen
        </span>
      </div>
      <div
        className={`absolute z-50 inset-0 flex justify-center items-center ${!isLoading && "hidden"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-6 h-6 text-gray-200 animate-spin fill-indigo-400"
        >
          <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
        </svg>
      </div>
      <input
        type="file"
        className="hidden"
        ref={UploadRef}
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};
