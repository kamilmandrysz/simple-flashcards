export enum AuthenticationState {
  AVAILABLE = 'AVAILABLE',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

export const routes = {
  HOME: {
    url: '/',
    auth: AuthenticationState.AVAILABLE,
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
  ADD_FLASHCARD: {
    url: '/flashcards/add',
    auth: AuthenticationState.AUTHENTICATED,
  },
  FLASHCARD: {
    url: (id: string) => `${routes.FLASHCARD.baseUrl}/${id}`,
    auth: AuthenticationState.AUTHENTICATED,
    baseUrl: '/flashcards',
  },
} as const;
