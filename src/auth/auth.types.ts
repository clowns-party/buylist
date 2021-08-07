import { User } from 'src/users/user.entity';

export type JwtReqPayloadUser = { email: string; sub: number };

export type JwtReqUser = User;
