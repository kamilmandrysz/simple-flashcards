import { ApiResponseError } from '@frontend/utils';

interface ServerActionResponseModel {
  success: boolean;
}

interface ServerActionSuccessResponseModel extends ServerActionResponseModel {
  success: true;
}

interface ServerActionFailResponseModel extends ServerActionResponseModel {
  success: false;
  error: ApiResponseError;
}

export type ServerActionResponse = ServerActionSuccessResponseModel | ServerActionFailResponseModel;
