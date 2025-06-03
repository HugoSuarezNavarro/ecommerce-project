import { Product } from "./product";

export class CartItem {

    public id: number;
    public name: string;
    public imageUrl: string;
    public unitPrice: number;
    public unitsInStock: number;
    public quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
        this.unitsInStock = product.unitsInStock;
        this.quantity = 1;
    }

}
