"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputSwitch,
  InputMultiFile,
  InputSelect,
  InputNumber,
  RichTextEditor,
  InputSelect2,
} from "@/components/forms/inputs";
import { formatPrice, pricePercent } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import ButtonsForm from "@/components/forms/buttonsForm";

export default function CreatePage() {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);
  const [isLoadingTags, setLoadingTags] = useState(false);
  const [isLoadingSubCat, setLoadingSubCat] = useState(false);

  const [product, updateProduct] = useState({
    nombre: "",
    precio: 19.99,
    porcentaje_descuento: 0.0,
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    stock: 5,
    is_active: 1,
  });

  const [validations, setValidations] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    porcentaje_descuento: "",
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    images: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({
    nombre: "",
    categoria: "",
  });
  const [brands, setBrands] = useState([]);

  const getCategories = async () => {
    const { data: categoriesData } = await axios.get("/api/categories");
    setCategories(categoriesData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    const formData = new FormData();
    formData.append("nombre", product.nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", product.precio);
    formData.append("id_marca", product.id_marca);
    formData.append("id_categoria", product.id_categoria);
    formData.append("id_subcategoria", product.id_subcategoria);
    formData.append("porcentaje_descuento", product.porcentaje_descuento);
    formData.append("stock", product.stock);
    formData.append("estado", product.is_active ? "PUBLICADO" : "ARCHIVADO");
    images.forEach((image) => {
      formData.append(`imagenes`, image.file);
    });

    try {
      const { data: productData } = await axios.post(
        "/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingData(false);
      if (productData) {
        router.push("/nx-admin/productos?showCreate=true");
      }
    } catch (error) {
      setLoadingData(false);
      if (error.response.status === 400) {
        console.log(error.response.data);
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

  const handleInputPrice = (e) => {
    const { value, name } = e.target;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: formatPrice(value),
    }));
  };

  const handleInputNumber = (e, limit = Infinity) => {
    const { value, name } = e.target;
    if(isNaN(value) || value > limit) return;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      <section className="p-7 flex flex-col gap-4">
        <article className={`w-full flex items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10`}>
          <TitleForm title={"Agregar nuevo registro"} subtitle={"Crear producto"} />
          <ButtonsForm
            title="Guardar"
            form={"f-productos"}
            isLoadingData={isLoadingData}
          />
        </article>
        <form
          id="f-productos"
          onSubmit={handleSubmit}
          autoComplete="off"
          className={`flex flex-col gap-4`}
        >
          <div
            className={`grid laptop:grid-cols-2 h-full py-2 bg-gray-50 gap-x-6 gap-y-1 px-7 ${isLoadingData && "pointer-events-none opacity-50 cursor-not-allowed"
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
            <InputSelect
              label="Marca"
              id="id_marca"
              subtitle="Selecciona una marca para tu producto"
              placeholder="Selecciona una marca"
              isLoading={isLoadingTags}
              value={product.id_marca}
              options={brands}
              onChange={handleProduct}
              errMessage={validations.id_marca}
            />
            <InputSelect2
              label="Categoría"
              subtitle="Divide tus productos en categorías"
              placeholder="Selecciona una categoría"
              value={subcategories}
              isLoading={isLoadingTags}
              options={categories}
              onChange={handleSelect}
              errMessage={validations.id_categoria}
            />
            <div className="row-span-2">
              <RichTextEditor
                label="Descripción"
                subtitle="Agrega las especificaciones del producto"
                value={descripcion}
                onChange={setDescripcion}
                errMessage={validations.descripcion}
              />
            </div>
            <InputMultiFile
              label="Imagenes"
              subtitle="Puedes agregar hasta 5 imagenes de tu producto"
              images={images}
              setImages={setImages}
              errMessage={validations.images}
            />
            <div className="flex gap-4 relative">
              <InputNumber
                label="Precio Regular"
                name="precio"
                subtitle="Precio de tu producto"
                leftSymbol="$"
                step={1}
                onChange={handleInputPrice}
                value={product.precio}
                errMessage={validations.precio}
              />
              <InputNumber
                label="Stock"
                subtitle="Cantidad de productos disponibles"
                name="stock"
                leftSymbol={"U"}
                value={product.stock}
                onChange={(e) => handleInputNumber(e, 1000)}
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
                onChange={(e) => handleInputNumber(e, 100)}
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
            <InputSwitch
              label="Publicar"
              subtitle="Publica tu producto para que los clientes puedan verlo"
              name="is_active"
              value={product.is_active}
              onChange={handleProduct}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
