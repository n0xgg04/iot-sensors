/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

export enum Actions {
  Off = 'OFF',
  On = 'ON'
}

export type AddDevicePayload = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  port: Scalars['Int']['input'];
  sensor_id: Scalars['String']['input'];
};

export type Device = {
  __typename?: 'Device';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  port: Scalars['Int']['output'];
  sensor_id: Scalars['String']['output'];
  status: DeviceStatus;
  updated_at: Scalars['DateTime']['output'];
};

export enum DeviceStatus {
  Off = 'off',
  On = 'on',
  Standby = 'standby'
}

export type Mutation = {
  __typename?: 'Mutation';
  addDevices: Scalars['Boolean']['output'];
  controlDevice: Scalars['Boolean']['output'];
};


export type MutationAddDevicesArgs = {
  device: AddDevicePayload;
};


export type MutationControlDeviceArgs = {
  action: Actions;
  device_id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  devices: Array<Device>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

export enum Actions {
  Off = 'OFF',
  On = 'ON'
}

export type AddDevicePayload = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  port: Scalars['Int']['input'];
  sensor_id: Scalars['String']['input'];
};

export type Device = {
  __typename?: 'Device';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  port: Scalars['Int']['output'];
  sensor_id: Scalars['String']['output'];
  status: DeviceStatus;
  updated_at: Scalars['DateTime']['output'];
};

export enum DeviceStatus {
  Off = 'off',
  On = 'on',
  Standby = 'standby'
}

export type Mutation = {
  __typename?: 'Mutation';
  addDevices: Scalars['Boolean']['output'];
  controlDevice: Scalars['Boolean']['output'];
};


export type MutationAddDevicesArgs = {
  device: AddDevicePayload;
};


export type MutationControlDeviceArgs = {
  action: Actions;
  device_id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  devices: Array<Device>;
};
