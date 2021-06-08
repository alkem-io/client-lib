import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiEndpointFactory } from 'src';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  protected readonly config = {
    headers: {
      Accept: 'application/json',
    },
  };

  public constructor(apiEndpoint: ApiEndpointFactory) {
    const baseURL = apiEndpoint();
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}
