/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      
      if (account?.provider === 'google') {
        try {
         
          const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName: user.name || 'Google User',
              email: user.email,
              password: 'GoogleAuth123!', 
            }),
          });
          
          let apiToken = null;
          
          if (registerResponse.ok) {
            console.log('Google user registered successfully');
            
         
            const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                password: 'GoogleAuth123!',
              }),
            });
            
            if (loginResponse.ok) {
              const loginData = await loginResponse.json();
              apiToken = loginData.data?.accessToken;
              console.log('Google user logged in successfully');
            }
          } else if (registerResponse.status === 400) {
           
            console.log('User already exists, trying login');
            
            const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                password: 'GoogleAuth123!',
              }),
            });
            
            if (loginResponse.ok) {
              const loginData = await loginResponse.json();
              apiToken = loginData.data?.accessToken;
              console.log('Existing Google user logged in successfully');
              console.log('API token:', apiToken ? 'obtained' : 'not found');
            } else {
              const errorData = await loginResponse.text();
              console.log('Login failed for existing user:', loginResponse.status, errorData);
              console.log('Will use demo data');
            }
          } else {
            const errorData = await registerResponse.text();
            console.log('Register failed:', registerResponse.status, errorData);
            
       
            console.log('Trying login anyway...');
            const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                password: 'GoogleAuth123!',
              }),
            });
            
            if (loginResponse.ok) {
              const loginData = await loginResponse.json();
              apiToken = loginData.data?.accessToken;
              console.log('Login successful after register fail');
              console.log('API token:', apiToken ? 'obtained' : 'not found');
            } else {
              const loginErrorData = await loginResponse.text();
              console.log('Login also failed:', loginResponse.status, loginErrorData);
            }
          }
          
          if (apiToken) {
            (user as any).accessToken = apiToken;
            console.log('API token obtained for Google user');
          } else {
            console.log('No API token, will use demo data');
          }
          
          return true;
        } catch (error) {
          console.error('Google auth API error:', error);
          return true; 
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if ((user as any)?.accessToken) {
        token.accessToken = (user as any).accessToken
        token.apiUser = (user as any).apiUser
      }
      return token
    },
    async session({ session, token }) {
    
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      if (token.apiUser) {
        (session as any).apiUser = token.apiUser;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }