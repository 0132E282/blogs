// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";

export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access_token") ?? null;
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_BACKEND_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
