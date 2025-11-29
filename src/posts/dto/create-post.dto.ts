import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'My First Post', description: 'The title of the post'})
    title: string;

    @ApiProperty({example: 'This is the body of my first post', description: 'The content of the post'})
    body: string;

    @ApiProperty({example: false, description: 'Publication status of the post'})
    published: boolean;
    
    @ApiProperty({example: 'cuid12345', description: 'The ID of the author'})
    authorId: string;
}
