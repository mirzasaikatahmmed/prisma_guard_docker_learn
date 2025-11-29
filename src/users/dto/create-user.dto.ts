import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsEmail, IsOptional, Matches } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: "John Doe" })
    @IsString()
    name: string;

    @ApiProperty({ example: "user@gmail.com" })
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/i, { message: "Only @gmail.com addresses are allowed" })
    email: string;
    
    @ApiProperty({ example: "johndoe" })
    @IsString()
    @Transform(({ obj }) => (typeof obj?.email === 'string' ? obj.email.replace(/@gmail\.com$/i, '') : obj?.username))
    username: string;

    @ApiProperty({ example: "password123" })
    @IsString()
    password: string;

    @ApiProperty({ example: "USER" })
    @IsOptional()
    @IsString()
    role: string;
}
