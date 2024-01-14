export enum AuthenticationState {
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

export const routes = {
  HOME: {
    url: '/',
    auth: null,
  },
  SIGN_IN: {
    url: '/signin',
    auth: AuthenticationState.UNAUTHENTICATED,
  },
  SIGN_UP: {
    url: '/signup',
    auth: AuthenticationState.UNAUTHENTICATED,
  },
  FLASHCARDS: {
    url: '/flashcards',
    auth: AuthenticationState.AUTHENTICATED,
  },
  FLASHCARD: {
    url: (id: string) => `${routes.FLASHCARD.baseUrl}/${id}`,
    auth: AuthenticationState.AUTHENTICATED,
    baseUrl: '/flashcards',
  },
} as const;
