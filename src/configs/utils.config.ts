/* eslint-disable prettier/prettier */
import { Response } from './response.config';
export const SafeResponse = (): any => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = new Proxy(original, {
      apply: async function (
        target: any,
        thisArg: any,
        args: any[],
      ): Promise<Response> {
        try {
          return await target.apply(thisArg, args);
        } catch (err) {
          console.error(err);
          return new Response({}, err, false);
        }
      },
    });
  };
};
