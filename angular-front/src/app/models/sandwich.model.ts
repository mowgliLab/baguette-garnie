
export class Sandwich {
    public id: number;
    public name: string;
    public description: string;
    public imageSrc: string;
    public orderNumber: number;
    public price: number;

    public static fromDbRow(dbRow: any): Sandwich {
        console.log(dbRow);
        return <Sandwich> {
            id: dbRow.sandwich_id,
            name: dbRow.sandwich_name,
            description: dbRow.sandwich_description,
            imageSrc: dbRow.sandwich_image_src,
            orderNumber: dbRow.sandwich_order_number,
            price: dbRow.sandwich_price
        }
    }
}
