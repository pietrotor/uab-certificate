export interface UserPayload {
  id: objectId;
  email: string;
  name: string;
  businessId: objectId;
}
declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      currentUser: UserPayload;
    }
  }
}
