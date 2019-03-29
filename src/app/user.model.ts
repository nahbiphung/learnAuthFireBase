interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    roles?: Roles;
  }

interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
}
