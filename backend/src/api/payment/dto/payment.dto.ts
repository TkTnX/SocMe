import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PaymentDto {
    @IsNotEmpty({message: "Сумма должна не должна быть пустой"})
    @IsNumber({} ,{message: "Сумма должна быть числом"})
    value: number

    @IsNotEmpty({ message: "ID подписки не должно быть пустым" })
        @IsString({message: "ID подписки должно быть строкой"})
   subscriptionId: string
}