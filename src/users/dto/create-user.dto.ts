import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: "John Doe" })
    @IsString()
    name: string;

    @ApiProperty({ example: "email@example.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "password123" })
    @IsString()
    password: string;
}
