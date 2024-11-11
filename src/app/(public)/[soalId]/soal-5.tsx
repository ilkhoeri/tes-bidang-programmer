import Link from 'next/link';

export function Field5() {
  return (
    <div className="flex flex-col gap-8">
      <span className="font-mono">
        - Adaptasi authentication dan authorization, saya memilih untuk
        menggunakan Auth0 sebagai pengelolaan session, tujuannya agar lebih
        efisien dan meminimalisir bug serta kebocoran data user.
      </span>

      <p className="font-mono">
        - Dalam aplikasi ini, saya tidak mengatur penggunaan token OTP (One Time
        Password), namun jika yang ditanyakan adalah token session, maka token
        session akan disimpan didalam chookie dalam jangka waktu tertentu,
        silakan login melalui
        <Link
          className="ml-2 text-blue-500 text-underline underline"
          href={'/auth/sign-in'}
        >
          Link Halaman Login
        </Link>
        , setelah login berhasil, nilai session akan disimpan didalam chookie
        dengan nilai kunci dan nilai body yang telah di hash, sehingga keamanan
        nilai akun akan terjaga.
      </p>

      <pre className="font-mono">- Mengatur token OTP (One Time Password):</pre>
      <code className="-mt-6 rounded-lg p-4 bg-muted-foreground/50 font-mono text-wrap [white-space:break-spaces]">
        {tokenOTP}
      </code>

      <pre className="font-mono">
        - penerapan middleware terdapat pada file middleware.ts (root), seperti
        ini pendekatan sederhana yang saya buat:
      </pre>
      <code className="-mt-6 rounded-lg p-4 bg-muted-foreground/50 font-mono text-wrap [white-space:break-spaces]">
        {middleware}
      </code>
    </div>
  );
}

const middleware = `
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = clientRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // Add exceptions to routes /api/client/:path*
  const isApiClientRoute = nextUrl.pathname.startsWith('/api/client/products');
  const isProductsRoute = nextUrl.pathname.startsWith('/products');

  if (isApiClientRoute || isProductsRoute) {
    return undefined; // Do not perform redirect for route /api/client/:path*
  }

  if (isApiAuthRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(\`/auth/sign-in?callbackUrl=\${encodedCallbackUrl\}\`, nextUrl),
    );
  }

  return undefined;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

`;

const tokenOTP = `async function signin(values: z.infer<typeof SignInSchema>, callbackUrl?: string | null) {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    // ketika pengaturan akun mengaktifkan code OTP maka blok berikut akan digunakan untuk melanjutkan login anda,
    // kode OTP akan dikirimkan melalui email
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      // Beberapa kondisi ketika code OTP yang anda masukkan salah / sudah kadaluwarsa
      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired!" };
      }
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_SIGN_IN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};`;
