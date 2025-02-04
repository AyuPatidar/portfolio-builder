import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID
				? process.env.GOOGLE_CLIENT_ID
				: "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
				? process.env.GOOGLE_CLIENT_SECRET
				: "",
		}),
	],
	callbacks: {
		async session({ session }) {
			console.log("Session dekho", session);
			// const sessionUser = await User.findOne({ email: session.user.email });
			// session.user.id = await sessionUser._id.toString();
			return session;
		},
		async signIn({ account, profile, credentials, user }) {
			try {
				console.log("ye dekho", account, profile, credentials, user);

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
