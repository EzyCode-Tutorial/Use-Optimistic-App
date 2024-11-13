"use client";
import { useState, useOptimistic } from "react";
import Form from "next/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { productAction } from "@/app/actions/productAction";
import Image from "next/image";
function productForm() {
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([
    { productName: "Dummy Product", saving: false },
  ]);

  const [optimisticProducts, addOptimisticProducts] = useOptimistic(
    products,
    (state, newProduct) => [...state, { productName: newProduct, saving: true }]
  );

  const saveProducts = async (formData) => {
    try {
      const prdName = formData.get("productName");
      addOptimisticProducts(prdName);
      const sentProduct = await productAction(prdName);
      setProducts((prevProducts) => [
        ...prevProducts,
        { productName: sentProduct },
      ]);
      setIsError(false);
    } catch (err) {
      console.log(err.message);
      setIsError(true);
    }
  };
  return (
    <div className="flex max-w-2xl min-h-screen mx-auto justify-center items-center">
      <div className="flex flex-col gap-5 w-full">
        <div>
          <h1 className="text-3xl text-orange-400 font-semibold text-center">
            Product Details
          </h1>
        </div>
        <div className="my-2">
          {isError && <p className="text-red-400">Server Error</p>}
        </div>
        <Form action={saveProducts} className="flex flex-col gap-5">
          <div>
            <Label>Product Name</Label>
            <Input type="text" placeholder="Product Name" name="productName" />
          </div>
          <div>
            <Button type="submit">Save Product</Button>
          </div>
        </Form>
        <div>
          {optimisticProducts.map((product, i) => (
            <div
              className="flex justify-between border p-2 rounded-lg my-2"
              key={i}
            >
              <div>{product.productName}</div>
              <div>
                {product.saving ? (
                  <Image src="/spinner.gif" alt="" height={20} width={20} />
                ) : (
                  <Image src="/tick.png" alt="" height={20} width={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default productForm;
