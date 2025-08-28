import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class SensorDataType {
  @Field(() => Float, { nullable: true })
  temperature: number;

  @Field(() => Float, { nullable: true })
  humidity: number;

  @Field(() => Float, { nullable: true })
  lux: number;

  @Field(() => Date, { nullable: true })
  timestamp: Date;
}

export type SensorDataInput = {
  temperature: number;
  humidity: number;
  lux: number;
  timestamp: Date;
};
