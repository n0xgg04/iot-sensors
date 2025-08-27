import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
