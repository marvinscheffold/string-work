export function ProductCategoryRow(props: any) {
    const category = props.category;
    return `
        <tr>
        <th colSpan="2">
          ${props.category}
        </th>
      </tr>
        `;
}
