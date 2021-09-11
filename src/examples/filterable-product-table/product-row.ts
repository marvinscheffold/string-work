import { Product } from "./filterable-product-table";

export function ProductRow(props: any) {
    const product: Product = props.product;
    const name = product.stocked
        ? product.name
        : `<span style="color: red">${product.name}</span>`;

    return `
         <tr>
            <td>${name}</td>
            <td>${product.price}</td>
        </tr>
        `;
}
