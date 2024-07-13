import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";


export class CreateFlightDto{
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(()=>Date)
    flightTime: Date

    @ApiProperty()
    @IsNotEmpty()
    capacity: number

    @ApiProperty()
    @IsNotEmpty()
    origin: string

    @ApiProperty()
    @IsNotEmpty()
    destination: string

}