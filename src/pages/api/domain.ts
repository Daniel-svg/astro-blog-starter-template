import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const domain = url.searchParams.get("domain");

  if (!domain) {
    return new Response(
      JSON.stringify({ error: "缺少 domain 參數" }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  async function query(type: string) {
    try {
      const res = await fetch(
        `https://1.1.1.1/dns-query?name=${domain}&type=${type}`,
        {
          method: "GET",
          headers: {
            "accept": "application/dns-json"
          }
        }
      );

      return await res.json();
    } catch (e) {
      return null;
    }
  }

  const A = await query("A");
  const AAAA = await query("AAAA");
  const NS = await query("NS");
  const MX = await query("MX");

  return new Response(
    JSON.stringify({
      domain,
      available: !(A && A.Answer),
      A: A?.Answer?.map((r: any) => r.data).join(", ") || null,
      AAAA: AAAA?.Answer?.map((r: any) => r.data).join(", ") || null,
      NS: NS?.Answer?.map((r: any) => r.data).join(", ") || null,
      MX: MX?.Answer?.map((r: any) => r.data).join(", ") || null
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
