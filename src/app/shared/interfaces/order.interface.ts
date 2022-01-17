export interface Details {
    productId: number;
    productName: string;
    //orderId: number;
    quantity: number;
}

/**
 *     "id": 1,
    "orderId": 1,
    "quantity": 10,
    "productName": "Product name"
 */

export interface Order{
    name: string;
    shippingAddress: string;
    city: string;
    date: string;
    pickup: boolean;
    id: number;
}

export interface DetailsOrder{
    id?: number; //el signo de interrogación significa que es opcional 
    orderId: number;
    details: Details[];
}