'use client';

import { User } from 'next-auth';
import { createContext, use, useContext } from 'react';

type UserPromise = Promise<User | null | undefined>;

const UserContext = createContext<UserPromise | null>(null);

export function useUser() {
  let userPromise = useContext(UserContext);
  if (!userPromise) {
    throw new Error('useUser must be used within a UserProvider');
  }
  const user = use(userPromise);
  return user;
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: UserPromise;
}) {
  return (
    <UserContext.Provider value={userPromise}>{children}</UserContext.Provider>
  );
}
