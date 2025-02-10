import { CheckIcon } from "@heroicons/react/24/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import React from "react";
interface Props {
  products: Product[];
  selected: Product | null
}
function PlanDetail({ products, selected }: Props) {
  return (
    <>
      <table>
        <tbody className="divide-y divide-[gray]">
          <tr className="flex flex-wrap items-center font-medium">
            <td
              className={`w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base`}>
              Monthly price
            </td>
            {products?.map((product) => (
              <td
                className={`w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                  selected?.id === product.id ? "text-[e50914]" : "text-[gray]"
                }`}
                key={product.id}>
                ${product.prices[0].unit_amount! / 100}
              </td>
            ))}
          </tr>
          <tr className="flex flex-wrap items-center font-medium">
            <td
              className={`w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base`}>
              Video Quality
            </td>
            {products?.map((product) => (
              <td
                className={`w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                  selected?.id === product.id ? "text-[e50914]" : "text-[gray]"
                }`}
                key={product.id}>
                {product.metadata.videoQuality}
              </td>
            ))}
          </tr>
          <tr className="flex flex-wrap items-center font-medium">
            <td
              className={`w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base`}>
              Resolution
            </td>
            {products?.map((product) => (
              <td
                className={`w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                  selected?.id === product.id ? "text-[e50914]" : "text-[gray]"
                }`}
                key={product.id}>
                {product.metadata.resolution}
              </td>
            ))}
          </tr>
          <tr className="flex flex-wrap items-center font-medium">
            <td
              className={`w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base`}>
              Watch on your TV, computer, mobile phone and tabled
            </td>
            {products?.map((product) => (
              <td
                className={`w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                  selected?.id === product.id ? "text-[e50914]" : "text-[gray]"
                }`}
                key={product.id}>
                <CheckIcon className="inline-block h-8 w-8" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default PlanDetail;
