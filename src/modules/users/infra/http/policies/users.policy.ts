// import AclConstructor from 'acl';
// import { Request, Response, NextFunction } from 'express';

// import * as responses from '@shared/formatters/responses';
// import { ROLES } from '@shared/contants/roles';

// const acl = new AclConstructor(new AclConstructor.memoryBackend());

// export function invokeRolesPolicies(): void {
//   acl.allow([
//     {
//       roles: [ROLES.USER],
//       allows: [
//         {
//           resources: '/api/discount/:iddesconto',
//           permissions: ['get'],
//         },
//       ],
//     },
//     {
//       roles: [ROLES.ADMIN],
//       allows: [
//         {
//           resources: '/api/discount/:iddesconto',
//           permissions: ['*'],
//         },
//       ],
//     },
//   ]);
// }

// /**
//  * Check If Articles Policy Allows
//  */
// export function isAllowed(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void {
//   const { user } = req;
//   const roles = user ? user.cargos : ['guest'];

//   // Check for user roles
//   acl.areAnyRolesAllowed(
//     roles,
//     req.route.path,
//     req.method.toLowerCase(),
//     (err, isAllowed) => {
//       if (err) {
//         // An authorization error occurred
//         return responses.sendError(
//           res,
//           Codes.AUTH__UNEXPECTED_AUTHORIZATION,
//           i18next.t(i18nKeys.AUTH_UNEXPECTED_ERROR),
//           HttpStatus.INTERNAL_SERVER_ERROR,
//         );
//       }
//       if (isAllowed) {
//         // Access granted! Invoke next middleware
//         return next();
//       }
//       return responses.sendError(
//         res,
//         Codes.AUTH__USER_NOT_AUTHORIZED,
//         i18next.t(i18nKeys.AUTH_USER_NOT_AUTHORIZED),
//         HttpStatus.FORBIDDEN,
//       );
//     },
//   );
// }
