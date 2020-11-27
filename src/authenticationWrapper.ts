import { SdkFunctionWrapper } from './graphql';

export const authenticationWrapper: SdkFunctionWrapper = async <T>(
  action: () => Promise<T>
): Promise<T> => {
  const result = await action();
  console.log('Action: ', result);
  return result;
};
