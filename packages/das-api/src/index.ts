import { DasApi as Api } from './api';
import { DasApi as Find } from './find';

export const DasApi = {
  ...Api,
  ...Find,
};
