import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateFlightDto } from "./createFlightDto";
import { IsDate } from "class-validator";
import { Type } from "class-transformer";


export class UpdateFlightDto extends PartialType(CreateFlightDto){
    @ApiProperty()
    @IsDate()
    @Type(()=>Date)
    arrivalTime?: Date

    @ApiProperty()
    status: string
}