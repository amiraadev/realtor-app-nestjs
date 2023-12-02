/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';
export const User = createParamDecorator(() => {
  return {
    id: 10,
    name: 'amira',
  };
});
