import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  //Login admin
  const loginAdminPath = "/nx-admin/auth/login";
  const loginClientPath = "/auth/login";

  const isInLoginAdminPage = req.nextUrl.pathname.includes(loginAdminPath);
  const isInLoginClientPage = req.nextUrl.pathname.includes(loginClientPath);
  //Admin routes
  const adminPaths = [
    "/nx-admin",
    "/nx-admin/dashboard",
    "/nx-admin/usuarios",
    "/nx-admin/marcas",
    "/nx-admin/ayuda",
    "/nx-admin/pedidos",
    "/nx-admin/categorias",
    "/nx-admin/productos",
    "/nx-admin/ventas",
    "/nx-admin/transacciones",
    "/nx-admin/configuracion",
  ];

  const clientPaths = [
    "/cuenta"
  ];

  const isInAdminPage = adminPaths.some(
    (protectdPath) => protectdPath === req.nextUrl.pathname
  );

  const isInClientPage = clientPaths.some(
    (protectdPath) => protectdPath === req.nextUrl.pathname
  );

  if (isInClientPage && !isAuthenticated) {
    return NextResponse.redirect(
      new URL(`${loginClientPath}`, req.url)
    );
  }

  if (isInLoginClientPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isInLoginAdminPage && isAuthenticated && token.role === "ADMIN") {
    return NextResponse.redirect(new URL(adminPaths[0], req.url));
  }

  if (isInAdminPage && token?.role !== "ADMIN") {
    const message = "No estás autorizado para acceder a esta página.";
    return NextResponse.redirect(
      new URL(`${loginAdminPath}?errorMessage=${message}`, req.url)
    );
  }

  await withAuth({
    pages: {
      signIn: loginAdminPath,
    },
  });

  // return authMiddleware(req);
}
