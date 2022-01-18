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
    id: number;
    name: string;
    date: string;
    shippingAddress: string;
    city: string;
    isDelivery: boolean;
}

export interface DetailsOrder{
    id?: number; //el signo de interrogación significa que es opcional 
    orderId: number;
    details: Details[];
}