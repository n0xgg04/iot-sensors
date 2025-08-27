import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { DeviceStatus } from '@prisma/client';

@ObjectType()
export class Device {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  sensor_id: string;

  @Field(() => Int)
  port: number;

  @Field(() => String)
  location: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => DeviceStatus)
  status: DeviceStatus;
}

registerEnumType(DeviceStatus, {
  name: 'DeviceStatus',
});

@InputType()
export class AddDevicePayload {
  @Field(() => String)
  name: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  sensor_id: string;

  @Field(() => Int)
  port: number;
}
